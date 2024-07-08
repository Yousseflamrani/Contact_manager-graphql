-- 20240706121725_schema_correction.sql

-- Ajouter des colonnes temporaires pour conserver les données existantes
ALTER TABLE "Contact" ADD COLUMN "tempCreatedAt" TIMESTAMP(3);
ALTER TABLE "Contact" ADD COLUMN "tempUpdatedAt" TIMESTAMP(3);

-- Mettre à jour les colonnes temporaires avec les données existantes
UPDATE "Contact" SET "tempCreatedAt" = "createdAT", "tempUpdatedAt" = "updatedAT";

-- Supprimer les anciennes colonnes
ALTER TABLE "Contact" DROP COLUMN "createdAT";
ALTER TABLE "Contact" DROP COLUMN "updatedAT";

-- Ajouter les nouvelles colonnes avec des valeurs par défaut
ALTER TABLE "Contact" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Contact" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Mettre à jour les nouvelles colonnes avec les valeurs des colonnes temporaires
UPDATE "Contact" SET "createdAt" = "tempCreatedAt", "updatedAt" = "tempUpdatedAt";

-- Supprimer les colonnes temporaires
ALTER TABLE "Contact" DROP COLUMN "tempCreatedAt";
ALTER TABLE "Contact" DROP COLUMN "tempUpdatedAt";
