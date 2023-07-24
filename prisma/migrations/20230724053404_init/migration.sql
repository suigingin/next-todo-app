-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);
