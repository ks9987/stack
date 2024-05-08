import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

import { Sidebar } from "~/app/_components/sidebar";
import { Posts } from "~/app/_components/posts";
import { CreatePost } from "~/app/_components/create-post";

export default async function Page({ params }: { params: { channelId: string } }) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const currentChannel = await db.channel.findUnique({
    where: { id: params.channelId },
  });

  return (
    <div className="flex h-screen">
      <Sidebar channelId={params.channelId} />
      <div className="flex justify-center flex-1 shadow-lg bg-white">
        <div className="w-[800px] p-4">
          {!currentChannel ? (
            <div className="flex flex-1 flex-col justify-center items-center h-full">
              <h1 className="text-2xl font-bold mb-2 text-gray-500">Channel not found</h1>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4"># {currentChannel.name}</h1>
              <Posts channelId={params.channelId} />
              <CreatePost channelId={params.channelId} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
