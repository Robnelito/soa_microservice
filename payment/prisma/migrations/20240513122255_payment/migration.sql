/*
  Warnings:

  - You are about to drop the `Paiement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Paiement";

-- CreateTable
CREATE TABLE "Payments" (
    "idPaiement" TEXT NOT NULL,
    "idClient" INTEGER NOT NULL,
    "firstnameClient" TEXT NOT NULL,
    "lastnameClient" TEXT NOT NULL,
    "remnantsClient" DOUBLE PRECISION NOT NULL,
    "accountNumberClient" TEXT NOT NULL,
    "montantVirement" DOUBLE PRECISION NOT NULL,
    "dateVirement" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("idPaiement")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payments_idClient_key" ON "Payments"("idClient");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_accountNumberClient_key" ON "Payments"("accountNumberClient");
