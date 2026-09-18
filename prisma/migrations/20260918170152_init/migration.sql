-- CreateEnum
CREATE TYPE "ResumeStatus" AS ENUM ('QUEUED', 'PROCESSING', 'DONE', 'FAILED');

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "status" "ResumeStatus" NOT NULL DEFAULT 'QUEUED',
    "extractedText" TEXT,
    "summary" JSONB,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Resume_status_idx" ON "Resume"("status");
