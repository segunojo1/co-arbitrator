"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  EllipsisVertical,
  FileText,
  Upload,
  UserRoundPlus,
  X,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/workspace-store";
import { extractDocumentPages } from "@/services/pdf-parser";

export default function WorkspaceDetailsPage() {
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = Array.isArray(params.workspaceId)
    ? params.workspaceId[0]
    : params.workspaceId;

  const [tab, setTab] = useState<"documents" | "recordings">("documents");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const workspace = useWorkspaceStore((state) =>
    state.workspaces.find((item) => item.id === workspaceId),
  );
  const documents = useWorkspaceStore((state) => state.documents);
  const uploadDocuments = useWorkspaceStore((state) => state.uploadDocuments);

  const docs = useMemo(
    () =>
      documents
        .filter((doc) => doc.workspaceId === workspaceId)
        .filter((doc) =>
          tab === "documents"
            ? doc.type === "PDF Document"
            : doc.type === "Recording",
        ),
    [documents, workspaceId, tab],
  );

  const totalDocuments = useMemo(
    () => documents.filter((doc) => doc.workspaceId === workspaceId).length,
    [documents, workspaceId],
  );

  const onSubmitUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    try {
      const filesWithText = await Promise.all(
        selectedFiles.map(async (file) => ({
          name: file.name,
          size: file.size,
          pagesContent: await extractDocumentPages(file),
        })),
      );

      uploadDocuments(workspaceId, filesWithText);
      setSelectedFiles([]);
      setIsUploadOpen(false);
    } finally {
      setIsUploading(false);
    }
  };

  if (!workspace) {
    return (
      <div className="bg-[#F6F6F8] min-h-full p-3 md:p-4">
        <section className="bg-[#F4F4F7] rounded-[10px] min-h-[calc(100vh-8rem)] p-6 grid place-items-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#222238]">
              Workspace not found
            </h2>
            <Link
              href="/workspace"
              className="mt-3 inline-block text-[#8F67FF] font-medium"
            >
              Return to workspace list
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#F6F6F8] min-h-full p-3 md:p-4">
      <section className="bg-[#F4F4F7] rounded-[10px] min-h-[calc(100vh-8rem)] p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 text-[#3C355A] text-sm font-medium"
            >
              Workspace
            </Link>
            <h2 className="mt-2 text-[42px]/[52px] font-semibold -tracking-[1.5px]">
              {workspace.name}
            </h2>
            <div className="mt-1 flex items-center gap-3 text-[#808093] text-sm">
              <span className="inline-flex items-center gap-1">
                <FileText size={14} /> {workspace.id.replaceAll("-", " ")}
              </span>
              <span className="inline-flex items-center gap-1">
                <UserRoundPlus size={14} /> {workspace.memberCount} member
                {workspace.memberCount > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-10 rounded-xl"
              onClick={() => setIsUploadOpen(true)}
            >
              <Upload size={15} />
              Upload Document
            </Button>
            <Button className="h-10 bg-[#A684FF] hover:bg-[#8F67FF] rounded-xl text-white">
              <UserRoundPlus size={15} />
              Invite Collaborator
            </Button>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="rounded-full bg-[#EFEFF3] p-1 inline-flex items-center gap-1 border border-[#E6E6ED]">
            <button
              className={`px-5 py-2 rounded-full text-sm font-semibold ${
                tab === "documents"
                  ? "bg-white text-[#171729]"
                  : "text-[#B05EFF]"
              }`}
              onClick={() => setTab("documents")}
            >
              All Documents ({totalDocuments})
            </button>
            <button
              className={`px-5 py-2 rounded-full text-sm font-semibold ${
                tab === "recordings"
                  ? "bg-white text-[#171729]"
                  : "text-[#B05EFF]"
              }`}
              onClick={() => setTab("recordings")}
            >
              Transcribe Recordings
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-7 grid gap-8">
          {docs.map((doc) => (
            <article
              key={doc.id}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4"
            >
              <div>
                <div className="flex items-center gap-3 text-[#111126]">
                  <span className="size-5 rounded-full bg-[#FF9500] text-white inline-flex items-center justify-center text-xs font-semibold">
                    <FileText size={12} />
                  </span>
                  <h3 className="font-semibold text-[31px]/[39px] -tracking-[1.2px]">
                    {doc.title}
                  </h3>
                </div>
                <p className="text-[#8B8B98] text-sm mt-1">{doc.type}</p>
                <p className="text-[#6E6E7A] mt-2">
                  File Size: {doc.size}{" "}
                  <span className="text-[#BBC1D2]">
                    | Uploaded on {doc.uploadedAt}
                  </span>
                </p>
              </div>

              <Link
                href={`/workspace/${workspaceId}/document/${doc.id}`}
                className="inline-flex items-center rounded-full px-4 py-1.5 text-[#9B73FF] bg-[#ECDDFF] hover:bg-[#DAC5FF] font-semibold"
              >
                View Document
              </Link>

              <button className="text-[#2A2A3A]">
                <EllipsisVertical size={18} />
              </button>
            </article>
          ))}

          {docs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#D7D7E3] bg-white/70 p-10 text-center text-[#78798C]">
              No {tab} uploaded yet.
            </div>
          ) : null}
        </div>
      </section>

      {isUploadOpen ? (
        <div className="fixed inset-0 z-50 bg-black/35 grid place-items-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[#E7E7EF] p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#201B34]">
                Upload Documents
              </h3>
              <button
                onClick={() => {
                  setSelectedFiles([]);
                  setIsUploadOpen(false);
                }}
                className="size-8 rounded-full hover:bg-[#F1F1F7] text-[#5C5D72] grid place-items-center"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4">
              <label className="flex h-28 cursor-pointer items-center justify-center rounded-xl border border-dashed border-[#C7C9D8] bg-[#FAFAFF] text-[#575A70]">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.mp3,.wav,.m4a"
                  onChange={(event) => {
                    const files = Array.from(event.target.files ?? []);
                    setSelectedFiles(files);
                  }}
                />
                <span className="text-sm font-medium">
                  Choose files to upload
                </span>
              </label>

              <div className="mt-3 max-h-44 overflow-y-auto space-y-2">
                {selectedFiles.map((file) => (
                  <div
                    key={`${file.name}-${file.size}`}
                    className="rounded-lg border border-[#E6E8F0] px-3 py-2 text-sm text-[#41445B]"
                  >
                    {file.name}
                  </div>
                ))}
                {selectedFiles.length === 0 ? (
                  <p className="text-sm text-[#8A8D9F]">
                    No file selected yet.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  if (isUploading) return;
                  setSelectedFiles([]);
                  setIsUploadOpen(false);
                }}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                onClick={() => void onSubmitUpload()}
                className="bg-[#A684FF] hover:bg-[#8F67FF] text-white"
                disabled={selectedFiles.length === 0 || isUploading}
              >
                {isUploading ? "Parsing..." : "Upload"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
