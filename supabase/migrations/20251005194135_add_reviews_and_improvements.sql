/*
  # Améliorations Majeures du Site

  ## Nouvelles Tables
  
  ### 1. reviews - Système d'avis clients
  - `id` (uuid, clé primaire)
  - `product_id` (uuid, référence products)
  - `customer_name` (text) - Nom du client
  - `customer_email` (text) - Email du client
  - `rating` (integer) - Note de 1 à 5
  - `comment` (text) - Commentaire
  - `created_at` (timestamptz)
  - `is_approved` (boolean) - Modération par admin
  
  ### 2. product_images - Galerie d'images
  - `id` (uuid, clé primaire)
  - `product_id` (uuid, référence products)
  - `image_url` (text) - URL de l'image
  - `display_order` (integer) - Ordre d'affichage
  - `is_primary` (boolean) - Image principale
  - `created_at` (timestamptz)
  
  ### 3. promotional_banners - Bannières promotionnelles
  - `id` (uuid, clé primaire)
  - `title` (text) - Titre de la promotion
  - `description` (text) - Description
  - `image_url` (text) - Image de la bannière
  - `link_url` (text) - Lien vers produit/page
  - `is_active` (boolean) - Active ou non
  - `display_order` (integer) - Ordre d'affichage
  - `start_date` (timestamptz)
  - `end_date` (timestamptz)
  - `created_at` (timestamptz)
  
  ### 4. cart_items - Panier d'achat (session locale)
  - Stocké en localStorage côté client
  
  ## Modifications de Tables Existantes
  - Ajout de `average_rating` à products
  - Ajout de `review_count` à products
  - Ajout de `discount_percentage` à products
  - Ajout de `original_price` à products

  ## Sécurité
  - RLS activé sur toutes les nouvelles tables
  - Les visiteurs peuvent voir les avis approuvés
  - Les admins peuvent modérer les avis
  - Les admins gèrent les bannières
*/

-- ============================================
-- TABLE: reviews (Avis clients)
-- ============================================

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text DEFAULT '',
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS reviews_product_id_idx ON reviews(product_id);
CREATE INDEX IF NOT EXISTS reviews_approved_idx ON reviews(is_approved);

-- RLS pour reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut voir les avis approuvés
CREATE POLICY "Anyone can view approved reviews"
  ON reviews FOR SELECT
  USING (is_approved = true);

-- Tout le monde peut soumettre un avis
CREATE POLICY "Anyone can submit reviews"
  ON reviews FOR INSERT
  WITH CHECK (true);

-- Seuls les admins peuvent modifier/approuver les avis
CREATE POLICY "Admin users can update reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

-- Seuls les admins peuvent supprimer les avis
CREATE POLICY "Admin users can delete reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- ============================================
-- TABLE: product_images (Galerie d'images)
-- ============================================

CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  display_order integer DEFAULT 0,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS product_images_product_id_idx ON product_images(product_id);

-- RLS pour product_images
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut voir les images
CREATE POLICY "Anyone can view product images"
  ON product_images FOR SELECT
  USING (true);

-- Seuls les admins peuvent gérer les images
CREATE POLICY "Admin users can manage product images"
  ON product_images FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

-- ============================================
-- TABLE: promotional_banners (Bannières promo)
-- ============================================

CREATE TABLE IF NOT EXISTS promotional_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  image_url text NOT NULL,
  link_url text DEFAULT '',
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS banners_active_idx ON promotional_banners(is_active);

-- RLS pour promotional_banners
ALTER TABLE promotional_banners ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut voir les bannières actives
CREATE POLICY "Anyone can view active banners"
  ON promotional_banners FOR SELECT
  USING (is_active = true AND start_date <= now() AND (end_date IS NULL OR end_date >= now()));

-- Seuls les admins peuvent gérer les bannières
CREATE POLICY "Admin users can manage banners"
  ON promotional_banners FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

-- ============================================
-- MODIFICATIONS: products (Nouvelles colonnes)
-- ============================================

-- Ajouter average_rating
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'average_rating'
  ) THEN
    ALTER TABLE products ADD COLUMN average_rating numeric(3,2) DEFAULT 0 CHECK (average_rating >= 0 AND average_rating <= 5);
  END IF;
END $$;

-- Ajouter review_count
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'review_count'
  ) THEN
    ALTER TABLE products ADD COLUMN review_count integer DEFAULT 0 CHECK (review_count >= 0);
  END IF;
END $$;

-- Ajouter discount_percentage
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'discount_percentage'
  ) THEN
    ALTER TABLE products ADD COLUMN discount_percentage integer DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100);
  END IF;
END $$;

-- Ajouter original_price
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'original_price'
  ) THEN
    ALTER TABLE products ADD COLUMN original_price numeric;
  END IF;
END $$;

-- ============================================
-- FONCTIONS: Mise à jour automatique des notes
-- ============================================

CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET 
    average_rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE product_id = NEW.product_id AND is_approved = true
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE product_id = NEW.product_id AND is_approved = true
    )
  WHERE id = NEW.product_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour les notes automatiquement
DROP TRIGGER IF EXISTS trigger_update_product_rating ON reviews;
CREATE TRIGGER trigger_update_product_rating
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_product_rating();

-- ============================================
-- DONNÉES INITIALES
-- ============================================

-- Insérer une bannière de bienvenue
INSERT INTO promotional_banners (title, description, image_url, link_url, display_order) VALUES
  (
    'Bienvenue sur Boutique SN',
    'Découvrez nos produits artisanaux sénégalais authentiques',
    'https://images.pexels.com/photos/6347720/pexels-photo-6347720.jpeg?auto=compress&cs=tinysrgb&w=1260',
    '/shop',
    1
  )
ON CONFLICT DO NOTHING;