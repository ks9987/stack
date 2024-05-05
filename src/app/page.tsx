import { redirect } from "next/navigation";
import { Sidebar } from "~/app/_components/sidebar";
import { Posts } from "~/app/_components/posts";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const channels = ["general", "random", "announcements"];
  const currentChannel = "general";
  const posts = [
    { id: 1, text: "Hello, world!", channel: "general" },
    { id: 2, text: "マスカットの中でも最高級といわれるマスカットオブアレキサンドリアを ひとつひとつ丁寧にまるごと求肥で包んだ和菓子です!", channel: "general" },
  ];
  // const latestPost = await api.post.getLatest();
  // const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <div className="flex h-screen">
      <Sidebar channels={channels} currentChannel={currentChannel} />
      <div className="flex-1 p-4 shadow-lg">
        <h1 className="text-2xl font-bold mb-4"># {currentChannel}</h1>
        <Posts posts={posts} />
        <CreatePost currentChannel={currentChannel} />
      </div>
    </div>
  );
}
