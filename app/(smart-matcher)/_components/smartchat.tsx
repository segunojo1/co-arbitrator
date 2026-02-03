"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircleDashed } from "lucide-react";
import { useState } from "react";

const initialMessages = [
  {
    id: 1,
    role: "bot",
    content: "Hello! I'm your AI assistant for dispute resolution.",
  },
  {
    id: 2,
    role: "user",
    content: "Hello! I'm your AI assistant for dispute resolution.",
  },
  {
    id: 3,
    role: "bot",
    content: "I have a dispute I'd like to resolve.",
  },
];

const SmartChat = () => {
    const [messages, setMessages] = useState(initialMessages);
const [input, setInput] = useState("");
  return (
    <div>
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[267px] px-4 py-2 rounded-xl text-sm leading-relaxed ${
              msg.role === "user"
                ? "ml-auto bg-[#A684FF] rounded-br-sm rounded-[18px]"
                : "mr-auto bg-[#F9FAFB] rounded-bl-sm rounded-[18px] "
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
          className="flex-1 bg-[#20222E] px-4.5 text-sm rounded-[28px] outline-none w-[489px] h-[170px]"
        />
        <Button
          className="bg-white text-[#020618] px-4 py-2 rounded-xl absolute text-[14px]/[20px] -tracking-[.5px] bottom-[22px] right-[22px] font-medium"
        >
          Send Message
          <MessageCircleDashed />
        </Button>
      </div>
    </div>
  );
};

export default SmartChat;
