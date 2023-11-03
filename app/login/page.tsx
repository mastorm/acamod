import {signIn} from "@/lib/auth";

export default function LoginPage() {
    const handleGoogleSignIn = async () => {
        "use server";
        await signIn("google");
    }
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <form action={handleGoogleSignIn}>
                    <button>
                        Sign in with google
                    </button>
                </form>
            </div>
        </main>
    );
}