-- 202407XXXXXX_add-user-model.sql

-- Étape 1 : Ajouter la colonne userId avec une valeur par défaut temporaire
ALTER TABLE "Contact" ADD COLUMN "userId" INTEGER NOT NULL DEFAULT 1;

-- Étape 2 : Créer la table User
CREATE TABLE "User" (
                        "id" SERIAL NOT NULL,
                        "email" TEXT NOT NULL,
                        "password" TEXT NOT NULL,
                        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Ajouter un utilisateur temporaire (ou utilisez un utilisateur existant si applicable)
INSERT INTO "User" ("email", "password") VALUES ('temporary@example.com', 'temporarypassword');

-- Mettre à jour les enregistrements existants avec l'ID de l'utilisateur temporaire
UPDATE "Contact" SET "userId" = 1; -- Assurez-vous que l'ID correspond à celui de l'utilisateur temporaire ajouté

-- Étape 3 : Supprimer la valeur par défaut temporaire
ALTER TABLE "Contact" ALTER COLUMN "userId" DROP DEFAULT;

-- Ajouter la contrainte de clé étrangère
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
