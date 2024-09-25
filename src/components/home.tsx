"use client";

import { useGetWorkspaces } from "@/hooks/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { Loader } from "./loader";
export const HomeClient = () => {
  const getWorkspacesQuery = useGetWorkspaces();

  const workspaceId = useMemo(() => {
    return getWorkspacesQuery?.data?.id;
  }, [getWorkspacesQuery.data]);
  useEffect(() => {
    if (getWorkspacesQuery.isLoading) {
      return null;
    }

    if (workspaceId) {
      console.log("Redirect to workspace");
    } else {
      console.log("Open Creation Model");
    }
  }, [getWorkspacesQuery.isLoading, workspaceId]);

  if (getWorkspacesQuery.isLoading) {
    return <Loader />;
  }
  return <div></div>;
};
