"use client";
import { InfoIcon, Loader2, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useGetWorkspaceById } from "@/hooks/api/use-get-workspacebyId";
import { useParams } from "next/navigation";

export const Toolbar = () => {
  const params = useParams();
  const { data, isLoading } = useGetWorkspaceById(params.workspaceId as string);
  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5 ">
      <div className="flex-1" />
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent/25 w-full justify-start  h-7 px-2 "
        >
          <SearchIcon />
          <span className="text-white text-xs">
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
              </>
            ) : (
              <>Search {data?.name}</>
            )}
          </span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <InfoIcon className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};
