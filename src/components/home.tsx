"use client";

import { useGetWorkspaces } from "@/hooks/api/use-get-workspaces";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useCreateWorkspaceModal } from "@/hooks/use-create-workspace-modal";
export const HomeClient = () => {
  const getWorkspacesQuery = useGetWorkspaces();
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();
  console.log(getWorkspacesQuery.data);

  console.log(typeof getWorkspacesQuery.data);

  const workspaceId = useMemo(() => {
    return getWorkspacesQuery?.data?.[0]?.id;
  }, [getWorkspacesQuery?.data]);

  useEffect(() => {
    if (workspaceId) {
      router.push(`/workspaces/${workspaceId}`);
      setOpen(false);
    } else if (!open) {
      setOpen(true);
      console.log("Open Creation Model");
    }
  }, [open, setOpen, workspaceId, getWorkspacesQuery?.data, router]);

  return <div></div>;
};
