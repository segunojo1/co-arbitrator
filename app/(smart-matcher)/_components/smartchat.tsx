"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircleDashed } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useAppStore from "@/store/app-store";

const FIRST_QUESTION = "Nice to meet you. What is your name? 😇";
const PERMISSION_PROMPT =
  "May I access your personal information to help process this case?";
const FOLLOW_UP_QUESTIONS = [
  "What is the nature of the dispute?",
  "What is the nationality of the party (include dual nationality if applicable)?",
  "Amount in dispute",
  "Cause of dispute",
];

const SmartChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: "bot", content: FIRST_QUESTION },
  ]);
  const [input, setInput] = useState("");
  const [awaitingPermission, setAwaitingPermission] = useState(false);
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

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    pushMessage({ role: "user", content: text });
    setInput("");

    // If we are waiting for the user's answer to the first bot question, show permission prompt next
    if (followIndex === null && !awaitingPermission) {
      setTimeout(() => {
        pushMessage({
          role: "bot",
          content: PERMISSION_PROMPT,
          type: "permission",
        });
        setAwaitingPermission(true);
      }, 600);
      return;
    }

    // If we are in follow-up question flow
    if (followIndex !== null) {
      const next = followIndex + 1;
        if (next < FOLLOW_UP_QUESTIONS.length) {
        setTimeout(() => {
          pushMessage({ role: "bot", content: FOLLOW_UP_QUESTIONS[next] });
          console.log("setting followIndex ->", next);
          setFollowIndex(next);
        }, 600);
      } else {
        // finished questions -> processing
        setTimeout(() => {
          pushMessage({
            role: "bot",
            content: "Processing your information...",
          });
          setTimeout(() => {
            pushMessage({
              role: "bot",
              content: "Thanks — we'll review this and get back to you.",
            });
          }, 1200);
        }, 800);
        console.log("resetting followIndex -> null");
        setFollowIndex(null);
      }
    }
  };

  const handlePermission = (allowed: boolean) => {
    // record user's choice as a user message
    pushMessage({ role: "user", content: allowed ? "Yes" : "No" });
    setAwaitingPermission(false);

    setTimeout(() => {
      pushMessage({ role: "bot", content: FOLLOW_UP_QUESTIONS[0] });
      console.log("setting followIndex -> 0");
      setFollowIndex(0);
    }, 600);
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
            className={`max-w-[267px] w-fit px-4 py-2 rounded-xl text-sm leading-relaxed ${msg.role === "user" ? "ml-auto bg-[#A684FF] rounded-br-sm rounded-[18px]" : msg.type !== "permission" ? "mr-auto bg-[#F9FAFB] rounded-bl-sm rounded-[18px] " : "text-[#9E9E9E]"}`}
          >
            {msg.content}
            {msg.type === "permission" && (
              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handlePermission(true)}
                  className="bg-white hover:bg-gray-300 cursor-pointer rounded-[20px] text-[14px]/[13px] font-medium text-[#020618] py-[13.5px] px-[17px] h-full w-fit"
                >
                  Yes, Continue
                </Button>
                <Button
                  size="sm"
                  onClick={() => handlePermission(false)}
                  className="bg-[#A70029] hover:bg-[#8A001F] cursor-pointer rounded-[20px] text-[14px]/[13px] font-medium text-[#FFFFFF] py-[13.5px] px-[17px] h-full w-fit"
                >
                  No, Exit
                </Button>
              </div>
            )}
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
          Send Message
          <MessageCircleDashed />
        </Button>
      </div>
    </div>
  );
};

export default SmartChat;
