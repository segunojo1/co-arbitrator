export type WorkspaceStatus = "ongoing" | "closed" | "deleted";

export type WorkspaceCard = {
  id: string;
  name: string;
  status: WorkspaceStatus;
  updatedAt: string;
  uploadedFiles: number;
  memberCount: number;
};

export type ProjectDocument = {
  id: string;
  workspaceId: string;
  title: string;
  type: "PDF Document" | "Recording";
  size: string;
  uploadedAt: string;
  pages: number;
  excerpt: string;
  pagesContent?: string[];
};

export const initialWorkspaceCards: WorkspaceCard[] = [
  {
    id: "maritime-dispute",
    name: "Arisco Dispute Ltd",
    status: "ongoing",
    updatedAt: "Jul, 2025",
    uploadedFiles: 102,
    memberCount: 1,
  },
  {
    id: "energy-claim",
    name: "Arisco Dispute Ltd",
    status: "ongoing",
    updatedAt: "Jul, 2025",
    uploadedFiles: 102,
    memberCount: 2,
  },
  {
    id: "supply-chain",
    name: "Arisco Dispute Ltd",
    status: "ongoing",
    updatedAt: "Jul, 2025",
    uploadedFiles: 102,
    memberCount: 3,
  },
  {
    id: "port-infrastructure",
    name: "Arisco Dispute Ltd",
    status: "ongoing",
    updatedAt: "Jul, 2025",
    uploadedFiles: 102,
    memberCount: 4,
  },
  {
    id: "archived-1",
    name: "Arisco Dispute Ltd",
    status: "closed",
    updatedAt: "Jun, 2025",
    uploadedFiles: 76,
    memberCount: 2,
  },
  {
    id: "archived-2",
    name: "Arisco Dispute Ltd",
    status: "deleted",
    updatedAt: "Jan, 2025",
    uploadedFiles: 12,
    memberCount: 1,
  },
];

const defaultExcerpt =
  "Resolve dispute faster with AI-Assisted Arbitration. Transform dispute resolution with cutting-edge AI technology. Fast, fair, and transparent arbitration for the modern world.";

export const initialProjectDocuments: ProjectDocument[] = Array.from({
  length: 8,
}).map((_, idx) => ({
  id: `arb-file-${idx + 1}`,
  workspaceId: "maritime-dispute",
  title: "Arbitration File",
  type: "PDF Document",
  size: "20 MB",
  uploadedAt: "11/12/24",
  pages: 6,
  excerpt: defaultExcerpt,
  pagesContent: Array.from({ length: 6 }).map(
    (__, pageIdx) =>
      `Sample extracted text for page ${pageIdx + 1}. ${defaultExcerpt} This is demo parsed content to validate pagination and AI context flow.`,
  ),
}));

export function cloneInitialWorkspaceCards() {
  return initialWorkspaceCards.map((workspace) => ({ ...workspace }));
}

export function cloneInitialProjectDocuments() {
  return initialProjectDocuments.map((document) => ({ ...document }));
}

export const dashboardPrompts = [
  "Critically evaluate the submission in this document",
  "Draft synopses of arbitral award",
  "Draft synopses of arbitral award",
];

export const dashboardRecents = [
  "Legal Insights on Maritime Dispute",
  "Legal Insights on Maritime Dispute",
  "Analyse changes of provisions for acquisition",
];

export const coArbitratorSeed = [
  {
    id: 1,
    role: "assistant" as const,
    content:
      "Welcome to Co-Arbitrator mode. Ask a question and I will use the uploaded document context to help you decide with citations.",
  },
];
