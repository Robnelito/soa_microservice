-- CreateTable
CREATE TABLE "Paiement" (
    "idPaiement" TEXT NOT NULL,
    "idClient" INTEGER NOT NULL,
    "firstnameClient" TEXT NOT NULL,
    "lastnameClient" TEXT NOT NULL,
    "remnantsClient" DOUBLE PRECISION NOT NULL,
    "accountNumberClient" TEXT NOT NULL,
    "montantVirement" DOUBLE PRECISION NOT NULL,
    "dateVirement" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("idPaiement")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paiement_idClient_key" ON "Paiement"("idClient");

-- CreateIndex
CREATE UNIQUE INDEX "Paiement_accountNumberClient_key" ON "Paiement"("accountNumberClient");
