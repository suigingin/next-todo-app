import { prisma } from "../lib/prisma";

const main = async () => {
  await prisma.todo.createMany({
    data: [
      { description: "Sample Initial Data 1", is_completed: false },
      { description: "Sample Initial Data 2", is_completed: true },
      { description: "Sample Initial Data 3", is_completed: false },
    ],
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
