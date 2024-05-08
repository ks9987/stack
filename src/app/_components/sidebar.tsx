import Link from "next/link";

import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";

async function getChannels() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;
  const channels = await db.channel.findMany({
    where: { createdById: session.user.id },
    orderBy: { createdAt: "asc" },
  });
  return channels;
}

export async function Sidebar({ channelId }: { channelId: string }) {
  const channels = await getChannels();

  return (
    <div className="w-56 min-w-56 bg-slate-50 px-2 pt-4 select-none">
      <h2 className="text-2xl font-bold mb-4">Channels</h2>
      <ul>
        {channels?.map((channel) => (
          <li
            key={channel.id}
            className={`rounded ${
              channelId === channel.id
                ? "bg-slate-500 text-white"
                : "hover:bg-slate-300 duration-100"
            }`}
          >
            <Link href={`/${channel.id}`}>
              <span className="block px-2 py-1 cursor-pointer"># {channel.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
