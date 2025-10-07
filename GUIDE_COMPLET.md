# 📚 Guide Complet - Boutique SN

## 🎯 Guide Utilisateur Admin - Comment Tout Modifier

Ce guide vous explique **PAS À PAS** comment gérer votre boutique.

---

## 📱 1. ACCÈS ADMIN

### Se Connecter

1. Aller sur votre site
2. Cliquer sur l'icône utilisateur (👤) en haut à droite
3. Entrer vos identifiants :
   - **Email**: `admin@boutique-sn.com`
   - **Password**: `BoutiqueSN2024!`
4. Cliquer sur "Se connecter"

> ⚠️ **Important** : Conservez ces identifiants en sécurité !

---

## 🏷️ 2. GÉRER LES CATÉGORIES

Les catégories vous permettent d'organiser vos produits.

### Créer une Catégorie

1. Cliquer sur l'onglet **"Catégories"** (violet)
2. Cliquer sur **"Nouvelle Catégorie"**
3. Remplir le formulaire :
   - **Nom** : Ex: "Vêtements", "Chaussures", "Accessoires"
   - **Description** : Ex: "Vêtements traditionnels et modernes"
4. Cliquer sur **"Créer"**

### Modifier une Catégorie

1. Passer la souris sur une catégorie
2. Cliquer sur l'icône **crayon** (✏️)
3. Modifier les informations
4. Cliquer sur **"Modifier"**

### Supprimer une Catégorie

1. Passer la souris sur une catégorie
2. Cliquer sur l'icône **poubelle** (🗑️)
3. Confirmer la suppression

> ⚠️ Les produits de cette catégorie ne seront PAS supprimés

---

## 📦 3. GÉRER LES PRODUITS

### Créer un Produit

1. Cliquer sur l'onglet **"Produits"** (bleu)
2. Cliquer sur **"Nouveau Produit"**
3. Remplir le formulaire :

#### Informations de Base
- **Nom du produit** : Ex: "Robe Sénégalaise"
- **Catégorie** : Choisir dans la liste déroulante
- **Description** : Décrivez le produit en détail

#### Prix et Stock
- **Prix (CFA)** : Ex: 25000
- **Stock disponible** : Ex: 10 (combien d'unités disponibles)
- **Réduction (%)** : Ex: 20 pour -20%
  - Le prix original sera automatiquement calculé
  - Laissez vide si pas de réduction

#### Images du Produit

**Option 1 : Ajouter des Images Locales**

1. Cliquer sur **"Ajouter Images"**
2. Sélectionner vos photos depuis votre ordinateur/téléphone
3. Vous pouvez ajouter jusqu'à **5 images**
4. La **première image** sera l'image principale

**Important pour les Images** :
- Format accepté : JPG, PNG, WEBP
- Taille maximum : **5 MB** par image
- La première image apparaît sur la carte produit
- Les autres images seront dans la galerie (à venir)

**Option 2 : URL d'Image en Ligne**

Si vous préférez utiliser une URL :
1. Héberger votre image sur Imgur, Cloudinary, etc.
2. Copier l'URL
3. Coller dans le champ image

#### Options Supplémentaires
- **Produit en vedette** : Cocher pour mettre en avant
  - Ces produits s'affichent en premier
  - Badge "Populaire" automatique

4. Cliquer sur **"Créer"**

### Modifier un Produit

1. Passer la souris sur le produit
2. Cliquer sur l'icône **crayon** (✏️)
3. Modifier les informations
4. Cliquer sur **"Modifier"**

### Supprimer un Produit

1. Passer la souris sur le produit
2. Cliquer sur l'icône **poubelle** (🗑️)
3. Confirmer (⚠️ irréversible)

---

## 📝 4. GÉRER LES COMMANDES

### Voir les Commandes

1. Cliquer sur l'onglet **"Commandes"** (orange)
2. Voir toutes les commandes

### Filtrer les Commandes

Cliquer sur les boutons :
- **Toutes** : Voir toutes les commandes
- **En attente** : Nouvelles commandes (🔔 avec badge)
- **Confirmée** : Commandes acceptées
- **Terminée** : Commandes livrées
- **Annulée** : Commandes annulées

### Traiter une Commande

#### 1. Commande "En attente"

Une nouvelle commande arrive :

1. Voir les détails :
   - Nom du client
   - Email et téléphone
   - Produit commandé
   - Quantité
   - Total à payer

2. Deux choix :

**Option A : Confirmer**
- Cliquer sur **"Confirmer"** (vert)
- ⚠️ **Le stock sera automatiquement décrémenté** !
- Exemple : Stock 10 → Commande 2 → Nouveau stock : 8

**Option B : Annuler**
- Cliquer sur **"Annuler"** (rouge)
- Le stock ne changera PAS

#### 2. Commande "Confirmée"

Après confirmation :
- Préparer le produit
- Contacter le client (cliquer sur email/téléphone)
- Une fois livré : Cliquer sur **"Terminer"**

#### 3. Commande "Terminée"

C'est fini ! Archivée pour vos statistiques.

---

## ⭐ 5. GÉRER LES AVIS CLIENTS

### Voir les Avis

1. Cliquer sur l'onglet **"Avis"** (jaune)
2. Deux onglets :
   - **En attente** : Avis à modérer (🔔 avec badge)
   - **Approuvés** : Avis visibles sur le site

### Approuver un Avis

1. Lire l'avis
2. Cliquer sur l'icône **check** (✅)
3. L'avis apparaît maintenant sur le site

### Supprimer un Avis

1. Cliquer sur l'icône **poubelle** (🗑️)
2. Confirmer

> 💡 **Astuce** : Approuvez rapidement les bons avis pour rassurer les clients !

---

## 🎨 6. PERSONNALISER LES CONTACTS

### Modifier vos Informations

Ouvrir : `src/pages/ContactPage.tsx`

#### Téléphone

Ligne 48 :
```typescript
{ icon: Phone, label: 'Téléphone', value: '+221 77 654 32 10',
  color: 'text-green-500', link: 'tel:+221776543210' },
```

Remplacer :
- `value: '+221 XX XXX XX XX'` - Numéro affiché
- `link: 'tel:+221XXXXXXXXX'` - Lien cliquable (sans espaces)

#### Email

Ligne 49 :
```typescript
{ icon: Mail, label: 'Email', value: 'votreemail@example.com',
  color: 'text-blue-500', link: 'mailto:votreemail@example.com' },
```

#### Adresse

Ligne 47 :
```typescript
{ icon: MapPin, label: 'Adresse', value: 'Votre adresse',
  color: 'text-red-500', link: null },
```

### Modifier les Réseaux Sociaux

Lignes 22-26 :
```typescript
const socialLinks = [
  { icon: Facebook, label: 'Facebook', color: 'hover:text-blue-600',
    url: 'https://facebook.com/VOTRE_PAGE' },
  { icon: MessageCircle, label: 'WhatsApp', color: 'hover:text-green-600',
    url: 'https://wa.me/221XXXXXXXXX' },
  { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-600',
    url: 'https://instagram.com/VOTRE_COMPTE' },
  { icon: Camera, label: 'Snapchat', color: 'hover:text-yellow-500',
    url: 'https://snapchat.com/add/VOTRE_SNAP' },
];
```

Remplacez les URL par vos vrais liens !

#### Ajouter TikTok

Ligne 2 :
```typescript
import { Mail, Phone, MapPin, Send, Facebook, Instagram, MessageCircle, Camera, Video } from 'lucide-react';
```

Ligne 26 (après Snapchat) :
```typescript
{ icon: Video, label: 'TikTok', color: 'hover:text-black',
  url: 'https://tiktok.com/@VOTRE_COMPTE' },
```

---

## 🎭 7. PERSONNALISER LA NAVBAR

### Modifier le Nom du Site

Ouvrir : `src/components/Navbar.tsx`

Ligne 36-38 :
```typescript
<span className={`text-xl font-bold transition-colors ${scrolled ? 'text-gray-800' : 'text-white'}`}>
  Boutique SN
</span>
```

Remplacer `Boutique SN` par le nom de votre boutique.

---

## 🏠 8. PERSONNALISER LA PAGE D'ACCUEIL

### Modifier le Titre Principal

Ouvrir : `src/pages/HomePage.tsx`

Chercher (CTRL+F) : "Découvrez"

Vous trouverez :
```typescript
<h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-[fadeIn_1s_ease-out]">
  Découvrez nos<br />Produits Authentiques
</h1>
```

Changez le texte entre les balises.

### Modifier la Description

Juste en dessous :
```typescript
<p className="text-xl md:text-2xl text-white mb-8">
  Votre texte ici
</p>
```

---

## 💾 9. GESTION DU STOCK

### Comprendre le Stock

Le stock se gère automatiquement :

#### Scénario
1. **Stock initial** : 10 unités
2. **Client commande** : 3 unités
3. **Vous confirmez** : Click "Confirmer"
4. **Nouveau stock** : 7 unités (10 - 3)

#### Stock Épuisé

Quand stock = 0 :
- Badge "Rupture de stock" automatique
- Boutons désactivés sur le site
- Les clients ne peuvent pas commander

### Réapprovisionner

1. Aller dans **Produits**
2. Modifier le produit
3. Augmenter le **Stock disponible**
4. Enregistrer

---

## 🎉 10. BANNIÈRES PROMOTIONNELLES

### Créer une Bannière

Les bannières s'affichent en haut de la page Boutique.

#### Via SQL (pour l'instant)

```sql
INSERT INTO promotional_banners (
  title,
  description,
  image_url,
  link_url,
  is_active,
  display_order
) VALUES (
  'Soldes d''Été -50%',
  'Profitez de nos réductions exceptionnelles !',
  'https://images.pexels.com/photos/6347720/pexels-photo-6347720.jpeg',
  '/shop',
  true,
  1
);
```

#### Paramètres
- **title** : Titre principal
- **description** : Sous-titre
- **image_url** : URL de l'image
- **link_url** : Lien du bouton (généralement `/shop`)
- **is_active** : `true` pour activer
- **display_order** : Ordre d'affichage (1, 2, 3...)

### Images pour Bannières

Utilisez des sites gratuits :
- **Pexels** : https://www.pexels.com
- **Unsplash** : https://unsplash.com
- **Pixabay** : https://pixabay.com

Format recommandé : 1920x600 pixels

---

## 🎨 11. METTRE DES PRODUITS EN RÉDUCTION

### Méthode Simple

1. Aller dans **Produits**
2. Modifier le produit
3. Dans **"Réduction (%)"**, entrer : `20` (pour -20%)
4. Le **prix original** sera calculé automatiquement
5. Enregistrer

### Ce qui s'affiche
- Badge rouge **"-20%"**
- Prix original barré : ~~50,000 CFA~~
- Nouveau prix : **40,000 CFA**

### Méthode Avancée (SQL)

```sql
UPDATE products
SET
  discount_percentage = 30,
  original_price = price,
  price = price * 0.7  -- -30%
WHERE name = 'Nom du produit';
```

---

## 📊 12. VOIR VOS STATISTIQUES

En haut du Dashboard Admin :
- **Nombre de produits**
- **Nombre de commandes**
- **Commandes en attente** (badge rouge)
- **Avis en attente** (badge rouge)

---

## 🔧 13. DÉPANNAGE

### Problème : Image ne s'affiche pas

**Solutions** :
1. Vérifier l'URL de l'image
2. Tester l'URL dans le navigateur
3. Vérifier la taille (< 5MB)
4. Format accepté : JPG, PNG, WEBP

### Problème : Stock ne décrémente pas

**Solution** :
- Vous devez cliquer sur **"Confirmer"**
- Si commande "En attente", le stock ne bouge pas encore

### Problème : Mot de passe oublié

**Solution** :
Contactez le développeur pour réinitialiser.

---

## 🚀 14. AMÉLIORATIONS SUGGÉRÉES

### Maintenant
- ✅ Créer vos catégories
- ✅ Ajouter vos produits
- ✅ Modifier vos contacts
- ✅ Personnaliser les textes

### Bientôt (à développer)
- 📧 **Newsletter** : Collecter des emails
- 🎫 **Codes Promo** : Offrir des réductions spéciales
- 📦 **Suivi Livraison** : Numéros de tracking
- 💳 **Paiement en Ligne** : Stripe, PayPal, Wave
- 📱 **Notifications SMS** : Confirmer les commandes
- 📊 **Dashboard Avancé** : Graphiques et statistiques
- 🔍 **Recherche Avancée** : Filtres multiples
- ❤️ **Liste de Souhaits** : Sauvegarder des produits
- 🌐 **Multi-langues** : Français + Wolof + Anglais
- 📸 **Zoom Images** : Agrandir les photos produits

### Idées Marketing
- 🎁 **Programme Fidélité** : Points par achat
- 🔔 **Alerte Stock** : "Notifiez-moi quand disponible"
- 👥 **Parrainage** : "Invitez un ami, gagnez 5%"
- 📱 **App Mobile** : Version iOS + Android
- 🤝 **Avis Vérifiés** : Badge "Achat vérifié"
- 📦 **Box Mystère** : Produits surprise
- ⏰ **Ventes Flash** : 2h pour profiter
- 🎯 **Recommandations** : "Vous aimerez aussi"

---

## 📱 15. RACCOURCIS ADMIN

### Navigation Rapide

- **Accueil** : Click logo "Boutique SN"
- **Produits** : Onglet bleu
- **Catégories** : Onglet violet
- **Commandes** : Onglet orange (+ badge si nouvelles)
- **Avis** : Onglet jaune (+ badge si nouveaux)
- **Retour Site** : Bouton "Retour" ou "Déconnexion"

### Tooltips (Infobulles)

Passez la souris sur les boutons pour voir :
- "Modifier ce produit"
- "Supprimer cette catégorie"
- "Confirmer la commande"
- etc.

---

## 🎓 16. CONSEILS DE PRO

### Pour Vendre Plus

1. **Photos de Qualité** : Lumière naturelle, fond neutre
2. **Descriptions Détaillées** : Matière, taille, couleur
3. **Prix Justes** : Comparer avec la concurrence
4. **Répondre Vite** : Emails/WhatsApp < 1h
5. **Avis Clients** : Encourager les retours positifs
6. **Promotions** : -20% chaque mois
7. **Stock Visible** : "Plus que 3 en stock !"
8. **Badges** : "Nouveau", "Populaire", "-50%"

### Pour Gérer Efficacement

1. **Check Commandes** : 2x par jour minimum
2. **Approuver Avis** : Tous les jours
3. **Mise à Jour Stock** : Après chaque vente
4. **Photos Cohérentes** : Même style pour tous les produits
5. **Catégories Claires** : Max 8-10 catégories
6. **Prix Arrondis** : 25,000 au lieu de 24,850

---

## 🔐 17. SÉCURITÉ

### Bonnes Pratiques

- ✅ Ne partagez JAMAIS vos identifiants admin
- ✅ Déconnectez-vous sur ordinateurs publics
- ✅ Changez le mot de passe tous les 3 mois
- ✅ Vérifiez les commandes suspectes
- ✅ N'acceptez pas de paiements hors plateforme

---

## 📞 18. SUPPORT

### Besoin d'Aide ?

1. Relire ce guide
2. Chercher dans la documentation (CTRL+F)
3. Tester sur une copie de test
4. Contacter le développeur

---

## 🎉 FÉLICITATIONS !

Vous savez maintenant gérer votre boutique de A à Z !

**Checklist de Démarrage** :
- [ ] Créer 3-5 catégories
- [ ] Ajouter 10 produits minimum
- [ ] Modifier les contacts
- [ ] Tester une commande
- [ ] Personnaliser les textes
- [ ] Créer une bannière promo
- [ ] Mettre un produit en vedette
- [ ] Appliquer une réduction

**Prêt à Vendre ! 🚀**

---

**Version** : 2.1.0
**Dernière mise à jour** : Octobre 2025
**Made with ❤️ in Senegal 🇸🇳**
