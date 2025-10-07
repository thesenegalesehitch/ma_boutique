/*
  # Ajouter Table Categories

  ## Description
  Cette migration crée une table pour gérer les catégories de produits.

  ## Nouvelles Tables
  - `categories`
    - `id` (uuid, clé primaire)
    - `name` (text, unique) - Nom de la catégorie
    - `description` (text) - Description
    - `created_at` (timestamptz) - Date de création

  ## Modifications
  - Ajout d'une colonne `category_id` à la table products
  - Relation entre products et categories

  ## Sécurité
  - RLS activé sur categories
  - Les visiteurs peuvent voir les catégories
  - Seuls les admins peuvent les modifier
*/

-- Créer la table categories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Activer RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Politique : Tout le monde peut voir les catégories
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

-- Politique : Seuls les admins peuvent ajouter des catégories
CREATE POLICY "Admin users can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IN (SELECT id FROM admin_users)
  );

-- Politique : Seuls les admins peuvent modifier les catégories
CREATE POLICY "Admin users can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users)
  )
  WITH CHECK (
    auth.uid() IN (SELECT id FROM admin_users)
  );

-- Politique : Seuls les admins peuvent supprimer les catégories
CREATE POLICY "Admin users can delete categories"
  ON categories FOR DELETE
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users)
  );

-- Ajouter une colonne category_id à products
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'category_id'
  ) THEN
    ALTER TABLE products ADD COLUMN category_id uuid REFERENCES categories(id);
  END IF;
END $$;

-- Insérer quelques catégories par défaut
INSERT INTO categories (name, description) VALUES
  ('Mode', 'Vêtements et accessoires de mode'),
  ('Artisanat', 'Produits artisanaux faits main'),
  ('Décoration', 'Articles de décoration pour la maison'),
  ('Bijoux', 'Bijoux et accessoires')
ON CONFLICT (name) DO NOTHING;