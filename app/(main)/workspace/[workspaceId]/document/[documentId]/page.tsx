"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { askCoArbitrator } from "@/services/coarbitrator-service";
import { coArbitratorSeed } from "@/lib/mock-data";
import { useWorkspaceStore } from "@/store/workspace-store";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  FileText,
  Search,
  Sparkles,
} from "lucide-react";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

function buildContext(pages: string[], currentPage: number) {
  const pageIndexes = [currentPage - 2, currentPage - 1, currentPage].filter(
    (index) => index >= 0 && index < pages.length,
  );

  return pageIndexes
    .map((index) => `[Doc p.${index + 1}] ${pages[index].slice(0, 1600)}`)
    .join("\n\n");
}

export default function DocumentWorkspacePage() {
  const params = useParams<{ workspaceId: string; documentId: string }>();
  const workspaceId = Array.isArray(params.workspaceId)
    ? params.workspaceId[0]
    : params.workspaceId;
  const documentId = Array.isArray(params.documentId)
    ? params.documentId[0]
    : params.documentId;

  const documents = useWorkspaceStore((state) => state.documents);

  const document = useMemo(
    () => documents.find((doc) => doc.id === documentId),
    [documents, documentId],
  );

  const [coArbActive, setCoArbActive] = useState(true);
  const [showMiniChat, setShowMiniChat] = useState(false);
  const [miniInput, setMiniInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(coArbitratorSeed);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageContents = useMemo(() => {
    if (!document) return [];
    if (document.pagesContent && document.pagesContent.length > 0)
      return document.pagesContent;
    return [document.excerpt];
  }, [document]);

  const totalPages = pageContents.length > 0 ? pageContents.length : 1;
  const activePageText =
    pageContents[currentPage - 1] || document?.excerpt || "No text found.";

  const visiblePages = useMemo(() => {
    const maxButtons = 6;
    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }, (_, idx) => idx + 1);
    }

    const start = Math.max(
      1,
      Math.min(currentPage - 2, totalPages - (maxButtons - 1)),
    );
    return Array.from({ length: maxButtons }, (_, idx) => start + idx);
  }, [totalPages, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [documentId]);

  const onAskCoArbitrator = async () => {
    if (!document) return;
    const prompt = miniInput.trim();
    if (!prompt || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMiniInput("");
    setLoading(true);

    try {
      const response = await askCoArbitrator(
        prompt,
        buildContext(pageContents, currentPage),
      );
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: response.text,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "I could not fetch a live response. Demo suggestion: review governing law and notice obligations first, then validate each claim with clause-level references [Doc p.X].",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F6F6F8] min-h-full p-3 md:p-4">
      {!document ? (
        <section className="bg-[#F4F4F7] rounded-[10px] min-h-[calc(100vh-8rem)] p-6 grid place-items-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#222238]">
              Document not found
            </h2>
            <Link
              href={`/workspace/${workspaceId}`}
              className="mt-3 inline-block text-[#8F67FF] font-medium"
            >
              Return to workspace documents
            </Link>
          </div>
        </section>
      ) : (
        <section className="bg-[#F4F4F7] rounded-[10px] min-h-[calc(100vh-8rem)] p-4 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href={`/workspace/${workspaceId}`}
              className="inline-flex items-center gap-3 text-[#3B3751] font-medium"
            >
              <span className="size-8 rounded-full bg-[#E7E7EC] inline-flex items-center justify-center">
                <ArrowLeft size={16} />
              </span>
              Back to prev. page
            </Link>

            <button
              onClick={() => {
                setCoArbActive((v) => {
                  const next = !v;
                  if (!next) {
                    setShowMiniChat(false);
                  }
                  return next;
                });
              }}
              className="rounded-xl bg-[#0F0328] text-white px-4 py-2 font-medium inline-flex items-center gap-2"
            >
              <Sparkles size={15} className="text-[#CC79FF]" />
              {coArbActive
                ? "De-activate Co-Arbitrator"
                : "Activate Co-Arbitrator"}
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-4 xl:flex-row">
            <div className="min-w-0 max-w- flex-1 rounded-2xl border border-[#E7E7EE] bg-[#F8F8FA] p-4 md:p-6">
              <div className="flex flex-wrap items-start gap-2 max-w-[80%]">
                <h2 className="text-[42px]/[48px] -tracking-[1.5px] max-w-[80%] font-semibold text-wrap flex break-words flex-1">
                  {document.title}
                </h2>
              </div>

              <div className="mt-3 relative max-w-xl">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9FA0AE]"
                  size={16}
                />
                <Input
                  placeholder="Search key term in documents..."
                  className="h-10 pl-9 bg-[#F1F2F6] border-[#DFE2EA]"
                />
              </div>

              <div className="mt-7 flex items-center gap-2 text-[#19192C]">
                <span className="size-5 rounded-full bg-[#FF9500] text-white inline-flex items-center justify-center text-xs">
                  <FileText size={12} />
                </span>
                <div>
                  <h3 className="font-semibold text-[30px]/[38px] -tracking-[1.2px]">
                    {document.title}
                  </h3>
                  <p className="text-[#7D7D8D] text-sm">{document.type}</p>
                </div>
              </div>

              <div className="mt-8 text-[25px]/[58px] -tracking-[.8px] text-[#666677] max-w-5xl whitespace-pre-wrap wrap-break-word">
                {activePageText}
              </div>

              <div className="mt-7 pt-4 border-t border-[#E5E5EC] flex items-center justify-between text-sm text-[#4D4D5E]">
                <span className="text-[29px]/[40px] -tracking-[1.2px] font-semibold">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[#9A9AAC]">
                    {visiblePages.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`size-5 rounded-md inline-flex items-center justify-center text-[12px] ${
                          pageNumber === currentPage
                            ? "bg-[#FEE6D3] text-[#E88D46]"
                            : "text-[#8E8EA2] hover:bg-[#ECECF3]"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="rounded-xl border border-[#D8D9E3] px-3 py-1.5 inline-flex items-center gap-2 text-[#4C4F63] bg-white disabled:opacity-50"
                  >
                    <ArrowLeft size={14} /> Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="rounded-xl border border-[#D8D9E3] px-3 py-1.5 inline-flex items-center gap-2 text-[#4C4F63] bg-white disabled:opacity-50"
                  >
                    Next <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {coArbActive ? (
            <aside className="w-full max-w-[430px] xl:shrink-0 rounded-2xl bg-[#CABBE7] p-3 md:p-4 min-h-168 flex flex-col gap-4 overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 bg-[#180238] text-[#CB76FF] rounded-full px-4 py-2 font-semibold">
                  <Sparkles size={16} />
                  Co-Arbitrator
                </div>
                <button className="rounded-full bg-[#EEF2E7] text-[#8A919E] px-3 py-1 text-xs font-medium">
                  History
                </button>
              </div>

              <div className="flex-1 grid place-items-center px-6 text-center min-h-72">
                <div>
                  <div className="mx-auto size-20 rounded-full bg-[#DCA7FF] flex items-center justify-center text-[#DF45FF] mb-4">
                    <FileText size={34} />
                  </div>
                  <p className="font-semibold text-[29px]/[40px] -tracking-[1px] text-[#0F0F1C]">
                    Welcome to Co-Arbitrator Mode
                  </p>
                  <p className="text-[#2F2E43] mt-1 text-[28px]/[40px] -tracking-[1px]">
                    Get started by asking any research question and
                    Co-Arbitrator would do the rest
                  </p>
                </div>
              </div>

              {showMiniChat ? (
                <div className="w-full rounded-2xl border border-[#D9C7F8] bg-white/95 shadow-xl p-3">
                  <div className="text-xs font-semibold text-[#4A3E67] mb-2">
                    Co-Arbitrator Mini Chat
                  </div>
                  <div className="h-48 overflow-y-auto space-y-2 pr-1">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`text-xs rounded-[10px] px-2.5 py-2 leading-relaxed ${
                          message.role === "assistant"
                            ? "bg-[#F2EEFC] text-[#2B1D4E]"
                            : "bg-[#E8F1FF] text-[#1F3959]"
                        }`}
                      >
                        {message.content}
                      </div>
                    ))}
                    {loading ? (
                      <div className="text-xs rounded-[10px] px-2.5 py-2 bg-[#F2EEFC] text-[#2B1D4E]">
                        Co-Arbitrator is thinking...
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      value={miniInput}
                      onChange={(e) => setMiniInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          void onAskCoArbitrator();
                        }
                      }}
                      placeholder="Ask follow-up"
                      className="h-9 px-3 rounded-md border border-[#D4D4E0] text-xs w-full outline-none"
                    />
                    <button
                      onClick={() => void onAskCoArbitrator()}
                      className="h-9 rounded-md px-3 bg-[#170335] text-[#D17CFF] text-xs font-semibold"
                    >
                      Send
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="mt-auto">
                <div className="rounded-full bg-[#F1F2F4] border border-[#D6D8DE] pl-4 pr-2 py-2 flex items-center gap-2">
                  <Search size={15} className="text-[#BE6BFF]" />
                  <input
                    value={miniInput}
                    onChange={(e) => setMiniInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        void onAskCoArbitrator();
                      }
                    }}
                    placeholder="Ask Co-Arbitrator anything"
                    className="bg-transparent text-sm text-[#2A2A38] w-full outline-none"
                  />
                  <button
                    onClick={() => setShowMiniChat((v) => !v)}
                    className="size-9 rounded-full bg-[#170335] text-[#C968FF] flex items-center justify-center"
                  >
                    <Sparkles size={16} />
                  </button>
                </div>
              </div>
            </aside>
            ) : null}
          </div>
        </section>
      )}
    </div>
  );
}
