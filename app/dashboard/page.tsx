import {auth} from "@/lib/auth";

export default async function Page() {
    const x = await auth()
    return <pre>{JSON.stringify(x)}</pre>
}