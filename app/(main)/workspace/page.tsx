"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { type WorkspaceStatus } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Share2, X } from "lucide-react";
import { useWorkspaceStore } from "@/store/workspace-store";

const filters: { id: WorkspaceStatus; label: string }[] = [
  { id: "ongoing", label: "Ongoing" },
  { id: "closed", label: "Closed" },
  { id: "deleted", label: "Deleted" },
];

const Workspace = () => {
  const [activeFilter, setActiveFilter] = useState<WorkspaceStatus>("ongoing");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [createStatus, setCreateStatus] = useState<WorkspaceStatus>("ongoing");

  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const createWorkspace = useWorkspaceStore((state) => state.createWorkspace);

  const filteredWorkspaces = useMemo(
    () => workspaces.filter((card) => card.status === activeFilter),
    [workspaces, activeFilter],
  );

  const onCreateWorkspace = () => {
    if (!workspaceName.trim()) return;
    createWorkspace({ name: workspaceName, status: createStatus });
    setWorkspaceName("");
    setCreateStatus("ongoing");
    setActiveFilter(createStatus);
    setIsCreateOpen(false);
  };

  return (
    <div className="bg-[#F6F6F8] min-h-full p-3 md:p-4">
      <section className="bg-[#F4F4F7] rounded-[10px] min-h-[calc(100vh-8rem)] p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[42px]/[52px] font-semibold -tracking-[1.5px]">
              Workspace
            </h2>
            <p className="text-[#8B8B97] text-sm">
              Welcome to your dashboard stay organized, track applications
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-10 rounded-xl">
              <Share2 size={15} />
              Shared with you
            </Button>
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="h-10 bg-[#A684FF] hover:bg-[#8F67FF] rounded-xl text-white"
            >
              <Plus size={15} />
              Create Workspace
            </Button>
          </div>
        </div>

        <div className="mt-8 w-fit rounded-[14px] bg-[#ECECEF] p-1 flex items-center gap-1">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-[10px] px-10 py-2 text-sm font-semibold transition-colors ${
                activeFilter === filter.id
                  ? "bg-white text-[#221C3B]"
                  : "text-[#545464] hover:bg-white/50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filteredWorkspaces.map((workspace) => (
            <Link
              key={workspace.id}
              href={`/workspace/${workspace.id}`}
              className="block rounded-3xl border border-[#E9E9ED] bg-[#F8F8FA] p-4 min-h-64 hover:border-[#D0C3F8] hover:bg-white transition-colors"
            >
              <h3 className="text-[#3B3B47] text-[28px]/[35px] -tracking-[1.3px] font-semibold">
                {workspace.name}
              </h3>
              <p className="text-[#A0A0AB] text-sm mt-1">
                Updated {workspace.updatedAt}
              </p>

              <div className="h-32" />

              <div className="flex items-center gap-2 text-[#A3A3AF] text-sm">
                <FileText size={16} />
                <span>{workspace.uploadedFiles} Files Uploaded</span>
              </div>
            </Link>
          ))}

          {filteredWorkspaces.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-[#D3D4DD] bg-white/60 p-8 text-center text-[#707186]">
              No workspace in this status yet.
            </div>
          ) : null}
        </div>
      </section>

      {isCreateOpen ? (
        <div className="fixed inset-0 z-50 bg-black/35 grid place-items-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7EF] p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#201B34]">
                Create Workspace
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="size-8 rounded-full hover:bg-[#F1F1F7] text-[#5C5D72] grid place-items-center"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#3D3B51] mb-1">
                  Workspace name
                </label>
                <input
                  value={workspaceName}
                  onChange={(event) => setWorkspaceName(event.target.value)}
                  placeholder="e.g. Maritime Dispute Team"
                  className="h-11 w-full rounded-xl border border-[#DADCE8] px-3 outline-none focus:ring-2 focus:ring-[#C9B2FF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3D3B51] mb-1">
                  Status
                </label>
                <select
                  value={createStatus}
                  onChange={(event) =>
                    setCreateStatus(event.target.value as WorkspaceStatus)
                  }
                  className="h-11 w-full rounded-xl border border-[#DADCE8] px-3 outline-none focus:ring-2 focus:ring-[#C9B2FF] bg-white"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="closed">Closed</option>
                  <option value="deleted">Deleted</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={onCreateWorkspace}
                className="bg-[#A684FF] hover:bg-[#8F67FF] text-white"
                disabled={!workspaceName.trim()}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Workspace;
