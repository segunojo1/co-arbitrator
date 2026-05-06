import { NextResponse } from "next/server";

type GeminiPayload = {
  prompt?: string;
  systemInstruction?: string;
};

const MODEL = "gemini-1.5-flash";

export async function POST(req: Request) {
  const body = (await req.json()) as GeminiPayload;
  const prompt = body.prompt?.trim();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        text: "Gemini key not configured. Using demo mode response: I can summarize this document, surface likely risks, and suggest clause-level follow-up questions with source snippets.",
        fallback: true,
      },
      { status: 200 },
    );
  }

  try {
    const systemInstruction =
      body.systemInstruction?.trim() ||
      "You are Co-Arbitrator, an arbitration copilot. Provide concise, practical legal workflow guidance and cite snippets as [Doc p.X] placeholders when exact pages are not provided.";

    // First try using the official Node client if available, matching your example.
    let data: any;
    let clientErr: any = null;

    try {
      const { GoogleGenAI } = await import("@google/genai");
      // The client will read env creds where appropriate; pass apiKey when supported.
      const ai = new GoogleGenAI({ apiKey });

      // Use generateContent as in your example. Provide system instruction + prompt as contents.
      const contents = `${systemInstruction}\n\n${prompt}`;
      const resp = await ai.models.generateContent({
        model: MODEL,
        contents,
        // some clients accept a config object; include generation params conservatively
        // @ts-ignore
        config: { temperature: 0.4, maxOutputTokens: 700 },
      });

      // client may return .text or an object; normalize into `data` shape handled below
      data = resp;
    } catch (e) {
      const clientErrLocal = e as Error;
      console.error("Gemini client or request error:", clientErrLocal);

      return NextResponse.json(
        {
          text: "Gemini API request failed and no fallback is configured. Check server logs for details.",
          fallback: true,
          details: clientErrLocal?.toString?.() || "Unknown error",
        },
        { status: 500 },
      );
    }

    // Resilient extraction: different API variants return different fields.
    let text = "";
    try {
      if (typeof data.outputText === "string" && data.outputText.trim()) {
        text = data.outputText.trim();
      } else if (data?.candidates?.[0]?.content?.parts) {
        text = data.candidates[0].content.parts
          .map((p: { text?: string }) => p.text || "")
          .join("\n")
          .trim();
      } else if (data?.candidates?.[0]?.content?.[0]?.text) {
        text = data.candidates[0].content[0].text.trim();
      } else if (data?.output?.[0]?.content?.[0]?.text) {
        text = data.output[0].content[0].text.trim();
      } else if (data?.choices?.[0]?.message?.content) {
        text = data.choices[0].message.content;
      } else {
        text = JSON.stringify(data).slice(0, 1000);
      }
    } catch (e) {
      text = "No response returned.";
    }

    return NextResponse.json({ text, fallback: false }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        text: "Network issue while contacting Gemini. Demo fallback: compare claimant timeline against documentary exhibits and flag unsupported assertions.",
        fallback: true,
      },
      { status: 200 },
    );
  }
}
