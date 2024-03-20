import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import GoogleLoginButton from "~/app/_components/google-login-button";

export default async function Login() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center w-80 gap-12 px-8 py-16 border-slate-100 border-2 rounded">
        <div className="flex">
          <Image src="/logo.png" alt="Stack" width={48} height={48} />
          <h1 className="text-5xl font-bold pl-4">Stack</h1>
        </div>
        <GoogleLoginButton />
      </div>
    </main>
  )
}
