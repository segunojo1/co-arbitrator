import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  cloneInitialProjectDocuments,
  cloneInitialWorkspaceCards,
  type ProjectDocument,
  type WorkspaceCard,
  type WorkspaceStatus,
} from "@/lib/mock-data";

type UploadPayload = {
  name: string;
  size: number;
  pagesContent?: string[];
};

type WorkspaceStore = {
  workspaces: WorkspaceCard[];
  documents: ProjectDocument[];
  createWorkspace: (payload: {
    name: string;
    status?: WorkspaceStatus;
    memberCount?: number;
  }) => string;
  uploadDocuments: (workspaceId: string, files: UploadPayload[]) => void;
  resetDummyData: () => void;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function formatMonthYear(date: Date) {
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${month}, ${date.getFullYear()}`;
}

function formatDate(date: Date) {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

function formatFileSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  if (mb < 1) return "1 MB";
  if (mb < 10) return `${mb.toFixed(1)} MB`;
  return `${Math.round(mb)} MB`;
}

function detectDocumentType(fileName: string): "PDF Document" | "Recording" {
  const lower = fileName.toLowerCase();
  if (
    lower.endsWith(".mp3") ||
    lower.endsWith(".wav") ||
    lower.endsWith(".m4a")
  ) {
    return "Recording";
  }
  return "PDF Document";
}

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set, get) => ({
      workspaces: cloneInitialWorkspaceCards(),
      documents: cloneInitialProjectDocuments(),
      createWorkspace: ({ name, status = "ongoing", memberCount = 1 }) => {
        const trimmed = name.trim();
        const idBase = slugify(trimmed) || "workspace";
        const id = `${idBase}-${Date.now().toString().slice(-6)}`;

        const workspace: WorkspaceCard = {
          id,
          name: trimmed,
          status,
          updatedAt: formatMonthYear(new Date()),
          uploadedFiles: 0,
          memberCount,
        };

        set((state) => ({
          workspaces: [workspace, ...state.workspaces],
        }));

        return id;
      },
      uploadDocuments: (workspaceId, files) => {
        if (files.length === 0) return;

        const generatedDocs: ProjectDocument[] = files.map((file, idx) => ({
          id: `${workspaceId}-doc-${Date.now()}-${idx}`,
          workspaceId,
          title: file.name.replace(/\.[^/.]+$/, "") || "Uploaded Document",
          type: detectDocumentType(file.name),
          size: formatFileSize(file.size),
          uploadedAt: formatDate(new Date()),
          pages: file.pagesContent?.length || 1,
          excerpt:
            file.pagesContent?.[0] ||
            "Uploaded document excerpt preview. Content parsing is not yet connected, so this is placeholder text for now.",
          pagesContent: file.pagesContent,
        }));

        set((state) => {
          const updatedDocs = [...generatedDocs, ...state.documents];
          const workspaceDocCount = updatedDocs.filter(
            (doc) => doc.workspaceId === workspaceId,
          ).length;

          return {
            documents: updatedDocs,
            workspaces: state.workspaces.map((workspace) =>
              workspace.id === workspaceId
                ? {
                    ...workspace,
                    uploadedFiles: workspaceDocCount,
                    updatedAt: formatMonthYear(new Date()),
                  }
                : workspace,
            ),
          };
        });
      },
      resetDummyData: () => {
        set({
          workspaces: cloneInitialWorkspaceCards(),
          documents: cloneInitialProjectDocuments(),
        });
      },
    }),
    {
      name: "co-arbitrator-workspace-store",
      partialize: (state) => ({
        workspaces: state.workspaces,
        documents: state.documents,
      }),
    },
  ),
);
