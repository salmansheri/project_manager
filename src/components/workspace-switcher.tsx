"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCreateWorkspaceModal } from "@/hooks/use-create-workspace-modal";
import { useGetWorkspaces } from "@/hooks/api/use-get-workspaces";
import { useGetWorkspaceById } from "@/hooks/api/use-get-workspacebyId";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export const WorkspaceSwitcher = () => {
  const { workspaceId } = useParams();
  const [_open, setOpen] = useCreateWorkspaceModal();
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspaceById(
    workspaceId as string,
  );

  const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();

  const filteredWorkspaces = workspaces?.filter(
    (workspace) => workspace?.id !== workspaceId,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
          {workspaceLoading ? (
            <>
              <Loader2 className="size-4 animate-spin shrink-0" />
            </>
          ) : (
            <>{workspace?.name.charAt(0).toUpperCase()}</>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        className="w-64"
      ></DropdownMenuContent>
    </DropdownMenu>
  );
};
