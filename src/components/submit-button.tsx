"use client";
import { Button } from "./ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export const SubmitButton = ({
  disabled,
  children,
  ...props
}: SubmitButtonProps) => {
  return (
    <Button type="submit" disabled={disabled} {...props}>
      {disabled ? (
        <>
          <AiOutlineLoading3Quarters className="size-4 animate-spin mr-2" />
          Loading...
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};
