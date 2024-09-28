import { Toolbar } from "@/components/toolbar";
import { Sidebar } from "@/components/sidebar";
import React from "react";
import { auth } from "@/lib/auth";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

export default async function WorkspaceIdLayout({
  children,
}: WorkspaceIdLayoutProps) {
  const session = await auth();

  return (
    <div>
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar username={session?.user?.name} image={session?.user?.image} />
        {children}
      </div>
    </div>
  );
}
