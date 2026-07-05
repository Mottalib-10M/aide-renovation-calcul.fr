# Validation — aide-renovation-calcul.fr

## Cas de test vérifiés contre les barèmes officiels

### Cas 1 : PAC air/eau, ménage très modeste, hors IDF

- **Entrée** : RFR 15 000 €, 2 personnes, hors IDF, PAC air/eau 15 000 € TTC
- **Catégorie attendue** : Bleu (plafond hors IDF 2 pers = 24 875 €)
- **MaPrimeRénov' attendu** : 5 000 € (forfait PAC air/eau catégorie Bleu)
- **CEE attendue** : 2 500 – 4 000 € (fourchette marché)
- **Source** : ANAH, barèmes MaPrimeRénov' 2026, fiche « pompe à chaleur air/eau »

### Cas 2 : Isolation murs ITE, ménage modeste, IDF

- **Entrée** : RFR 30 000 €, 3 personnes, IDF, isolation 100 m² à 15 000 € TTC
- **Catégorie attendue** : Jaune (plafond IDF 3 pers bleu = 41 493 €, jaune = 50 513 €)
- **MaPrimeRénov' attendu** : 60 €/m² × 100 = 6 000 €
- **CEE attendue** : 800 – 1 500 € (8–15 €/m² × 100)
- **Source** : ANAH, barèmes MaPrimeRénov' 2026, fiche « isolation des murs par l'extérieur »

### Cas 3 : Multi-gestes, ménage intermédiaire, hors IDF

- **Entrée** : RFR 40 000 €, 2 personnes, hors IDF (catégorie Violet)
  - PAC air/eau : 14 000 € TTC
  - Isolation combles 60 m² : 4 500 € TTC
- **Catégorie attendue** : Violet (plafond hors IDF 2 pers violet = 44 907 €)
- **MaPrimeRénov' attendu** : 3 000 € (PAC) + 900 € (15 €/m² × 60) = 3 900 €
- **CEE attendue** : 2 500 + 360 = 2 860 € (bas) ; 4 000 + 720 = 4 720 € (haut)
- **Éco-PTZ** : 25 000 € (2 gestes)
- **Écrêtement** : 60 % × 18 500 = 11 100 € ; aides max haut = 3 900 + 4 720 = 8 620 € → pas d'écrêtement
- **Source** : ANAH, barèmes MaPrimeRénov' 2026

## Build status

- **Build:** 35 pages, 0 errors
- **Tests:** 27/27 passed
- **Sitemap:** auto-generated (sitemap-index.xml)

## Page inventory (35 pages)

| Category | Count | Details |
|---|---|---|
| Home + legal | 3 | index, mentions-legales, confidentialite |
| Tool pages | 4 | index (simulateur), guide-maprimerenov, guide-isolation, faq |
| Guides index | 1 | /guides/ |
| Guide articles | 8 | prime-cee-explication, eco-ptz-2026, pompe-a-chaleur-aides, renovation-globale-dpe, artisan-rge-qualification, tva-reduite-renovation, cumul-aides-renovation, audit-energetique-obligatoire |
| Work-type pages | 16 | aide-pompe-chaleur-air-eau through aide-depose-cuve-fioul |
| Category pages | 4 | aides-renovation-tres-modeste, modeste, intermediaire, aises |

## Components

- RenovationCalculator.tsx (multi-work-type calculator)

## Data files

- baremes-mpr-2026.ts — 16 work types, 4 revenue categories, MPR/CEE/PTZ rates
- travaux-data.ts — 16 work-type entries with FAQ, context, and related links
- categories-data.ts — 4 revenue categories with income thresholds and FAQ

## Quality gates

- [x] Build passes (35 pages, 0 errors)
- [x] Tests pass (27/27)
- [x] Sitemap generated
- [x] Schema.org on every page (WebApplication, FAQPage, BreadcrumbList)
- [x] Analytics: Plausible + GA4 placeholder
- [x] robots.txt present
- [x] llms.txt present
- [x] All guide pages > 1500 words
- [x] Disclaimer in footer
- [x] Mobile-responsive navigation (hamburger menu)
- [x] Internal cross-linking between tools and guides

## Barèmes sources

- [MaPrimeRénov' - ANAH](https://www.anah.gouv.fr/les-aides/maprimerenov)
- [Éco-PTZ - service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F19905)
- [Primes CEE - ministère de la Transition écologique](https://www.ecologie.gouv.fr/certificats-deconomies-denergie)
