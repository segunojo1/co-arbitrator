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
  } catch (err: any) {
    // normalize error
    if (axios.isAxiosError(err)) {
      const msg = err.response?.data || err.message || "Network error";
      throw new Error(JSON.stringify(msg));
    }
    throw err;
  }
}

export default { postChat };
