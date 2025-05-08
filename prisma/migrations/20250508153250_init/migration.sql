-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diario" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "sigla" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiarioLeido" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "diarioId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiarioLeido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Diario_sigla_key" ON "Diario"("sigla");

-- AddForeignKey
ALTER TABLE "DiarioLeido" ADD CONSTRAINT "DiarioLeido_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiarioLeido" ADD CONSTRAINT "DiarioLeido_diarioId_fkey" FOREIGN KEY ("diarioId") REFERENCES "Diario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
