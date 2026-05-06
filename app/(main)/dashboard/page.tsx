import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { dashboardPrompts, dashboardRecents } from "@/lib/mock-data";
import { Bell, FileText, Plus, Sparkles } from "lucide-react";
import Image from "next/image";

const Dashboard = () => {
  const [prompt, setPrompt] = useState("");
  const [responseText, setResponseText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendPrompt() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setResponseText(null);
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponseText(data?.text ?? "No response");
    } catch (err: any) {
      setResponseText(`Error: ${err?.toString()}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#F6F6F8] min-h-full p-3 md:p-4">
      <section className="bg-[#CABBE7] rounded-[10px] min-h-[calc(100vh-8rem)] p-4 md:p-6">
        <div className="flex justify-between items-center">
          <Image
            src="/assets/logo2.svg"
            alt="Dashboard Logo"
            width={184}
            height={40}
          />

          <div className="flex items-center gap-3">
            <button className="size-10 rounded-full bg-white/80 border border-black/10 text-black hover:bg-white transition-colors flex items-center justify-center">
              <Bell size={16} />
            </button>

            <Button className="h-10 bg-[#120033] hover:bg-[#24104a] text-white px-6 rounded-xl">
              History
            </Button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-24">
          <div className="grid gap-3 md:grid-cols-3">
            {dashboardPrompts.map((prompt, idx) => (
              <button
                key={`${prompt}-${idx}`}
                className="text-left bg-white/72 rounded-3xl min-h-20 px-4 py-3 border border-white/80 hover:bg-white transition-colors"
              >
                <div className="flex items-start gap-2">
                  <span className="inline-flex size-6 rounded-full items-center justify-center bg-[#EE57FF] text-white">
                    <Sparkles size={14} />
                  </span>
                  <span className="text-sm/[20px] font-medium text-[#0D0D0D]">
                    {prompt}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 bg-[#F2F2F4] rounded-[24px] p-6 border border-white/60">
            <h2 className="sr-only">Chat prompt</h2>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full min-h-44 bg-transparent resize-none border-none outline-none ring-0 shadow-none text-[#6B6B72] placeholder:text-[#A5A5AD] text-[17px]"
              placeholder="Ask Co-Arbitrator for anything"
            />

            <div className="mt-4 flex items-center justify-between">
              <button className="flex items-center gap-2 text-[#999AA5] hover:text-[#6F45C8] transition-colors font-medium px-2 py-2 rounded-lg hover:bg-white/60">
                <Plus size={18} />
                <span>File Upload</span>
              </button>

              <button
                onClick={() => void sendPrompt()}
                disabled={loading}
                className="size-12 rounded-full bg-[#160334] text-[#C768FF] shadow-[0_10px_30px_rgba(56,14,89,0.35)] hover:bg-[#24104a] transition-colors flex items-center justify-center"
              >
                <Sparkles size={20} />
              </button>
            </div>
          </div>

          {/* Response */}
          {responseText ? (
            <div className="mt-4 max-w-5xl mx-auto bg-white/90 p-4 rounded-lg text-[#1C1533]">
              <h4 className="font-semibold mb-2">Co-Arbitrator Response</h4>
              <div className="whitespace-pre-wrap">{responseText}</div>
            </div>
          ) : null}

          <div className="mt-10">
            <h3 className="font-semibold text-[#1F1935] mb-4 text-xl">
              Recents
            </h3>
            <div className="grid gap-3">
              {dashboardRecents.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 text-[#1C1533]"
                >
                  <div className="flex items-center gap-2 text-sm md:text-[26px]/[35px]">
                    <FileText size={22} className="text-[#1C1533]" />
                    <span className="font-medium">{item}</span>
                  </div>
                  <span className="font-semibold text-sm md:text-[26px]/[35px] text-[#1C1533]">
                    Recents
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
