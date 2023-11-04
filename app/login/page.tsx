import {signIn} from "@/lib/auth";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {} from "lucide-react";
import {Icons} from "@/components/icons";

export default function LoginPage() {
    const handleGoogleSignIn = async () => {
        "use server";
        await signIn("google", {redirectTo: "/dashboard"});
    }
    return (
        <main className="flex items-center justify-center md:h-screen md:max-w-md mx-auto">

            <Card>
                <CardHeader>
                    <CardTitle>Anmeldung</CardTitle>
                    <CardDescription>Bitte melden Sie sich an, um die Anwendung zu nutzen. Derzeit wird lediglich Google als Authentifizierungsmethode angeboten.</CardDescription>
                </CardHeader>
                <CardContent>

                    <form action={handleGoogleSignIn}>

                        <Button><Icons.google className="mr-2 h-4 w-4" />Mit Google anmelden</Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}