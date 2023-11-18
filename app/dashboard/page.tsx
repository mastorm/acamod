import { getSession } from "@/lib/getSession";

export default async function Page() {
  const x = await getSession();
  return (
    <pre className="whitespace-pre-wrap">{JSON.stringify(x, null, 2)}</pre>
  );
}
