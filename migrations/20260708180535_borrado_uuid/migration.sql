-- DropForeignKey
ALTER TABLE "eventos" DROP CONSTRAINT "eventos_presupuestoId_fkey";

-- AlterTable
ALTER TABLE "eventos" ALTER COLUMN "presupuestoId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_presupuestoId_fkey" FOREIGN KEY ("presupuestoId") REFERENCES "presupuestos"("id_presupuesto") ON DELETE SET NULL ON UPDATE CASCADE;
