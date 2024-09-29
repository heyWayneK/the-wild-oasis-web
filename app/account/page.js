import PageHeading from "@/app/_components/PageHeading";
import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: "Login",
};

export default async function Page() {
  const session = await auth();
  // console.log(`session ____`, session);
  return (
    <PageHeading>Welcome {session.user.name.split(" ").at(0)}</PageHeading>
  );
}
