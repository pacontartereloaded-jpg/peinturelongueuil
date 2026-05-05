# peinturelongueuil.com

Site web statique pour une entreprise de peinture résidentielle et commerciale à Longueuil (Rive-Sud de Montréal).

## Stack

- HTML + CSS + Vanilla JS (sans bundler, sans framework)
- Polices : Cormorant Garamond + Inter (Google Fonts)
- Formulaire de contact : [Web3Forms](https://web3forms.com)

## Structure

```
/                       → accueil (FR)
/en/                    → version anglaise
/es/                    → version espagnole
/pr/                    → version portugaise
/services/              → 4 pages services
/secteurs/              → 3 pages secteurs locaux
/css/styles.css         → styles
/js/main.js             → interactions + handler form
/sitemap.xml, /robots.txt
```

## Déploiement

Hébergé sur [Vercel](https://vercel.com) via intégration GitHub. Chaque push sur `main` déclenche un déploiement automatique.

## Domaine

Production : [peinturelongueuil.com](https://peinturelongueuil.com)
