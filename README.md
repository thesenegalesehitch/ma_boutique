# 🛍️ Boutique SN - Site Vitrine E-Commerce

Site vitrine moderne et élégant pour boutique en ligne sénégalaise avec interface d'administration complète.

## 📋 Table des Matières

1. [Identifiants Admin](#-identifiants-admin)
2. [Installation Rapide](#-installation-rapide)
3. [Structure du Projet](#-structure-du-projet)
4. [Fonctionnalités](#-fonctionnalités)
5. [Guide d'Utilisation](#-guide-dutilisation)
6. [Déploiement](#-déploiement)
7. [Technologies](#-technologies)
8. [Résolution de Problèmes](#-résolution-de-problèmes)

---

## 🔐 Identifiants Admin

**IMPORTANT : Utilisez ces identifiants pour accéder au tableau de bord admin**

```
Email:    admin@boutique-sn.com
Password: BoutiqueSN2024!
```

### Comment se connecter à l'admin

1. Lancez l'application (`npm run dev`)
2. Cliquez sur l'**icône utilisateur** en haut à droite de la navbar
3. Entrez les identifiants ci-dessus
4. Vous serez automatiquement redirigé vers le tableau de bord admin

⚠️ **Sécurité** : Changez ce mot de passe en production !

---

## 🚀 Installation Rapide

### Prérequis

- **Node.js** 18+ ([Télécharger](https://nodejs.org/))
- **npm** (inclus avec Node.js)
- Un navigateur moderne (Chrome, Firefox, Safari, Edge)

### Étapes d'installation

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir dans le navigateur
# L'application s'ouvre automatiquement à http://localhost:5173
```

**C'est tout !** Le site est prêt à l'emploi avec la base de données déjà configurée.

---

## 📁 Structure du Projet

```
boutique-sn/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── Navbar.tsx      # Barre de navigation
│   │   ├── Footer.tsx      # Pied de page
│   │   └── OrderModal.tsx  # Modal de commande
│   ├── pages/              # Pages de l'application
│   │   ├── HomePage.tsx    # Page d'accueil
│   │   ├── AboutPage.tsx   # Page À propos
│   │   ├── ShopPage.tsx    # Page boutique
│   │   ├── ContactPage.tsx # Page contact
│   │   ├── AdminLogin.tsx  # Page de connexion admin
│   │   └── AdminDashboard.tsx # Tableau de bord admin
│   ├── contexts/           # Contexts React
│   │   └── AuthContext.tsx # Gestion authentification
│   ├── lib/                # Bibliothèques et utilitaires
│   │   └── supabase.ts     # Client Supabase + Types
│   ├── App.tsx             # Composant principal
│   ├── main.tsx            # Point d'entrée
│   └── index.css           # Styles globaux + animations
├── supabase/
│   └── migrations/         # Migrations base de données
├── public/
│   └── robots.txt          # Configuration SEO
├── .env                    # Variables d'environnement
├── package.json            # Dépendances
└── README.md              # Cette documentation
```

---

## ✨ Fonctionnalités

### Pages Publiques

#### 🏠 **Page d'Accueil**
- Hero section animée avec dégradé orange/rouge
- Texte apparaissant en fondu avec effet de profondeur
- Bouton "Découvrir" avec animation pulse
- Sections de fonctionnalités avec hover effects
- Scroll indicator animé

#### ℹ️ **Page À Propos**
- Titre avec animation de soulignement
- Texte qui apparaît progressivement (effet machine à écrire)
- Cartes de valeurs avec icônes et animations hover
- Design moderne avec dégradés subtils

#### 🛒 **Page Boutique**
- **Recherche en temps réel** : Filtrage instantané des produits
- **Tri dynamique** :
  - Plus récents
  - Prix croissant/décroissant
  - Nom alphabétique
- **Cartes produits animées** :
  - Zoom au survol
  - Bouton "Commander" qui glisse depuis le bas
  - Badge "Populaire" pour produits en vedette
- **État vide élégant** : Message animé si aucun produit
- Animation de chargement (spinner)

#### 📦 **Modal de Commande**
- Apparition avec animation zoom élégant
- **Formulaire validé** :
  - Nom complet (requis)
  - Email (validation format)
  - Téléphone (format sénégalais : +221 XX XXX XX XX)
  - Quantité (vérification du stock)
- Calcul automatique du total
- Confirmation animée avec icône de succès
- Messages d'erreur contextuels

#### 📞 **Page Contact**
- Formulaire de message complet
- Informations de contact :
  - Adresse : Dakar, Sénégal
  - Téléphone : +221 77 654 32 10
  - Email : boutique.sn@example.com
- **Réseaux sociaux** avec animations :
  - Facebook
  - WhatsApp (lien cliquable)
  - Instagram
- Fond animé avec effets de lumière

### 🔒 Interface Admin (Sécurisée)

#### Connexion Admin
- Page de login élégante
- Validation en temps réel
- Messages d'erreur clairs
- Protection contre les attaques

#### 📊 Tableau de Bord

**1. Gestion des Produits**
- ✅ Ajouter un produit :
  - Nom
  - Description
  - Prix (CFA)
  - URL de l'image
  - Stock
  - Marquer comme "en vedette"
- ✏️ Modifier un produit existant
- 🗑️ Supprimer un produit (avec confirmation)
- Toutes les actions avec animations fluides

**2. Gestion des Commandes**
- Visualiser toutes les commandes
- Voir les détails clients :
  - Nom, email, téléphone
  - Produit commandé
  - Quantité et montant total
- **Mettre à jour le statut** :
  - En attente (jaune)
  - Confirmée (bleu)
  - Complétée (vert)
  - Annulée (rouge)
- Tri par date (plus récentes en premier)

**3. Gestion du Contenu du Site**
- Modifier les textes de la page d'accueil :
  - Titre hero
  - Sous-titre
- Modifier les textes de la page À propos :
  - Titre
  - Contenu
- Modifier les informations de contact
- **Modifications en temps réel** : Les changements sont visibles immédiatement sur le site

---

## 📖 Guide d'Utilisation

### Pour les Visiteurs

#### Passer une Commande

1. Aller sur la page **Boutique**
2. Parcourir les produits disponibles
3. Utiliser la recherche ou les filtres si besoin
4. Cliquer sur **"Commander"** sur le produit souhaité
5. Remplir le formulaire :
   - Votre nom complet
   - Votre email
   - Votre numéro de téléphone (format : +221 XX XXX XX XX)
   - La quantité désirée
6. Cliquer sur **"Confirmer la commande"**
7. Vous recevrez une confirmation et serez contacté bientôt

#### Contacter la Boutique

1. Aller sur la page **Contact**
2. Remplir le formulaire avec votre message
3. Ou cliquer sur les icônes de réseaux sociaux
4. Pour WhatsApp, cliquez directement pour démarrer une conversation

### Pour les Administrateurs

#### Se Connecter

1. Cliquer sur l'icône **utilisateur** en haut à droite
2. Entrer :
   - Email : `admin@boutique-sn.com`
   - Mot de passe : `BoutiqueSN2024!`
3. Cliquer sur **"Se connecter"**

#### Ajouter un Produit

1. Dans le tableau de bord, aller sur **"Produits"**
2. Cliquer sur **"Ajouter un produit"**
3. Remplir les informations :
   - **Nom** : Ex. "Sac en cuir artisanal"
   - **Prix** : Ex. "25000" (sans CFA, juste le nombre)
   - **URL Image** : Lien vers une image (ex: depuis Pexels)
   - **Stock** : Ex. "10"
   - **Description** : Description détaillée
   - **En vedette** : Cocher si vous voulez le mettre en avant
4. Cliquer sur **"Enregistrer"**

**💡 Astuce** : Utilisez des images de haute qualité depuis [Pexels](https://www.pexels.com/) pour un rendu professionnel

#### Gérer une Commande

1. Aller sur l'onglet **"Commandes"**
2. Voir toutes les commandes reçues
3. Pour chaque commande :
   - Voir les infos client et produit
   - Changer le statut avec le menu déroulant :
     - **En attente** : Commande reçue, pas encore traitée
     - **Confirmée** : Commande acceptée, en préparation
     - **Complétée** : Commande livrée
     - **Annulée** : Commande annulée
4. Le statut est sauvegardé automatiquement

#### Modifier le Contenu du Site

1. Aller sur l'onglet **"Contenu du site"**
2. Cliquer sur l'icône **crayon** à côté du texte à modifier
3. Modifier le texte dans la zone de texte
4. Cliquer sur **"Enregistrer"**
5. Les changements apparaissent immédiatement sur le site public

#### Se Déconnecter

1. Cliquer sur **"Déconnexion"** en haut à droite du tableau de bord

---

## 🌐 Déploiement

### Hébergeurs Recommandés

Le site peut être déployé gratuitement sur :

#### **Vercel** (Recommandé)

1. Créer un compte sur [Vercel](https://vercel.com)
2. Importer le projet depuis GitHub
3. Configuration automatique détectée
4. Ajouter les variables d'environnement :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Déployer

#### **Netlify**

1. Créer un compte sur [Netlify](https://www.netlify.com)
2. Glisser-déposer le dossier `dist/` (après `npm run build`)
3. Ou connecter depuis GitHub pour déploiement automatique
4. Ajouter les variables d'environnement dans Settings

#### **Configuration Générale**

Pour tous les hébergeurs :

```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node Version: 18.x
```

### Variables d'Environnement

Ajouter dans les paramètres de l'hébergeur :

```
VITE_SUPABASE_URL=https://mcuwqxacwgzfamovsyjs.supabase.co
VITE_SUPABASE_ANON_KEY=votre_clé_anon
```

⚠️ **Important** : Ces variables sont déjà dans votre fichier `.env` local

### Domaine Personnalisé

1. Acheter un nom de domaine (ex: boutique-sn.com)
2. Dans les paramètres de l'hébergeur, ajouter le domaine personnalisé
3. Configurer les DNS selon les instructions de l'hébergeur
4. Attendre la propagation DNS (24-48h max)

---

## 🛠️ Technologies

### Frontend

- **React 18** - Framework UI moderne
- **TypeScript** - Typage statique pour plus de sécurité
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Bibliothèque d'icônes élégantes

### Backend & Base de Données

- **Supabase** - Backend as a Service
  - PostgreSQL (base de données)
  - Authentification intégrée
  - Row Level Security (RLS)
  - API auto-générée

### Animations

- **Tailwind Animations** - Animations CSS personnalisées
- **CSS Transitions** - Transitions fluides
- **Keyframes personnalisés** - Effets visuels avancés

---

## 🐛 Résolution de Problèmes

### Problème : "npm install" échoue

**Solution** :
```bash
# Supprimer node_modules et le cache
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Problème : Impossible de se connecter à l'admin

**Vérifications** :

1. **Identifiants corrects** :
   - Email : `admin@boutique-sn.com`
   - Password : `BoutiqueSN2024!`

2. **Vérifier la connexion internet** : Supabase nécessite une connexion

3. **Vérifier les variables d'environnement** :
   ```bash
   cat .env
   ```
   Doit contenir `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`

4. **Réinitialiser le cache du navigateur** :
   - Chrome/Edge : Ctrl + Shift + Delete
   - Firefox : Ctrl + Shift + Delete
   - Safari : Cmd + Option + E

### Problème : Les produits n'apparaissent pas

**Solution** :

1. Vérifier que vous êtes connecté en tant qu'admin
2. Ajouter au moins un produit dans le tableau de bord
3. Rafraîchir la page Boutique (F5)

### Problème : "Build failed"

**Solution** :
```bash
# Vérifier les erreurs TypeScript
npm run typecheck

# Si des erreurs, corriger puis rebuilder
npm run build
```

### Problème : Port 5173 déjà utilisé

**Solution** :
```bash
# Tuer le processus sur le port 5173
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9

# Ou utiliser un autre port
npm run dev -- --port 3000
```

### Problème : Erreur "Database error" lors de la connexion

**Solution** :

La base de données Supabase est peut-être en maintenance ou les politiques RLS ont un problème.

**Vérifier l'état de Supabase** :
1. Aller sur [status.supabase.com](https://status.supabase.com)
2. Vérifier que tous les services sont opérationnels

**Si le problème persiste**, les migrations peuvent être réappliquées automatiquement au prochain déploiement.

### Problème : Les modifications admin ne sont pas visibles

**Solution** :

1. **Rafraîchir la page** (F5)
2. **Vider le cache** :
   - Ouvrir DevTools (F12)
   - Clic droit sur le bouton refresh
   - Choisir "Vider le cache et actualiser"
3. **Vérifier que la modification a été sauvegardée** :
   - Le bouton doit afficher une confirmation
   - Réessayer si nécessaire

---

## 📞 Support & Contact

### Besoin d'Aide ?

- **Email** : boutique.sn@example.com
- **Téléphone** : +221 77 654 32 10
- **Horaires** : Lundi-Vendredi, 9h-18h (GMT)

### Signaler un Bug

Si vous trouvez un problème :

1. Décrire le problème en détail
2. Inclure les étapes pour reproduire
3. Joindre une capture d'écran si possible
4. Envoyer à l'email de support

---

## 📝 Notes de Version

### Version 1.0.0 (Actuelle)

**Fonctionnalités** :
- ✅ Site vitrine complet avec 5 pages
- ✅ Interface admin sécurisée
- ✅ Gestion complète des produits
- ✅ Système de commandes
- ✅ Gestion du contenu dynamique
- ✅ Animations fluides et modernes
- ✅ Responsive design (mobile-first)
- ✅ Base de données Supabase configurée
- ✅ Authentification sécurisée
- ✅ Row Level Security (RLS)

**Corrections** :
- ✅ Résolution de la récursion infinie RLS
- ✅ Fix des identifiants admin
- ✅ Optimisation des politiques de sécurité

---

## 🎨 Design & UX

### Palette de Couleurs

- **Orange** : #F97316 (principal)
- **Rouge** : #DC2626 (accents)
- **Vert** : #10B981 (succès)
- **Bleu** : #3B82F6 (info)
- **Gris** : #6B7280 (texte secondaire)

### Animations Personnalisées

- **fadeIn** : Apparition en fondu avec translation
- **scaleIn** : Zoom depuis le centre
- **slideIn** : Glissement horizontal
- **shake** : Secousse (pour erreurs)
- **pulse** : Pulsation continue
- **bounce** : Rebond

### Responsive Breakpoints

- **Mobile** : < 640px
- **Tablet** : 640px - 1024px
- **Desktop** : > 1024px

---

## 📄 Licence

Ce projet est développé pour Boutique SN. Tous droits réservés.

---

## 🇸🇳 Made in Senegal

Fièrement conçu pour vous – Made with ❤️ in Senegal 🇸🇳

---

**Dernière mise à jour** : Octobre 2025
**Version** : 1.0.0
