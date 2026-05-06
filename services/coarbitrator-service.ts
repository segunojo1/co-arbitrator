export type CoArbitratorMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export async function askCoArbitrator(prompt: string, context?: string) {
  const mergedPrompt = context
    ? `Document context:\n${context}\n\nUser question:\n${prompt}`
    : prompt;

  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: mergedPrompt,
      systemInstruction:
        "You are Co-Arbitrator. Provide practical arbitration support in short sections: key point, rationale, and citation placeholders like [Doc p.X].",
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to fetch Co-Arbitrator response.");
  }

  return (await response.json()) as { text: string; fallback?: boolean };
}
