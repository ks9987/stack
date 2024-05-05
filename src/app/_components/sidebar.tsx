import Link from "next/link";

type Props = {
  channels: string[];
  currentChannel: string;
};

export function Sidebar({ channels, currentChannel }: Props) {
  return (
    <div className="w-56 bg-slate-50 px-2 pt-4 select-none">
      <h2 className="text-2xl font-bold mb-4">Channels</h2>
      <ul>
        {channels.map((channel) => (
          <li
            key={channel}
            className={`rounded ${
              currentChannel === channel
                ? "bg-slate-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <Link href={`/channels/${channel}`}>
              <span className="block px-2 py-1 cursor-pointer"># {channel}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
