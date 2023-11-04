import { auth } from "@/lib/auth";

export default async function Page() {
  const x = await auth();
  return (
    <pre className="whitespace-pre-wrap">{JSON.stringify(x, null, 2)}</pre>
  );
}
