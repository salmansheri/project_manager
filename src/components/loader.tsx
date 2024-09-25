import { LuLoader2 } from "react-icons/lu";

export const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <LuLoader2 className="size-10 animate-spin" />
    </div>
  );
};
