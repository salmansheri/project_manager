"use client";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { UserButton } from "./user-button";

interface SidebarProps {
  username: string;
  image: string;
}
export const Sidebar = ({ username, image }: SidebarProps) => {
  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-6-4 items-center pt-[9px] pb-[4px]">
      <WorkspaceSwitcher />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton username={username} image={image} />
      </div>
    </aside>
  );
};
