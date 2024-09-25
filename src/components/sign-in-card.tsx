"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { FaGithub } from "react-icons/fa";
import { SignInflow } from "@/lib/types";
interface SignInCardProps {
  setState: (state: SignInflow) => void;
}
export const SignInCard = ({ setState }: SignInCardProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      email,
      password,
    });
    signIn("credentials", {
      redirect: true,
      email,
      password,
    });
  };

  const [password, setPassword] = useState("");
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use Your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={onSubmit}>
          <Input
            disabled={false}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            value={email}
            type="email"
            required
          />
          <div className="relative">
            <Input
              disabled={false}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              required
            />
            <div className="absolute top-2 right-2">
              {showPassword ? (
                <FaRegEyeSlash onClick={() => setShowPassword(false)} />
              ) : (
                <FaRegEye onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={false}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button onClick={() => signIn("github")} variant="outline">
            Continue with Github <FaGithub className="ml-2" size={20} />{" "}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {`Don't have an account?`}{" "}
          <span
            onClick={() => setState("signUp")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
