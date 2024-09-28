"use client";

import { useGetWorkspaceById } from "@/hooks/api/use-get-workspacebyId";
import { Loader } from "./loader";

interface WorkspaceIdClientProps {
  workspaceId: string;
}
export const WorkspaceIdClient = ({ workspaceId }: WorkspaceIdClientProps) => {
  const getWorkspaceByIdQuery = useGetWorkspaceById(workspaceId);

  if (getWorkspaceByIdQuery.isLoading) {
    return <Loader />;
  }

  return <div>{JSON.stringify(getWorkspaceByIdQuery?.data)}</div>;
};
