import { auth } from "@/lib/auth";
import { UserButton } from "@/components/user-button";
import { HomeClient } from "@/components/home";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <UserButton
        username={session?.user?.name as string}
        image={session?.user?.image as string}
      />
      <HomeClient />
    </div>
  );
}
