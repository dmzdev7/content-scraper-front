import { getSession } from "@/shared/helpers/get-session";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getSession();

  if (session) redirect("/dashboard");

  redirect("/login");
}
