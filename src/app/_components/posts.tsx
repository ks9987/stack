// @ts-nocheck

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import { generateHTML } from '@tiptap/html'
import { type JSONContent } from '@tiptap/core'

import { db } from "~/server/db";
import { EditButton } from "~/app/_components/edit-button";
import { DeleteButton } from "~/app/_components/delete-button";

export async function Posts({ channelId }: { channelId: string }) {
  const posts = await db.post.findMany({
    where: { channelId },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="mb-4">
      {posts.map((post) => {
        const json = JSON.parse(post.text) as JSONContent;
        const html = generateHTML(json, [
          Document,
          Paragraph,
          Heading,
          BulletList,
          OrderedList,
          ListItem,
          Text,
          Bold,
          Code,
          CodeBlock
        ]);
        return (
          <div
            key={post.id}
            className="mb-6 bg-white hover:bg-slate-50 hover:shadow-sm border duration-50 p-4 rounded-lg relative tiptap"
          >
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <div className="absolute top-0 right-0 border rounded bg-white p-2 flex opacity-0 hover:opacity-100 transition-opacity duration-100">
              <EditButton />
              <DeleteButton />
            </div>
          </div>
        )
      })}
    </div>
  );
}
