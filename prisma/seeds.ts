import { db } from "~/server/db";

async function main() {
  await db.user.create({
    // seed data
  })
}

main().then(async() => {
  await db.$disconnect();
}).catch(async e => {
  console.error(e);
  await db.$disconnect();
  process.exit(1);
})
