import { Loader2 } from "lucide-react";
export const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="size-10 animate-spin" />
    </div>
  );
};
