"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiLogout } from "react-icons/ci";
interface UserButtonProps {
  username: string;
  image: string;
}
export const UserButton = ({ username, image }: UserButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage src={image} />
          <AvatarFallback className="text-black font-bold">
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem onClick={() => signOut()}>
          <CiLogout className="size-4 mr-2 font-bold" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
