-- CreateTable
CREATE TABLE "job_titles" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "pdl_count" INTEGER NOT NULL,
    "top_related_titles" JSONB NOT NULL,

    CONSTRAINT "job_titles_pkey" PRIMARY KEY ("id")
);
