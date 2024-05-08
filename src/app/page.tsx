import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

import { Sidebar } from "~/app/_components/sidebar";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const firstChannel = await db.channel.findFirst({
    where: { createdById: session.user.id },
  });
  
  if (firstChannel) {
    redirect(`/${firstChannel.id}`)
  }

  return (
    <div className="flex h-screen">
      <Sidebar channelId="" />
      <div className="flex justify-center flex-1 shadow-lg bg-white">
        <div className="w-[800px] p-4">
          <div className="flex flex-1 flex-col justify-center items-center h-full">
            <h1 className="text-2xl font-bold mb-2 text-gray-500">Channel not found</h1>
            <p className="mt-2">
              <Link href="#" className="bg-sky-500 hover:bg-sky-600 duration-100 text-white px-4 py-2 rounded">
                Create a channel
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
