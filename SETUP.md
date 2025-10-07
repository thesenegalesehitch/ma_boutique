# Configuration du Site Boutique SN

## Identifiants Admin

Pour accéder au tableau de bord administrateur, utilisez ces identifiants :

**Email :** admin@boutique-sn.com
**Mot de passe :** BoutiqueSN2024!

### Accès à l'admin

1. Cliquez sur l'icône utilisateur en haut à droite de la navbar
2. Connectez-vous avec les identifiants ci-dessus
3. Vous aurez accès au tableau de bord complet

## Installation et Démarrage

### Prérequis
- Node.js version 18 ou supérieure
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la build de production
npm run preview
```

## Configuration de la Base de Données

Le projet utilise Supabase comme base de données. Les variables d'environnement sont déjà configurées dans le fichier `.env`.

### Structure de la base de données

Le schéma comprend :
- **products** : Produits de la boutique
- **orders** : Commandes des clients
- **site_content** : Contenu éditable du site
- **admin_users** : Utilisateurs administrateurs

Toutes les tables sont protégées par Row Level Security (RLS).

## Fonctionnalités Admin

### Gestion des Produits
- Ajouter de nouveaux produits avec image, prix, description, stock
- Modifier les produits existants
- Supprimer des produits
- Marquer des produits comme "en vedette"

### Gestion des Commandes
- Visualiser toutes les commandes
- Mettre à jour le statut (En attente, Confirmée, Complétée, Annulée)
- Voir les informations clients complètes

### Gestion du Contenu
- Modifier les textes de la page d'accueil
- Modifier les textes de la page À Propos
- Modifier les informations de contact

## Sécurité

### Important
- Changez le mot de passe admin après la première connexion en production
- Ne partagez jamais les identifiants admin publiquement
- Les variables d'environnement du fichier `.env` ne doivent jamais être commitées dans Git
- L'accès admin est protégé par authentification Supabase

### Variables d'Environnement

Le fichier `.env` contient :
```
VITE_SUPABASE_URL=https://mcuwqxacwgzfamovsyjs.supabase.co
VITE_SUPABASE_ANON_KEY=[clé anonyme]
```

Ces variables sont nécessaires pour que l'application fonctionne correctement.

## Pages du Site

### Pages Publiques
- **Accueil** (`/`) : Page d'accueil avec hero animé
- **À Propos** : Présentation de la boutique
- **Boutique** : Catalogue de produits avec recherche et tri
- **Contact** : Formulaire de contact et réseaux sociaux

### Page Admin
- Accessible via l'icône utilisateur dans la navbar
- Protégée par authentification
- Tableau de bord complet pour gérer le site

## Technologies Utilisées

- **React 18** : Framework JavaScript
- **TypeScript** : Typage statique
- **Vite** : Build tool rapide
- **Tailwind CSS** : Framework CSS utility-first
- **Supabase** : Backend as a Service (base de données + authentification)
- **Lucide React** : Icônes

## Support

Pour toute question ou problème :
- Email : boutique.sn@example.com
- Téléphone : +221 77 654 32 10

## Notes de Déploiement

### Pour déployer en production :

1. Assurez-vous que toutes les dépendances sont installées
2. Vérifiez que les variables d'environnement sont correctement configurées
3. Exécutez `npm run build`
4. Déployez le contenu du dossier `dist/` sur votre hébergeur

### Hébergeurs recommandés :
- Vercel (recommandé)
- Netlify
- Cloudflare Pages
- AWS Amplify

### Configuration des hébergeurs :

**Build Command :** `npm run build`
**Output Directory :** `dist`
**Install Command :** `npm install`

N'oubliez pas d'ajouter les variables d'environnement dans les paramètres de votre hébergeur.
