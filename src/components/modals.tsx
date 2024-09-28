"use client";
import { useEffect, useState } from "react";
import { CreateWorkspaceModal } from "./modal/create-workspace-modal";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateWorkspaceModal />
    </>
  );
};
