"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircleDashed } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useAppStore from "@/store/app-store";
import { postChat, CollectedData } from "@/services/app-services";

const FIRST_QUESTION = "Nice to meet you. What is your name? 😇";
// Conversation flow is driven by the API; no local permission or follow-up arrays

const SmartChat = () => {
  const [messages, setMessages] = useState<{ id: number; role: string; content: string; type?: string }[]>([
    { id: 1, role: "bot", content: FIRST_QUESTION },
  ]);
  
  const [input, setInput] = useState("");

  const followIndex = useAppStore((s) => s.followIndex);
  const setFollowIndex = useAppStore((s) => s.setFollowIndex);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const pushMessage = (msg: {
    role: string;
    content: string;
    type?: string;
  }) => {
    setMessages((m) => [
      ...m,
      {
        id: m.length + 1,
        role: msg.role,
        content: msg.content,
        type: msg.type,
      },
    ]);
  };

  const [collected, setCollected] = useState<CollectedData>({
    name: "",
    nature_of_dispute: "",
    nationality_of_parties: "",
    amount_in_dispute: "",
    cause_of_dispute: "",
  });

  const fieldMap = [
    "nature_of_dispute",
    "nationality_of_parties",
    "amount_in_dispute",
    "cause_of_dispute",
  ];

  const handleApiResponse = (resp: any) => {
    if (!resp) return;
    if (resp.response_type === "question") {
      pushMessage({ role: "bot", content: resp.message });

      const idx = fieldMap.indexOf(resp.field_to_fill);
      if (idx >= 0) setFollowIndex(idx);
      return;
    }

    //this for arbitrator response
    if (resp.response_type === "match") {
      pushMessage({ role: "bot", content: resp.message });
      setArbitratorResponse(resp.message);
      if (Array.isArray(resp.matches)) {
        resp.matches.forEach((m: any) =>
          pushMessage({ role: "bot", content: `${m.name} — ${m.institution}` }),
        );
      }
    }
    /////////
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    pushMessage({ role: "user", content: text });

    const updated: CollectedData = { ...collected };

    if (followIndex === null) {
      updated.name = text;
    } else if (followIndex !== null) {
      const key = fieldMap[followIndex];
      if (key) updated[key] = text;
    }

    setCollected(updated);

    try {
      setInput("");
      // show temporary loading message
      pushMessage({ role: "bot", content: "Loading...", type: "loading" });

      const resp = await postChat(updated);
      console.log("API response:", resp);

      // remove any loading messages
      setMessages((m) => m.filter((msg) => msg.type !== "loading"));

      handleApiResponse(resp);
    } catch (error) {

      setMessages((m) => m.filter((msg) => msg.type !== "loading"));
      pushMessage({ role: "bot", content: "Sorry, something went wrong." });
      console.error("Error posting chat:", error);
    }

    // API will return the next question or final match; handled in handleApiResponse
  };

  return (
    <div className="w-full max-w-md bg-transparent">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 max-h-[380px]"
      >
        {messages.map((msg: any) => (
          <div
            key={msg.id}
            className={`max-w-[267px] w-fit px-4 py-2 rounded-xl text-sm leading-relaxed ${
              msg.role === "user"
                ? "ml-auto bg-[#A684FF] rounded-br-sm rounded-[18px]"
                : "mr-auto bg-[#F9FAFB] rounded-bl-sm rounded-[18px]"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-white/10 relative flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-[#20222E] text-white h-[170px] px-4.5 text-sm rounded-[28px] outline-none w-[489px]"
        />
        <Button
          onClick={handleSend}
          className="bg-white  hover:text-white text-[#020618] px-4 py-2 rounded-xl absolute text-[14px]/[20px] -tracking-[.5px] bottom-[22px] right-[22px] font-medium"
        >
          Send Messages
          <MessageCircleDashed />
        </Button>
      </div>
    </div>
  );
};

export default SmartChat;
