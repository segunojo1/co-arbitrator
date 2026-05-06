import axios from "axios";

export type CollectedData = {
  name?: string;
  nature_of_dispute?: string;
  nationality_of_parties?: string;
  amount_in_dispute?: string;
  cause_of_dispute?: string;
  [key: string]: any;
};

export type QuestionResponse = {
  response_type: "question";
  field_to_fill: string;
  message: string;
  is_invalid_input?: boolean;
};

export type Match = {
  name: string;
  institution: string;
  picture?: string;
  pdf_link?: string;
};

export type MatchResponse = {
  response_type: "match";
  message: string;
  matches: Match[];
};

export type ChatResponse = QuestionResponse | MatchResponse;

type RequiredField =
  | "nature_of_dispute"
  | "nationality_of_parties"
  | "amount_in_dispute"
  | "cause_of_dispute";

const followUpQuestions: Array<{ field: RequiredField; prompt: string }> = [
  {
    field: "nature_of_dispute",
    prompt:
      "What is the nature of the dispute (construction, maritime, energy, etc.)?",
  },
  {
    field: "nationality_of_parties",
    prompt: "What are the nationalities of the parties involved?",
  },
  {
    field: "amount_in_dispute",
    prompt: "What is the approximate amount in dispute?",
  },
  {
    field: "cause_of_dispute",
    prompt: "Briefly describe the cause of dispute.",
  },
];

const dummyMatches: Match[] = [
  {
    name: "Sunita Shekhawat",
    institution: "London Court of International Arbitration",
  },
  {
    name: "Michael Tan",
    institution: "Singapore International Arbitration Centre",
  },
  {
    name: "Anais Dupont",
    institution: "International Chamber of Commerce",
  },
];

function getDummyChatResponse(collectedData: CollectedData): ChatResponse {
  const nextMissing = followUpQuestions.find(({ field }) => {
    const value = String(collectedData[field] ?? "").trim();
    return value.length === 0;
  });

  if (nextMissing) {
    return {
      response_type: "question",
      field_to_fill: nextMissing.field,
      message: nextMissing.prompt,
    };
  }

  return {
    response_type: "match",
    message:
      "Great, based on your responses I found a few arbitrator profiles that align with your dispute profile.",
    matches: dummyMatches,
  };
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SMART_MATCHER_API ||
  "https://lcia-smart-matcher.vercel.app";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export async function postChat(
  collected_data: CollectedData,
): Promise<ChatResponse> {
  try {
    const { data } = await api.post<ChatResponse>("/chat", { collected_data });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return getDummyChatResponse(collected_data);
    }
    return getDummyChatResponse(collected_data);
  }
}

export default { postChat };
