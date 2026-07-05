/**
 * Données enrichies pour les pages programmatiques par type de travaux.
 * Chaque entrée correspond à un TypeTravaux de baremes-mpr-2026.ts.
 */

import { type TypeTravaux, type CategorieRevenu, TRAVAUX } from './baremes-mpr-2026';

export interface TravauxPageData {
  /** Identifiant technique dans baremes-mpr-2026.ts */
  typeKey: TypeTravaux;
  /** Slug URL (sans slash) */
  slug: string;
  /** Libellé humain */
  label: string;
  /** Catégorie thématique */
  category: 'chauffage' | 'isolation' | 'ventilation' | 'autre';
  /** Description courte (2-3 phrases) */
  description: string;
  /** Paragraphe de contexte */
  contexte: string;
  /** Conseils pratiques */
  conseils: string[];
  /** Montants MPR par catégorie (issus du barème) */
  montantMPR: Record<CategorieRevenu, number | null>;
  /** Unité de mesure */
  unite: 'forfait' | 'par_m2' | 'par_fenetre';
  /** Plafond de dépenses éligibles TTC */
  plafondDepenses: number;
  /** Fourchette CEE */
  ceeBas: number;
  ceeHaut: number;
  /** Slugs de travaux liés (cross-link) */
  relatedSlugs: string[];
  /** FAQ spécifique (3 questions) */
  faq: { question: string; answer: string }[];
}

export const travauxData: TravauxPageData[] = [
  {
    typeKey: 'pac_air_eau',
    slug: 'pompe-chaleur-air-eau',
    label: 'Pompe à chaleur air/eau',
    category: 'chauffage',
    description:
      "La pompe à chaleur air/eau capte les calories de l'air extérieur pour chauffer votre logement et produire de l'eau chaude sanitaire. C'est la solution de chauffage renouvelable la plus installée en France, avec un COP moyen de 3 à 4.",
    contexte:
      "La pompe à chaleur air/eau (PAC air/eau) est devenue la solution de référence pour remplacer une chaudière gaz ou fioul vieillissante. Son principe est simple : un fluide frigorigène capte l'énergie thermique présente dans l'air extérieur, même par temps froid, et la restitue à un circuit d'eau chaude qui alimente vos radiateurs ou votre plancher chauffant. Avec un coefficient de performance (COP) de 3 à 4, la PAC air/eau produit 3 à 4 kWh de chaleur pour seulement 1 kWh d'électricité consommée, ce qui en fait un équipement très économique à l'usage. Le coût d'installation varie entre 10 000 et 18 000 € TTC selon la puissance, la marque et la complexité du chantier. En 2026, MaPrimeRénov' finance jusqu'à 5 000 € de cette installation pour les ménages aux revenus très modestes (catégorie Bleu), auxquels s'ajoutent les primes CEE pouvant atteindre 4 000 €. La PAC air/eau est compatible avec les radiateurs existants et ne nécessite aucun forage, ce qui simplifie considérablement l'installation par rapport à une PAC géothermique. Elle est particulièrement adaptée aux maisons individuelles situées en zone climatique tempérée (H1, H2). En zone H3 (littoral méditerranéen), ses performances sont encore meilleures grâce aux températures extérieures plus clémentes. L'entretien annuel, obligatoire depuis 2020 pour les PAC contenant plus de 2 kg de fluide frigorigène, coûte entre 150 et 250 € par an. La durée de vie moyenne d'une PAC air/eau est de 15 à 20 ans.",
    conseils: [
      "Faites réaliser une étude thermique pour dimensionner correctement la puissance de la PAC : un surdimensionnement entraîne des cycles courts et une usure prématurée.",
      "Privilégiez un modèle avec un COP certifié Eurovent ou NF PAC pour garantir les performances annoncées.",
      "Vérifiez que votre installation électrique est compatible (une PAC air/eau nécessite souvent un compteur en triphasé).",
      "Comparez au moins 3 devis d'installateurs RGE QualiPAC pour obtenir le meilleur rapport qualité-prix.",
      "Prévoyez l'emplacement de l'unité extérieure en respectant les distances réglementaires avec le voisinage pour limiter les nuisances sonores.",
    ],
    montantMPR: TRAVAUX.pac_air_eau.montantMPR,
    unite: TRAVAUX.pac_air_eau.unite,
    plafondDepenses: TRAVAUX.pac_air_eau.plafondDepenses,
    ceeBas: TRAVAUX.pac_air_eau.ceeBas,
    ceeHaut: TRAVAUX.pac_air_eau.ceeHaut,
    relatedSlugs: ['pompe-chaleur-geothermique', 'chauffe-eau-thermodynamique', 'vmc-double-flux'],
    faq: [
      {
        question: "Quel est le montant de MaPrimeRénov' pour une pompe à chaleur air/eau en 2026 ?",
        answer:
          "Le montant de MaPrimeRénov' pour une PAC air/eau varie selon votre catégorie de revenus : 5 000 € pour les ménages très modestes (Bleu), 4 000 € pour les modestes (Jaune) et 3 000 € pour les intermédiaires (Violet). Les ménages aux revenus supérieurs (Rose) ne sont pas éligibles à cette aide pour ce type de travaux.",
      },
      {
        question: 'Une pompe à chaleur air/eau fonctionne-t-elle par grand froid ?',
        answer:
          "Oui, les PAC air/eau modernes fonctionnent jusqu'à -15 °C voire -25 °C pour certains modèles. Cependant, leur rendement diminue quand la température extérieure baisse. En dessous de -7 °C, un appoint électrique intégré prend le relais. Dans les régions très froides, une PAC géothermique peut être plus adaptée.",
      },
      {
        question: "Peut-on cumuler les aides CEE avec MaPrimeRénov' pour une PAC air/eau ?",
        answer:
          "Oui, les primes CEE sont cumulables avec MaPrimeRénov'. Pour une PAC air/eau, les primes CEE varient de 2 500 à 4 000 € selon le fournisseur d'énergie choisi. Le cumul des aides est plafonné par le taux d'écrêtement : 90 % du coût TTC pour les ménages Bleu, 75 % pour les Jaune, 60 % pour les Violet.",
      },
    ],
  },
  {
    typeKey: 'pac_geothermique',
    slug: 'pompe-chaleur-geothermique',
    label: 'Pompe à chaleur géothermique',
    category: 'chauffage',
    description:
      "La pompe à chaleur géothermique puise l'énergie dans le sol ou une nappe phréatique pour chauffer votre logement. C'est la solution la plus performante avec un COP de 4 à 5, idéale pour les climats rigoureux.",
    contexte:
      "La pompe à chaleur géothermique (ou solarothermique) exploite la chaleur constante du sous-sol, dont la température reste stable entre 10 et 15 °C tout au long de l'année, quelle que soit la météo en surface. Cette stabilité thermique lui confère un rendement supérieur à celui d'une PAC air/eau, avec un COP annuel moyen de 4 à 5. Deux technologies existent : le captage horizontal, qui nécessite une surface de terrain 1,5 à 2 fois supérieure à la surface à chauffer, et le captage vertical (forage), qui permet de s'affranchir de la contrainte de surface mais implique un coût de forage de 50 à 100 € par mètre linéaire. Le coût total d'une installation géothermique varie entre 15 000 et 25 000 € TTC, forage compris. En 2026, MaPrimeRénov' accorde jusqu'à 11 000 € d'aide pour les ménages de catégorie Bleu, ce qui en fait le geste de chauffage le mieux subventionné. Les primes CEE complètent le financement avec 4 000 à 5 500 € supplémentaires. La PAC géothermique est particulièrement recommandée pour les maisons situées en zone climatique froide (H1) où les PAC air/eau perdent en efficacité lors des grands froids. Sa durée de vie est supérieure à 20 ans pour la pompe et jusqu'à 50 ans pour les sondes géothermiques. Le retour sur investissement est généralement atteint en 8 à 12 ans grâce aux économies d'énergie très importantes (division par 3 à 5 de la facture de chauffage).",
    conseils: [
      "Faites réaliser une étude de sol préalable pour déterminer le type de captage le plus adapté (horizontal ou vertical).",
      "Vérifiez les réglementations locales : un forage de plus de 10 m de profondeur nécessite une déclaration en mairie.",
      "Optez pour un installateur certifié RGE QualiPAC avec une expérience spécifique en géothermie.",
      "Prévoyez le budget de forage dans votre plan de financement : il représente souvent 30 à 40 % du coût total.",
      "Associez la PAC géothermique à un plancher chauffant basse température pour optimiser son rendement.",
    ],
    montantMPR: TRAVAUX.pac_geothermique.montantMPR,
    unite: TRAVAUX.pac_geothermique.unite,
    plafondDepenses: TRAVAUX.pac_geothermique.plafondDepenses,
    ceeBas: TRAVAUX.pac_geothermique.ceeBas,
    ceeHaut: TRAVAUX.pac_geothermique.ceeHaut,
    relatedSlugs: ['pompe-chaleur-air-eau', 'systeme-solaire-combine', 'isolation-murs-exterieur'],
    faq: [
      {
        question: "Combien coûte l'installation d'une pompe à chaleur géothermique ?",
        answer:
          "Le coût total d'une PAC géothermique varie entre 15 000 et 25 000 € TTC, forage compris. Avec MaPrimeRénov' (jusqu'à 11 000 €) et les primes CEE (4 000 à 5 500 €), le reste à charge peut descendre sous les 10 000 € pour les ménages modestes.",
      },
      {
        question: "Quelle est la différence entre captage horizontal et vertical ?",
        answer:
          "Le captage horizontal nécessite une grande surface de terrain (1,5 à 2 fois la surface à chauffer) avec des tubes enterrés à 60-120 cm de profondeur. Le captage vertical utilise un forage de 80 à 200 m et occupe très peu de place, mais il est plus coûteux (50 à 100 €/m de forage).",
      },
      {
        question: "La PAC géothermique est-elle plus rentable que la PAC air/eau ?",
        answer:
          "Sur le long terme, oui. Malgré un investissement initial plus élevé, la PAC géothermique offre un COP supérieur (4-5 contre 3-4) et des performances stables toute l'année. Les économies d'énergie sont 20 à 30 % supérieures, et la durée de vie est plus longue (20+ ans pour la pompe, 50 ans pour les sondes).",
      },
    ],
  },
  {
    typeKey: 'chauffe_eau_thermo',
    slug: 'chauffe-eau-thermodynamique',
    label: 'Chauffe-eau thermodynamique',
    category: 'chauffage',
    description:
      "Le chauffe-eau thermodynamique utilise une petite pompe à chaleur intégrée pour chauffer l'eau sanitaire. Il consomme 2 à 3 fois moins d'énergie qu'un ballon électrique classique.",
    contexte:
      "Le chauffe-eau thermodynamique (CET) est un ballon d'eau chaude équipé d'une mini pompe à chaleur qui capte les calories de l'air ambiant (ou de l'air extérieur via une gaine) pour chauffer l'eau sanitaire. Son COP de 2,5 à 3,5 signifie qu'il produit 2,5 à 3,5 kWh de chaleur pour 1 kWh d'électricité, contre 1 kWh pour 1 kWh avec un ballon électrique classique à effet Joule. La facture d'eau chaude est ainsi divisée par 2 à 3. Le coût d'achat et d'installation d'un CET varie entre 2 500 et 4 000 € TTC pour un modèle de 200 à 300 litres, adapté à un foyer de 2 à 5 personnes. En 2026, MaPrimeRénov' accorde jusqu'à 1 200 € d'aide pour les ménages de catégorie Bleu. Les primes CEE ajoutent 100 à 200 € supplémentaires. Le CET est idéal en remplacement d'un ballon électrique classique ou en complément d'une chaudière gaz qui assure uniquement le chauffage. Il s'installe dans un local non chauffé d'au moins 10 m³ (garage, buanderie, sous-sol) car il refroidit l'air ambiant lors de son fonctionnement. Les modèles sur air extrait permettent une installation dans un espace réduit en utilisant l'air vicié extrait par la VMC. La durée de vie moyenne d'un CET est de 15 à 20 ans avec un entretien minimal (vidange du ballon tous les 2 ans, vérification de l'anode).",
    conseils: [
      "Installez le CET dans un local non chauffé d'au moins 10 m³ (garage, cave) pour éviter de refroidir votre habitation.",
      "Choisissez un modèle avec un COP certifié supérieur à 2,5 et conforme à la norme NF Électricité Performance.",
      "Adaptez le volume du ballon à votre foyer : 200 L pour 2-3 personnes, 270 L pour 4-5 personnes.",
      "Programmez le fonctionnement en heures creuses pour réduire encore votre facture d'électricité.",
      "Vérifiez la compatibilité avec votre installation existante : raccordement électrique, évacuation des condensats.",
    ],
    montantMPR: TRAVAUX.chauffe_eau_thermo.montantMPR,
    unite: TRAVAUX.chauffe_eau_thermo.unite,
    plafondDepenses: TRAVAUX.chauffe_eau_thermo.plafondDepenses,
    ceeBas: TRAVAUX.chauffe_eau_thermo.ceeBas,
    ceeHaut: TRAVAUX.chauffe_eau_thermo.ceeHaut,
    relatedSlugs: ['chauffe-eau-solaire', 'pompe-chaleur-air-eau', 'vmc-double-flux'],
    faq: [
      {
        question: "Quelle aide pour un chauffe-eau thermodynamique en 2026 ?",
        answer:
          "MaPrimeRénov' accorde 1 200 € pour les ménages très modestes (Bleu), 800 € pour les modestes (Jaune) et 400 € pour les intermédiaires (Violet). Les primes CEE ajoutent 100 à 200 €. Les ménages Rose ne sont pas éligibles.",
      },
      {
        question: "Un chauffe-eau thermodynamique est-il bruyant ?",
        answer:
          "Le niveau sonore d'un CET est comparable à celui d'un réfrigérateur, soit environ 40 à 50 dB. C'est pourquoi il est recommandé de l'installer dans un local technique (garage, buanderie) plutôt que dans une pièce de vie.",
      },
      {
        question: "Quelle économie réalise-t-on avec un chauffe-eau thermodynamique ?",
        answer:
          "Un CET permet de diviser par 2 à 3 la facture d'eau chaude par rapport à un ballon électrique classique. Pour un foyer de 4 personnes consommant environ 500 € par an d'eau chaude, l'économie annuelle est de 250 à 350 €, soit un retour sur investissement en 5 à 8 ans après aides.",
      },
    ],
  },
  {
    typeKey: 'poele_granules',
    slug: 'poele-granules',
    label: 'Poêle à granulés',
    category: 'chauffage',
    description:
      "Le poêle à granulés (pellets) est un appareil de chauffage au bois automatisé offrant un rendement supérieur à 90 %. Il chauffe efficacement une ou plusieurs pièces avec un combustible économique et renouvelable.",
    contexte:
      "Le poêle à granulés de bois, aussi appelé poêle à pellets, est devenu l'un des équipements de chauffage les plus populaires en France grâce à son excellent rendement (supérieur à 90 %), son autonomie (jusqu'à 72 heures avec un réservoir plein) et le faible coût de son combustible. Les granulés de bois sont fabriqués à partir de sciure de bois compressée, un sous-produit de l'industrie forestière, et constituent une énergie renouvelable à bilan carbone quasi nul. Le prix des granulés se situe autour de 350 à 450 € la tonne en 2026, soit un coût de chauffage d'environ 6 à 8 centimes par kWh, contre 10 à 12 centimes pour le gaz et 18 à 22 centimes pour l'électricité. L'installation d'un poêle à granulés coûte entre 3 000 et 6 000 € TTC, pose et fumisterie comprises. En 2026, MaPrimeRénov' accorde jusqu'à 2 500 € d'aide pour les ménages Bleu, et les primes CEE ajoutent 250 à 800 €. Le poêle à granulés est particulièrement adapté comme chauffage principal dans les logements bien isolés de moins de 120 m², ou comme chauffage d'appoint pour réduire la consommation de la chaudière existante. Les modèles canalisables permettent de diffuser la chaleur dans les pièces adjacentes grâce à des gaines d'air chaud. L'entretien comprend un ramonage obligatoire deux fois par an et un nettoyage régulier du creuset (hebdomadaire).",
    conseils: [
      "Choisissez un poêle labellisé Flamme Verte 7 étoiles pour garantir un rendement élevé et des émissions de particules fines réduites.",
      "Dimensionnez la puissance selon la surface à chauffer : comptez environ 1 kW pour 10 m² dans un logement bien isolé.",
      "Prévoyez un espace de stockage sec pour vos granulés (1,5 à 2 tonnes par an pour un usage en chauffage principal).",
      "Faites vérifier votre conduit de cheminée par un fumiste certifié avant l'installation : un tubage inox est souvent nécessaire.",
      "Optez pour un modèle programmable avec thermostat pour optimiser votre consommation et votre confort.",
    ],
    montantMPR: TRAVAUX.poele_granules.montantMPR,
    unite: TRAVAUX.poele_granules.unite,
    plafondDepenses: TRAVAUX.poele_granules.plafondDepenses,
    ceeBas: TRAVAUX.poele_granules.ceeBas,
    ceeHaut: TRAVAUX.poele_granules.ceeHaut,
    relatedSlugs: ['insert-cheminee', 'chaudiere-bois', 'isolation-combles'],
    faq: [
      {
        question: "Quel est le montant des aides pour un poêle à granulés en 2026 ?",
        answer:
          "MaPrimeRénov' accorde 2 500 € pour les ménages très modestes (Bleu), 2 000 € pour les modestes (Jaune) et 1 500 € pour les intermédiaires (Violet). Les primes CEE ajoutent 250 à 800 € selon le fournisseur d'énergie. Les ménages Rose ne sont pas éligibles.",
      },
      {
        question: "Un poêle à granulés peut-il chauffer toute une maison ?",
        answer:
          "Oui, un poêle à granulés de 8 à 12 kW peut chauffer une maison bien isolée de 80 à 120 m². Les modèles canalisables permettent de diffuser la chaleur dans 2 à 3 pièces adjacentes. Pour les grandes surfaces, une chaudière à granulés avec un réseau de radiateurs est plus adaptée.",
      },
      {
        question: "Combien coûte le chauffage aux granulés par an ?",
        answer:
          "Pour une maison de 100 m² correctement isolée, la consommation annuelle est d'environ 1,5 à 2 tonnes de granulés, soit 500 à 800 € par an. C'est environ 30 à 50 % moins cher que le chauffage au gaz et 50 à 70 % moins cher que le chauffage électrique.",
      },
    ],
  },
  {
    typeKey: 'insert_cheminee',
    slug: 'insert-cheminee',
    label: 'Insert ou foyer fermé',
    category: 'chauffage',
    description:
      "L'insert de cheminée ou le foyer fermé remplace une cheminée ouverte par un système de combustion performant à bûches ou granulés. Le rendement passe de 10-15 % à plus de 75 %.",
    contexte:
      "L'insert de cheminée est un appareil de chauffage qui s'encastre dans le foyer d'une cheminée existante pour en multiplier le rendement par 5 à 8. Une cheminée ouverte traditionnelle n'offre qu'un rendement de 10 à 15 % (la majeure partie de la chaleur s'échappe par le conduit), tandis qu'un insert moderne atteint 75 à 85 % de rendement. Le foyer fermé, quant à lui, est un appareil neuf installé lors de la construction ou de la rénovation complète de la cheminée. Les deux équipements fonctionnent sur le même principe : la combustion du bois (bûches ou granulés) s'effectue dans une chambre fermée par une vitre vitrocéramique, et la chaleur est diffusée dans la pièce par convection naturelle ou par ventilation. Le coût d'un insert ou foyer fermé varie entre 2 000 et 5 000 € TTC, installation et fumisterie comprises. En 2026, MaPrimeRénov' accorde jusqu'à 2 500 € pour les ménages Bleu et les primes CEE ajoutent 250 à 800 €. L'insert est une excellente solution pour valoriser une cheminée existante tout en réduisant considérablement la consommation de bois et les émissions de particules fines. Il est éligible aux aides à condition de respecter les critères de performance (rendement ≥ 75 %, émissions de particules ≤ 40 mg/Nm³) et d'être installé par un professionnel RGE Qualibois.",
    conseils: [
      "Faites vérifier l'état de votre conduit de cheminée avant l'installation : un tubage inox est généralement requis.",
      "Choisissez un insert labellisé Flamme Verte 7 étoiles pour maximiser le rendement et limiter la pollution.",
      "Optez pour un modèle avec ventilation intégrée pour une meilleure diffusion de la chaleur dans la pièce.",
      "Prévoyez un espace de stockage couvert pour le bois de chauffage (environ 5 stères par an pour un usage régulier).",
      "Faites ramoner le conduit deux fois par an dont une fois pendant la période de chauffe (obligation légale).",
    ],
    montantMPR: TRAVAUX.insert_cheminee.montantMPR,
    unite: TRAVAUX.insert_cheminee.unite,
    plafondDepenses: TRAVAUX.insert_cheminee.plafondDepenses,
    ceeBas: TRAVAUX.insert_cheminee.ceeBas,
    ceeHaut: TRAVAUX.insert_cheminee.ceeHaut,
    relatedSlugs: ['poele-granules', 'chaudiere-bois', 'isolation-murs-interieur'],
    faq: [
      {
        question: "Quelle aide pour installer un insert de cheminée en 2026 ?",
        answer:
          "MaPrimeRénov' accorde 2 500 € pour les ménages Bleu, 1 500 € pour les Jaune et 1 000 € pour les Violet. Les primes CEE ajoutent 250 à 800 €. L'insert doit être installé par un professionnel RGE Qualibois et respecter un rendement minimum de 75 %.",
      },
      {
        question: "Insert ou poêle à granulés : lequel choisir ?",
        answer:
          "L'insert est idéal si vous possédez déjà une cheminée à foyer ouvert et souhaitez la conserver. Le poêle à granulés offre plus d'autonomie (jusqu'à 72 h) et un meilleur rendement (90 % contre 75-85 %), mais nécessite un espace dédié et un accès au courant électrique.",
      },
      {
        question: "Peut-on installer un insert dans n'importe quelle cheminée ?",
        answer:
          "Non, le conduit de cheminée doit être en bon état et conforme aux normes (DTU 24.1). Un tubage inox du conduit est presque toujours nécessaire. La taille du foyer doit être compatible avec les dimensions de l'insert. Un professionnel RGE évaluera la faisabilité lors de la visite technique.",
      },
    ],
  },
  {
    typeKey: 'chaudiere_bois',
    slug: 'chaudiere-bois',
    label: 'Chaudière bois',
    category: 'chauffage',
    description:
      "La chaudière bois à bûches ou à granulés est un système de chauffage central alimenté par une énergie renouvelable. Elle offre un rendement de 85 à 95 % et alimente l'ensemble des radiateurs du logement.",
    contexte:
      "La chaudière bois est la solution idéale pour les ménages souhaitant un chauffage central performant et économique à base d'énergie renouvelable. Deux technologies coexistent : la chaudière à bûches, plus économique à l'achat mais nécessitant un chargement manuel, et la chaudière à granulés, entièrement automatisée avec un silo de stockage alimentant la chaudière en continu. Le rendement des chaudières bois modernes atteint 85 à 95 %, contre 60 à 75 % pour les anciens modèles. Le coût d'une chaudière bois varie entre 8 000 et 20 000 € TTC selon la technologie (bûches ou granulés), la puissance et le volume du silo. C'est l'un des gestes les mieux subventionnés par MaPrimeRénov' avec jusqu'à 8 000 € d'aide pour les ménages Bleu. Les primes CEE ajoutent 800 à 1 800 €. Le bois énergie est le combustible le moins cher du marché avec un coût de 4 à 6 centimes par kWh pour les bûches et 6 à 8 centimes pour les granulés, contre 10 à 12 centimes pour le gaz naturel. La chaudière bois s'intègre facilement dans un réseau de radiateurs existant et peut assurer la production d'eau chaude sanitaire via un ballon tampon. Elle est particulièrement adaptée aux zones rurales disposant d'un accès facile au combustible bois et d'un espace de stockage suffisant (un silo à granulés occupe environ 3 à 6 m²).",
    conseils: [
      "Optez pour une chaudière à granulés automatique si vous recherchez le confort et l'autonomie ; une chaudière à bûches si vous avez accès à du bois local à bas coût.",
      "Prévoyez un espace de stockage adapté : 3 à 6 m² pour un silo à granulés, un bûcher abrité pour les bûches.",
      "Faites installer un ballon tampon (500 à 1 000 L) pour optimiser le fonctionnement et la durée de vie de la chaudière.",
      "Assurez-vous que votre conduit de cheminée est compatible et aux normes (DTU 24.1) ; un tubage est souvent nécessaire.",
      "Souscrivez un contrat d'entretien annuel incluant le ramonage (deux fois par an, dont une en période de chauffe).",
    ],
    montantMPR: TRAVAUX.chaudiere_bois.montantMPR,
    unite: TRAVAUX.chaudiere_bois.unite,
    plafondDepenses: TRAVAUX.chaudiere_bois.plafondDepenses,
    ceeBas: TRAVAUX.chaudiere_bois.ceeBas,
    ceeHaut: TRAVAUX.chaudiere_bois.ceeHaut,
    relatedSlugs: ['poele-granules', 'pompe-chaleur-air-eau', 'isolation-murs-exterieur'],
    faq: [
      {
        question: "Quel est le montant de MaPrimeRénov' pour une chaudière bois en 2026 ?",
        answer:
          "MaPrimeRénov' accorde 8 000 € pour les ménages Bleu, 6 500 € pour les Jaune et 3 000 € pour les Violet. Les primes CEE ajoutent 800 à 1 800 €. C'est l'un des gestes chauffage les plus aidés après la PAC géothermique et le système solaire combiné.",
      },
      {
        question: "Chaudière bûches ou granulés : laquelle choisir ?",
        answer:
          "La chaudière à granulés offre plus de confort (alimentation automatique, autonomie de plusieurs semaines) mais coûte plus cher (12 000-20 000 € contre 8 000-12 000 € pour les bûches). La chaudière à bûches est plus économique si vous avez accès à du bois local gratuit ou peu cher.",
      },
      {
        question: "Quelle est la durée de vie d'une chaudière bois ?",
        answer:
          "Une chaudière bois bien entretenue a une durée de vie de 20 à 25 ans. L'entretien annuel obligatoire comprend le nettoyage de l'échangeur, la vérification des joints et de la régulation, ainsi que le ramonage du conduit deux fois par an.",
      },
    ],
  },
  {
    typeKey: 'systeme_solaire_combine',
    slug: 'systeme-solaire-combine',
    label: 'Système solaire combiné',
    category: 'chauffage',
    description:
      "Le système solaire combiné (SSC) utilise des capteurs solaires thermiques pour assurer à la fois le chauffage et la production d'eau chaude sanitaire. Il couvre 40 à 60 % des besoins annuels.",
    contexte:
      "Le système solaire combiné (SSC) est une installation de chauffage et de production d'eau chaude sanitaire qui exploite l'énergie solaire thermique grâce à des capteurs vitrés installés en toiture ou au sol. Contrairement au chauffe-eau solaire qui ne produit que de l'eau chaude, le SSC alimente également le circuit de chauffage central (plancher chauffant basse température ou radiateurs). En moyenne, un SSC couvre 40 à 60 % des besoins annuels de chauffage et d'eau chaude, le complément étant assuré par un appoint (chaudière gaz, bois ou pompe à chaleur). La surface de capteurs nécessaire est de 10 à 20 m² selon la taille du logement et la zone climatique. Le coût d'installation d'un SSC varie entre 15 000 et 22 000 € TTC, incluant les capteurs, le ballon de stockage (500 à 1 000 L), la régulation et la pose. En 2026, MaPrimeRénov' accorde jusqu'à 10 000 € d'aide pour les ménages Bleu, ce qui en fait le deuxième geste le mieux subventionné après la PAC géothermique. Les primes CEE ajoutent 3 000 à 4 500 €. Le SSC est particulièrement rentable dans les régions bien ensoleillées (sud de la France, littoral) où il peut couvrir jusqu'à 70 % des besoins. Sa durée de vie est de 20 à 25 ans avec un entretien minimal.",
    conseils: [
      "Vérifiez l'ensoleillement de votre toiture : une orientation sud avec une inclinaison de 30 à 45° est idéale.",
      "Associez le SSC à un plancher chauffant basse température pour maximiser le rendement solaire.",
      "Prévoyez un ballon de stockage surdimensionné (800 à 1 000 L) pour stocker l'énergie solaire excédentaire.",
      "Choisissez des capteurs certifiés Solar Keymark ou CSTBat pour garantir les performances.",
      "Faites réaliser une étude de dimensionnement par un bureau d'études thermiques pour optimiser la surface de capteurs.",
    ],
    montantMPR: TRAVAUX.systeme_solaire_combine.montantMPR,
    unite: TRAVAUX.systeme_solaire_combine.unite,
    plafondDepenses: TRAVAUX.systeme_solaire_combine.plafondDepenses,
    ceeBas: TRAVAUX.systeme_solaire_combine.ceeBas,
    ceeHaut: TRAVAUX.systeme_solaire_combine.ceeHaut,
    relatedSlugs: ['chauffe-eau-solaire', 'pompe-chaleur-air-eau', 'isolation-combles'],
    faq: [
      {
        question: "Quelles sont les aides pour un système solaire combiné en 2026 ?",
        answer:
          "MaPrimeRénov' accorde 10 000 € pour les ménages Bleu, 8 000 € pour les Jaune et 4 000 € pour les Violet. Les primes CEE ajoutent 3 000 à 4 500 €. C'est l'un des gestes les mieux aidés. Les ménages Rose ne sont pas éligibles.",
      },
      {
        question: "Un système solaire combiné fonctionne-t-il en hiver ?",
        answer:
          "Oui, mais avec un rendement réduit. En hiver, les capteurs solaires produisent moins de chaleur en raison du faible ensoleillement et des journées courtes. Un appoint (chaudière, PAC) prend le relais automatiquement. En moyenne annuelle, le SSC couvre 40 à 60 % des besoins.",
      },
      {
        question: "Quelle surface de capteurs faut-il pour un système solaire combiné ?",
        answer:
          "Pour une maison de 100 m², comptez 10 à 15 m² de capteurs solaires en zone H1 (nord) et 8 à 12 m² en zone H3 (sud). La surface dépend aussi du niveau d'isolation du logement, de l'orientation de la toiture et du taux de couverture solaire souhaité.",
      },
    ],
  },
  {
    typeKey: 'chauffe_eau_solaire',
    slug: 'chauffe-eau-solaire',
    label: 'Chauffe-eau solaire individuel',
    category: 'chauffage',
    description:
      "Le chauffe-eau solaire individuel (CESI) utilise des capteurs solaires thermiques pour produire gratuitement 50 à 70 % de l'eau chaude sanitaire du foyer tout au long de l'année.",
    contexte:
      "Le chauffe-eau solaire individuel (CESI) est composé de capteurs solaires thermiques installés en toiture (2 à 5 m²) et d'un ballon de stockage (200 à 400 L) situé à l'intérieur du logement. L'eau glycolée chauffée par les capteurs transfère sa chaleur à l'eau sanitaire du ballon via un échangeur. Un appoint électrique ou hydraulique intégré au ballon assure le complément quand l'ensoleillement est insuffisant. En moyenne, un CESI couvre 50 à 70 % des besoins annuels en eau chaude sanitaire d'un foyer de 3 à 5 personnes. Le coût d'installation varie entre 4 000 et 7 000 € TTC. En 2026, MaPrimeRénov' accorde jusqu'à 4 000 € d'aide pour les ménages Bleu, et les primes CEE ajoutent 100 à 250 €. Le CESI est une solution particulièrement pertinente dans les régions bien ensoleillées (sud de la France), où il peut couvrir jusqu'à 80 % des besoins. Même dans le nord de la France, il reste rentable avec un taux de couverture de 40 à 50 %. La durée de vie des capteurs solaires est de 20 à 25 ans, et le coût d'entretien est très faible (vérification du fluide caloporteur tous les 3 à 5 ans). Le retour sur investissement est généralement atteint en 6 à 10 ans après déduction des aides.",
    conseils: [
      "Vérifiez que votre toiture est exposée plein sud (± 30°) avec une inclinaison de 30 à 60° et sans masques solaires importants.",
      "Choisissez un ballon solaire avec appoint électrique intégré pour garantir la disponibilité d'eau chaude toute l'année.",
      "Optez pour des capteurs certifiés Solar Keymark avec une surface adaptée à la taille du foyer (2 m² pour 2 personnes, 4 m² pour 4-5 personnes).",
      "Faites contrôler la pression du circuit et le niveau de glycol tous les 2-3 ans par un professionnel.",
      "Si vous hésitez avec un chauffe-eau thermodynamique, le CESI est plus adapté aux régions très ensoleillées.",
    ],
    montantMPR: TRAVAUX.chauffe_eau_solaire.montantMPR,
    unite: TRAVAUX.chauffe_eau_solaire.unite,
    plafondDepenses: TRAVAUX.chauffe_eau_solaire.plafondDepenses,
    ceeBas: TRAVAUX.chauffe_eau_solaire.ceeBas,
    ceeHaut: TRAVAUX.chauffe_eau_solaire.ceeHaut,
    relatedSlugs: ['chauffe-eau-thermodynamique', 'systeme-solaire-combine', 'pompe-chaleur-air-eau'],
    faq: [
      {
        question: "Combien d'eau chaude un chauffe-eau solaire produit-il ?",
        answer:
          "Un CESI avec 3 à 4 m² de capteurs et un ballon de 300 L couvre 50 à 70 % des besoins en eau chaude d'un foyer de 4 personnes, soit environ 200 litres d'eau chaude par jour en été et 80 à 100 litres en hiver.",
      },
      {
        question: "Le chauffe-eau solaire est-il rentable dans le nord de la France ?",
        answer:
          "Oui, même dans le nord de la France, un CESI couvre 40 à 50 % des besoins en eau chaude grâce au rayonnement diffus. Le retour sur investissement est de 8 à 12 ans (contre 5 à 8 ans dans le sud). Les aides MaPrimeRénov' et CEE améliorent la rentabilité.",
      },
      {
        question: "Quelles aides pour un chauffe-eau solaire en 2026 ?",
        answer:
          "MaPrimeRénov' accorde 4 000 € pour les ménages Bleu, 3 000 € pour les Jaune et 2 000 € pour les Violet. Les primes CEE ajoutent 100 à 250 €. Le plafond de dépenses éligibles est de 7 000 € TTC.",
      },
    ],
  },
  {
    typeKey: 'vmc_double_flux',
    slug: 'vmc-double-flux',
    label: 'VMC double flux',
    category: 'ventilation',
    description:
      "La VMC double flux renouvelle l'air intérieur tout en récupérant jusqu'à 90 % de la chaleur de l'air extrait. Elle réduit les pertes de chaleur liées à la ventilation de 70 à 80 %.",
    contexte:
      "La ventilation mécanique contrôlée (VMC) double flux est un système de ventilation performant qui extrait l'air vicié des pièces humides (cuisine, salle de bains, WC) et insuffle de l'air neuf préchauffé dans les pièces de vie (séjour, chambres). Son échangeur thermique récupère 80 à 95 % de la chaleur de l'air extrait pour réchauffer l'air entrant, ce qui réduit considérablement les déperditions thermiques liées au renouvellement d'air. Dans un logement bien isolé, les pertes par ventilation peuvent représenter 20 à 30 % des déperditions totales ; la VMC double flux réduit cette part à 5 à 10 %. Le coût d'installation d'une VMC double flux varie entre 4 000 et 8 000 € TTC, incluant le caisson d'extraction/insufflation, l'échangeur, le réseau de gaines et les bouches. En 2026, MaPrimeRénov' accorde jusqu'à 2 500 € d'aide pour les ménages Bleu, et les primes CEE ajoutent 200 à 500 €. La VMC double flux est le complément indispensable d'une rénovation de l'enveloppe thermique (isolation + fenêtres). Sans ventilation adaptée, un logement très étanche risque des problèmes d'humidité et de qualité d'air intérieur. Elle est particulièrement recommandée en climat froid (zones H1 et H2) où la différence de température entre intérieur et extérieur maximise les économies de chauffage. La consommation électrique d'une VMC double flux est de 30 à 50 W en moyenne, soit environ 30 à 50 € par an.",
    conseils: [
      "Installez la VMC double flux en même temps que l'isolation pour optimiser l'étanchéité à l'air du logement.",
      "Choisissez un modèle avec un échangeur à haut rendement (≥ 90 %) et une faible consommation électrique (certifié NF VMC).",
      "Prévoyez le passage des gaines lors de la conception : elles doivent être calorifugées et accessibles pour l'entretien.",
      "Nettoyez ou remplacez les filtres tous les 3 à 6 mois pour maintenir la qualité de l'air et le rendement de l'échangeur.",
      "Faites réaliser un test d'étanchéité à l'air après l'installation pour vérifier la performance globale du logement.",
    ],
    montantMPR: TRAVAUX.vmc_double_flux.montantMPR,
    unite: TRAVAUX.vmc_double_flux.unite,
    plafondDepenses: TRAVAUX.vmc_double_flux.plafondDepenses,
    ceeBas: TRAVAUX.vmc_double_flux.ceeBas,
    ceeHaut: TRAVAUX.vmc_double_flux.ceeHaut,
    relatedSlugs: ['isolation-murs-exterieur', 'isolation-combles', 'pompe-chaleur-air-eau'],
    faq: [
      {
        question: "Quel est le montant de MaPrimeRénov' pour une VMC double flux ?",
        answer:
          "MaPrimeRénov' accorde 2 500 € pour les ménages Bleu, 2 000 € pour les Jaune et 1 500 € pour les Violet. Les primes CEE ajoutent 200 à 500 €. Les ménages Rose ne sont pas éligibles à cette aide.",
      },
      {
        question: "VMC simple flux ou double flux : quelle différence ?",
        answer:
          "La VMC simple flux extrait l'air vicié sans récupérer la chaleur. La VMC double flux récupère 80 à 95 % de la chaleur de l'air extrait grâce à un échangeur thermique. L'économie de chauffage est de 15 à 25 % par rapport à une VMC simple flux hygroréglable.",
      },
      {
        question: "Une VMC double flux est-elle bruyante ?",
        answer:
          "Les modèles récents sont très silencieux (25 à 35 dB au niveau des bouches). Le caisson central doit être installé dans un local technique (combles, garage) avec des manchons anti-vibratoires sur les gaines pour éviter la transmission du bruit.",
      },
    ],
  },
  {
    typeKey: 'isolation_murs_ext',
    slug: 'isolation-murs-exterieur',
    label: 'Isolation des murs par l\'extérieur',
    category: 'isolation',
    description:
      "L'isolation thermique par l'extérieur (ITE) consiste à envelopper les façades d'un manteau isolant. Elle supprime les ponts thermiques et préserve l'inertie des murs, sans réduire la surface habitable.",
    contexte:
      "L'isolation thermique par l'extérieur (ITE) est considérée comme la technique d'isolation la plus performante pour les murs, car elle crée une enveloppe continue qui élimine la quasi-totalité des ponts thermiques (jonctions murs-planchers, murs-toiture, contours de fenêtres). Les murs représentent 20 à 25 % des déperditions thermiques d'un logement mal isolé. L'ITE consiste à fixer un isolant (polystyrène expansé, laine de roche, fibre de bois) sur la face extérieure des murs, puis à le recouvrir d'un enduit de finition ou d'un bardage ventilé. L'épaisseur d'isolant varie de 12 à 20 cm selon la performance visée (R ≥ 3,7 m².K/W pour être éligible aux aides). Le coût de l'ITE varie entre 120 et 200 €/m² TTC, soit 12 000 à 25 000 € pour une maison de 100 m² de murs à isoler. En 2026, MaPrimeRénov' accorde 75 €/m² pour les ménages Bleu, 60 €/m² pour les Jaune, 40 €/m² pour les Violet et 15 €/m² pour les Rose. Les primes CEE ajoutent 8 à 15 €/m². L'ITE offre plusieurs avantages par rapport à l'isolation par l'intérieur : pas de perte de surface habitable, maintien de l'inertie thermique des murs (confort d'été), ravalement de façade simultané, et pas de perturbation des occupants pendant les travaux. En revanche, elle est plus coûteuse et peut nécessiter une modification des débords de toiture, des appuis de fenêtres et des descentes de gouttières.",
    conseils: [
      "Profitez d'un ravalement de façade obligatoire pour réaliser l'ITE : les deux chantiers sont complémentaires et réduisent les coûts globaux.",
      "Choisissez un isolant adapté à votre climat : le polystyrène expansé (PSE) est le moins cher, la laine de roche offre une meilleure résistance au feu, la fibre de bois est la plus écologique.",
      "Vérifiez les règles d'urbanisme de votre commune : l'ITE modifie l'aspect extérieur et peut nécessiter une déclaration préalable de travaux.",
      "Traitez les ponts thermiques résiduels (tableaux et appuis de fenêtres) pour une isolation complète.",
      "Faites réaliser les travaux par une entreprise RGE certifiée Qualibat avec une assurance décennale couvrant l'ITE.",
    ],
    montantMPR: TRAVAUX.isolation_murs_ext.montantMPR,
    unite: TRAVAUX.isolation_murs_ext.unite,
    plafondDepenses: TRAVAUX.isolation_murs_ext.plafondDepenses,
    ceeBas: TRAVAUX.isolation_murs_ext.ceeBas,
    ceeHaut: TRAVAUX.isolation_murs_ext.ceeHaut,
    relatedSlugs: ['isolation-murs-interieur', 'isolation-combles', 'fenetres'],
    faq: [
      {
        question: "Combien coûte l'isolation des murs par l'extérieur au m² ?",
        answer:
          "Le coût de l'ITE varie entre 120 et 200 €/m² TTC, selon l'isolant choisi, la finition (enduit ou bardage) et la complexité du chantier. Avec MaPrimeRénov' (jusqu'à 75 €/m²) et les CEE (8-15 €/m²), le reste à charge peut descendre à 40-100 €/m² pour les ménages modestes.",
      },
      {
        question: "Faut-il une autorisation pour isoler par l'extérieur ?",
        answer:
          "Oui, l'ITE modifie l'aspect extérieur du bâtiment et nécessite une déclaration préalable de travaux en mairie. Dans certaines zones protégées (périmètre d'un monument historique, secteur sauvegardé), l'avis de l'Architecte des Bâtiments de France est requis.",
      },
      {
        question: "Quelle épaisseur d'isolant faut-il pour les murs extérieurs ?",
        answer:
          "Pour être éligible aux aides, l'isolant doit atteindre une résistance thermique R ≥ 3,7 m².K/W, soit environ 14 cm de polystyrène expansé, 12 cm de laine de roche ou 16 cm de fibre de bois. En rénovation performante, on vise R ≥ 5 m².K/W (18-20 cm).",
      },
    ],
  },
  {
    typeKey: 'isolation_murs_int',
    slug: 'isolation-murs-interieur',
    label: 'Isolation des murs par l\'intérieur',
    category: 'isolation',
    description:
      "L'isolation des murs par l'intérieur (ITI) améliore le confort thermique en posant un isolant contre la face intérieure des murs. C'est la technique la plus courante et la moins coûteuse.",
    contexte:
      "L'isolation thermique par l'intérieur (ITI) consiste à poser un matériau isolant sur la face intérieure des murs extérieurs, généralement sous forme de panneaux de doublage (isolant + plaque de plâtre) ou de laine minérale maintenue par une ossature métallique. C'est la technique d'isolation des murs la plus courante en France car elle est moins coûteuse que l'ITE, ne modifie pas l'aspect extérieur du bâtiment et peut être réalisée pièce par pièce. Le coût de l'ITI varie entre 50 et 90 €/m² TTC. En 2026, MaPrimeRénov' accorde 25 €/m² pour les ménages Bleu, 20 €/m² pour les Jaune, 15 €/m² pour les Violet et 7 €/m² pour les Rose. Les primes CEE ajoutent 8 à 15 €/m². L'ITI présente toutefois des inconvénients par rapport à l'ITE : réduction de la surface habitable (5 à 10 cm d'épaisseur par mur), persistance de certains ponts thermiques (jonctions murs-planchers), perte de l'inertie thermique des murs et nécessité de déplacer les prises électriques et les radiateurs. Elle reste néanmoins la solution privilégiée dans les cas où l'ITE est impossible (façade classée, mitoyenneté, copropriété refusant les travaux extérieurs) ou lorsque le budget est limité. La résistance thermique minimale pour être éligible aux aides est de R ≥ 3,7 m².K/W.",
    conseils: [
      "Traitez l'étanchéité à l'air avec soin : posez un pare-vapeur continu côté chaud pour éviter les problèmes de condensation.",
      "Privilégiez les panneaux de doublage collés pour limiter la perte de surface (solution la plus mince).",
      "Isolez les tableaux de fenêtres et les retours de doublage pour limiter les ponts thermiques résiduels.",
      "Profitez des travaux pour mettre aux normes l'installation électrique et repositionner les prises et interrupteurs.",
      "Dans les pièces humides (salle de bains), utilisez un isolant insensible à l'humidité (polystyrène, polyuréthane) avec un pare-vapeur adapté.",
    ],
    montantMPR: TRAVAUX.isolation_murs_int.montantMPR,
    unite: TRAVAUX.isolation_murs_int.unite,
    plafondDepenses: TRAVAUX.isolation_murs_int.plafondDepenses,
    ceeBas: TRAVAUX.isolation_murs_int.ceeBas,
    ceeHaut: TRAVAUX.isolation_murs_int.ceeHaut,
    relatedSlugs: ['isolation-murs-exterieur', 'isolation-combles', 'fenetres'],
    faq: [
      {
        question: "Quelle aide pour l'isolation des murs par l'intérieur en 2026 ?",
        answer:
          "MaPrimeRénov' accorde 25 €/m² pour les ménages Bleu, 20 €/m² pour les Jaune, 15 €/m² pour les Violet et 7 €/m² pour les Rose. Les primes CEE ajoutent 8 à 15 €/m². Le plafond de dépenses est de 70 €/m² TTC.",
      },
      {
        question: "Isolation par l'intérieur ou par l'extérieur : que choisir ?",
        answer:
          "L'ITE est plus performante (suppression des ponts thermiques, pas de perte de surface) mais plus coûteuse (120-200 €/m² contre 50-90 €/m²). L'ITI est préférable quand l'ITE est impossible (façade classée, copropriété) ou quand le budget est limité.",
      },
      {
        question: "Quelle épaisseur pour l'isolation des murs par l'intérieur ?",
        answer:
          "Pour atteindre R ≥ 3,7 m².K/W (minimum pour les aides), comptez 12 cm de laine de verre, 10 cm de polyuréthane ou 14 cm de laine de bois. La perte de surface est de 10 à 15 cm par mur isolé (isolant + parement).",
      },
    ],
  },
  {
    typeKey: 'isolation_combles',
    slug: 'isolation-combles',
    label: 'Isolation des combles et toiture',
    category: 'isolation',
    description:
      "L'isolation des rampants de toiture et des plafonds de combles est le geste d'isolation le plus rentable. La toiture est responsable de 25 à 30 % des déperditions thermiques d'une maison.",
    contexte:
      "La toiture est le premier poste de déperditions thermiques d'une maison : l'air chaud, plus léger, monte et s'échappe par le toit qui représente 25 à 30 % des pertes de chaleur. Isoler les combles est donc le geste le plus rentable en rénovation énergétique, avec un temps de retour sur investissement souvent inférieur à 5 ans. Deux techniques existent selon que les combles sont perdus ou aménagés. Pour les combles perdus, la méthode la plus efficace et économique est le soufflage de laine minérale (laine de verre ou laine de roche) ou de ouate de cellulose en vrac sur le plancher des combles. Le coût est de 20 à 40 €/m² TTC. Pour les combles aménagés ou les rampants de toiture, l'isolation se fait par l'intérieur (pose de panneaux ou rouleaux d'isolant entre et sous les chevrons) ou par l'extérieur (sarking). Le coût varie de 40 à 100 €/m² TTC selon la technique. En 2026, MaPrimeRénov' accorde 25 €/m² pour les ménages Bleu, 20 €/m² pour les Jaune, 15 €/m² pour les Violet et 7 €/m² pour les Rose. Les primes CEE ajoutent 6 à 12 €/m². La résistance thermique minimale pour être éligible aux aides est de R ≥ 6 m².K/W en combles perdus et R ≥ 6 m².K/W en rampants de toiture, soit 20 à 30 cm d'isolant selon le matériau choisi.",
    conseils: [
      "Pour les combles perdus, le soufflage de laine en vrac est la solution la plus économique et la plus rapide (chantier en une journée).",
      "Pour les rampants aménagés, posez deux couches croisées d'isolant pour atteindre R ≥ 6 et limiter les ponts thermiques entre chevrons.",
      "Vérifiez l'état de la charpente et de la couverture avant d'isoler : traitez les éventuels problèmes d'humidité ou d'insectes xylophages.",
      "Posez un pare-vapeur continu côté intérieur pour éviter la condensation dans l'isolant.",
      "Maintenez une ventilation de la sous-toiture (lame d'air entre l'isolant et la couverture) pour évacuer l'humidité.",
    ],
    montantMPR: TRAVAUX.isolation_combles.montantMPR,
    unite: TRAVAUX.isolation_combles.unite,
    plafondDepenses: TRAVAUX.isolation_combles.plafondDepenses,
    ceeBas: TRAVAUX.isolation_combles.ceeBas,
    ceeHaut: TRAVAUX.isolation_combles.ceeHaut,
    relatedSlugs: ['isolation-murs-exterieur', 'isolation-murs-interieur', 'vmc-double-flux'],
    faq: [
      {
        question: "Quel est le prix de l'isolation des combles au m² ?",
        answer:
          "Le coût varie selon la technique : 20 à 40 €/m² pour le soufflage en combles perdus, 40 à 80 €/m² pour l'isolation des rampants par l'intérieur, et 80 à 150 €/m² pour le sarking (isolation par l'extérieur de la toiture).",
      },
      {
        question: "Les aides couvrent-elles l'isolation des combles perdus et aménagés ?",
        answer:
          "Oui, MaPrimeRénov' s'applique aux deux : 25 €/m² (Bleu), 20 €/m² (Jaune), 15 €/m² (Violet) et 7 €/m² (Rose). La résistance thermique minimale est R ≥ 6 m².K/W dans les deux cas. Le plafond de dépenses est de 75 €/m² TTC.",
      },
      {
        question: "Combien de temps durent des travaux d'isolation des combles ?",
        answer:
          "Le soufflage en combles perdus se réalise en une demi-journée à une journée. L'isolation des rampants par l'intérieur prend 2 à 5 jours selon la surface. Le sarking (isolation par l'extérieur) nécessite 1 à 2 semaines car il implique la dépose temporaire de la couverture.",
      },
    ],
  },
  {
    typeKey: 'isolation_plancher',
    slug: 'isolation-plancher-bas',
    label: 'Isolation des planchers bas',
    category: 'isolation',
    description:
      "L'isolation des planchers bas traite les déperditions thermiques par le sol, qui représentent 7 à 10 % des pertes de chaleur. Elle améliore le confort en supprimant la sensation de sol froid.",
    contexte:
      "Les planchers bas (planchers sur vide sanitaire, sur cave ou sur terre-plein) sont responsables de 7 à 10 % des déperditions thermiques d'un logement. Bien que ce poste soit souvent négligé au profit des murs et de la toiture, son isolation améliore significativement le confort thermique en supprimant la sensation de sol froid, particulièrement désagréable en hiver. La technique la plus courante est l'isolation en sous-face du plancher, qui consiste à fixer des panneaux isolants rigides (polystyrène, polyuréthane) ou à projeter de la mousse polyuréthane sous le plancher, depuis le vide sanitaire ou la cave. Cette méthode est rapide, peu coûteuse et ne réduit pas la hauteur sous plafond. Le coût varie entre 30 et 60 €/m² TTC. Pour les planchers sur terre-plein, l'isolation se fait par-dessus (chape isolante) ou par-dessous lors d'un terrassement, ce qui est plus complexe et coûteux. En 2026, MaPrimeRénov' accorde 25 €/m² pour les ménages Bleu, 20 €/m² pour les Jaune, 15 €/m² pour les Violet et 7 €/m² pour les Rose. Les primes CEE ajoutent 5 à 10 €/m². La résistance thermique minimale pour être éligible aux aides est de R ≥ 3 m².K/W, soit environ 8 à 12 cm d'isolant selon le matériau.",
    conseils: [
      "Privilégiez l'isolation en sous-face du plancher depuis le vide sanitaire ou la cave : c'est la technique la plus simple et la moins perturbante.",
      "Vérifiez l'accessibilité du vide sanitaire : une hauteur d'au moins 40-50 cm est nécessaire pour la pose de panneaux.",
      "Pour les vides sanitaires peu accessibles, la projection de mousse polyuréthane est la solution la plus adaptée.",
      "Traitez les éventuels problèmes d'humidité du vide sanitaire avant d'isoler (drainage, ventilation).",
      "Complétez l'isolation du plancher par le traitement des ponts thermiques en pied de mur pour maximiser le gain.",
    ],
    montantMPR: TRAVAUX.isolation_plancher.montantMPR,
    unite: TRAVAUX.isolation_plancher.unite,
    plafondDepenses: TRAVAUX.isolation_plancher.plafondDepenses,
    ceeBas: TRAVAUX.isolation_plancher.ceeBas,
    ceeHaut: TRAVAUX.isolation_plancher.ceeHaut,
    relatedSlugs: ['isolation-murs-interieur', 'isolation-combles', 'isolation-murs-exterieur'],
    faq: [
      {
        question: "Combien coûte l'isolation des planchers bas ?",
        answer:
          "Le coût varie entre 30 et 60 €/m² TTC selon la technique (panneaux collés, mousse projetée) et l'accessibilité du vide sanitaire ou de la cave. Avec MaPrimeRénov' (jusqu'à 25 €/m²) et les CEE (5-10 €/m²), le reste à charge descend sous les 20 €/m² pour les ménages modestes.",
      },
      {
        question: "Peut-on isoler un plancher sur terre-plein ?",
        answer:
          "Oui, mais c'est plus complexe. L'isolation se fait par-dessus (pose d'une chape isolante, qui réduit la hauteur sous plafond de 5-10 cm) ou par-dessous lors de travaux de terrassement. La première solution est la plus courante en rénovation.",
      },
      {
        question: "Quelles aides pour l'isolation des planchers bas en 2026 ?",
        answer:
          "MaPrimeRénov' accorde 25 €/m² (Bleu), 20 €/m² (Jaune), 15 €/m² (Violet) et 7 €/m² (Rose). Les primes CEE ajoutent 5 à 10 €/m². La résistance thermique minimale est R ≥ 3 m².K/W. Le plafond de dépenses éligibles est de 60 €/m².",
      },
    ],
  },
  {
    typeKey: 'fenetres',
    slug: 'fenetres-double-vitrage',
    label: 'Fenêtres et portes-fenêtres',
    category: 'isolation',
    description:
      "Le remplacement des fenêtres en simple vitrage par du double ou triple vitrage réduit les déperditions thermiques de 40 à 50 % par les ouvrants. Il améliore aussi le confort acoustique.",
    contexte:
      "Les fenêtres et portes-fenêtres représentent 10 à 15 % des déperditions thermiques d'un logement mal isolé. Le remplacement du simple vitrage par du double ou triple vitrage est un geste d'amélioration du confort à la fois thermique et acoustique. Un double vitrage moderne (Ug ≤ 1,1 W/m².K) divise par 2 à 3 les pertes de chaleur par rapport à un simple vitrage (Ug ≈ 5,8 W/m².K). Le triple vitrage (Ug ≤ 0,7 W/m².K) offre des performances encore supérieures, mais les apports solaires sont réduits, ce qui le rend surtout intéressant pour les façades nord ou en climat très froid. Le coût de remplacement d'une fenêtre varie entre 500 et 1 200 € TTC par fenêtre (fourniture + pose), selon les dimensions, le matériau du châssis (PVC, aluminium, bois) et le type de vitrage. En 2026, MaPrimeRénov' accorde 100 € par fenêtre pour les ménages Bleu, 80 € pour les Jaune et 40 € pour les Violet. Les primes CEE ajoutent 30 à 80 € par fenêtre. L'aide ne concerne que le remplacement de fenêtres en simple vitrage et est plafonnée à 1 000 € par fenêtre. Pour être éligible, les nouvelles fenêtres doivent présenter un coefficient Uw ≤ 1,3 W/m².K et un facteur solaire Sw ≥ 0,3 (ou Uw ≤ 1,7 et Sw ≥ 0,36). La pose doit être réalisée par un professionnel RGE.",
    conseils: [
      "Remplacez d'abord les fenêtres les plus exposées au vent dominant et celles en mauvais état (condensation, infiltrations).",
      "Choisissez un châssis adapté : le PVC offre le meilleur rapport qualité-prix, l'aluminium est plus fin et design, le bois est le plus isolant et écologique.",
      "Optez pour un double vitrage à isolation renforcée (VIR) avec gaz argon pour un excellent rapport performance-prix.",
      "Vérifiez l'étanchéité des joints et la qualité de la pose : une fenêtre mal posée perd jusqu'à 50 % de ses performances.",
      "Profitez du remplacement des fenêtres pour installer des entrées d'air hygroréglables compatibles avec votre système de ventilation.",
    ],
    montantMPR: TRAVAUX.fenetres.montantMPR,
    unite: TRAVAUX.fenetres.unite,
    plafondDepenses: TRAVAUX.fenetres.plafondDepenses,
    ceeBas: TRAVAUX.fenetres.ceeBas,
    ceeHaut: TRAVAUX.fenetres.ceeHaut,
    relatedSlugs: ['isolation-murs-exterieur', 'isolation-murs-interieur', 'vmc-double-flux'],
    faq: [
      {
        question: "Quelle aide pour le remplacement des fenêtres en 2026 ?",
        answer:
          "MaPrimeRénov' accorde 100 € par fenêtre (Bleu), 80 € (Jaune) et 40 € (Violet). Les primes CEE ajoutent 30 à 80 € par fenêtre. L'aide ne concerne que le remplacement de simple vitrage et est plafonnée à 1 000 € par fenêtre. Les ménages Rose ne sont pas éligibles.",
      },
      {
        question: "Double ou triple vitrage : que choisir ?",
        answer:
          "Le double vitrage à isolation renforcée (VIR) offre le meilleur rapport qualité-prix dans la majorité des cas. Le triple vitrage est recommandé uniquement pour les façades nord en climat froid (zone H1) ou les maisons passives. Il réduit les apports solaires gratuits en hiver.",
      },
      {
        question: "Combien coûte le remplacement d'une fenêtre ?",
        answer:
          "Le coût varie entre 500 et 1 200 € TTC par fenêtre (fourniture + pose), selon le matériau (PVC : 500-700 €, alu : 700-1 000 €, bois : 800-1 200 €), les dimensions et le type de vitrage. Pour une maison avec 8 à 10 fenêtres, le budget total est de 5 000 à 12 000 €.",
      },
    ],
  },
  {
    typeKey: 'audit_energetique',
    slug: 'audit-energetique',
    label: 'Audit énergétique',
    category: 'autre',
    description:
      "L'audit énergétique est une étude approfondie de la performance thermique de votre logement. Il propose un plan de travaux chiffré et priorisé pour améliorer votre classement DPE.",
    contexte:
      "L'audit énergétique est une analyse complète de la performance énergétique d'un logement, réalisée par un professionnel certifié (bureau d'études thermiques ou architecte qualifié). Contrairement au DPE (Diagnostic de Performance Énergétique) qui donne une photographie simplifiée de la consommation, l'audit énergétique propose des scénarios de travaux chiffrés et ordonnés, avec une estimation des gains énergétiques et des économies attendues pour chaque option. L'audit comprend une visite du logement, une analyse des plans, un relevé des équipements (chauffage, ventilation, eau chaude), des mesures (thermographie infrarouge, test d'étanchéité à l'air le cas échéant) et une modélisation thermique. Le rapport final présente généralement deux scénarios : un parcours de travaux en plusieurs étapes (permettant d'étaler les dépenses) et une rénovation globale performante. Depuis 2024, l'audit énergétique est obligatoire pour la vente de logements classés F ou G (passoires thermiques). Il est également requis pour bénéficier de MaPrimeRénov' Parcours Accompagné (rénovation d'ampleur). Le coût d'un audit énergétique varie entre 500 et 1 200 € TTC selon la taille et la complexité du logement. En 2026, MaPrimeRénov' accorde 500 € pour les ménages Bleu, 400 € pour les Jaune et 300 € pour les Violet. L'audit n'est pas éligible aux primes CEE.",
    conseils: [
      "Réalisez l'audit avant de commencer les travaux : il vous permettra de définir les priorités et d'éviter les erreurs coûteuses.",
      "Choisissez un auditeur certifié RGE « études » ou « audit énergétique en maison individuelle » pour être éligible aux aides.",
      "Demandez un audit comprenant une thermographie infrarouge pour visualiser précisément les déperditions de chaleur.",
      "Conservez le rapport d'audit : il est nécessaire pour constituer votre dossier MaPrimeRénov' et obtenir l'éco-PTZ.",
      "Comparez les scénarios proposés en tenant compte du retour sur investissement et des aides disponibles pour chaque geste.",
    ],
    montantMPR: TRAVAUX.audit_energetique.montantMPR,
    unite: TRAVAUX.audit_energetique.unite,
    plafondDepenses: TRAVAUX.audit_energetique.plafondDepenses,
    ceeBas: TRAVAUX.audit_energetique.ceeBas,
    ceeHaut: TRAVAUX.audit_energetique.ceeHaut,
    relatedSlugs: ['pompe-chaleur-air-eau', 'isolation-murs-exterieur', 'isolation-combles'],
    faq: [
      {
        question: "L'audit énergétique est-il obligatoire ?",
        answer:
          "L'audit est obligatoire pour la vente de logements classés F ou G depuis avril 2023 (E à partir de 2025, D à partir de 2034). Il est aussi requis pour MaPrimeRénov' Parcours Accompagné. Pour les autres demandes MaPrimeRénov', il est recommandé mais pas obligatoire.",
      },
      {
        question: "Quelle différence entre un DPE et un audit énergétique ?",
        answer:
          "Le DPE (150-250 €) donne un classement A à G et des recommandations générales. L'audit énergétique (500-1 200 €) est une étude approfondie avec des scénarios de travaux chiffrés, des simulations thermiques et un plan d'action priorisé. L'audit est beaucoup plus complet et actionnable.",
      },
      {
        question: "Quelle aide pour un audit énergétique en 2026 ?",
        answer:
          "MaPrimeRénov' accorde 500 € (Bleu), 400 € (Jaune) et 300 € (Violet). Le plafond de dépenses est de 800 €. Les primes CEE ne s'appliquent pas à l'audit énergétique. Les ménages Rose ne sont pas éligibles à cette aide.",
      },
    ],
  },
  {
    typeKey: 'depose_cuve_fioul',
    slug: 'depose-cuve-fioul',
    label: 'Dépose de cuve à fioul',
    category: 'autre',
    description:
      "La dépose de cuve à fioul est une opération obligatoire lors de l'abandon du chauffage au fioul. Elle comprend le vidage, le dégazage, le nettoyage et le retrait ou neutralisation de la cuve.",
    contexte:
      "La dépose de cuve à fioul est le complément indispensable du remplacement d'une chaudière fioul par un système de chauffage décarboné (pompe à chaleur, chaudière bois, système solaire). Depuis l'interdiction d'installer de nouvelles chaudières fioul au 1er juillet 2022, la transition vers des énergies renouvelables est en marche et la question de la cuve à fioul se pose pour des centaines de milliers de foyers français. La dépose comprend plusieurs étapes réglementées : le pompage du fioul résiduel (rachat possible par le fournisseur), le dégazage de la cuve pour éliminer les vapeurs inflammables, le nettoyage intérieur, puis le retrait physique de la cuve ou sa neutralisation sur place (remplissage avec du sable ou de la mousse polyuréthane). Le choix entre retrait et neutralisation dépend de l'emplacement de la cuve (enterrée ou aérienne), de l'accessibilité et du projet d'aménagement futur. Le coût de la dépose varie entre 1 500 et 4 000 € TTC selon la taille de la cuve (de 1 000 à 5 000 litres) et sa situation (enterrée ou non). En 2026, MaPrimeRénov' accorde 1 200 € pour les ménages Bleu, 800 € pour les Jaune et 400 € pour les Violet. L'opération doit être réalisée par un professionnel agréé, et un certificat de dégazage est obligatoire. Les primes CEE ne s'appliquent pas à ce type de travaux.",
    conseils: [
      "Faites déposer la cuve en même temps que l'installation du nouveau système de chauffage pour réduire les coûts de main-d'œuvre.",
      "Exigez un certificat de dégazage délivré par un professionnel agréé ADR (transport de matières dangereuses).",
      "Pour une cuve enterrée, la neutralisation sur place (remplissage inerte) est souvent moins coûteuse que l'extraction.",
      "Faites racheter le fioul résiduel par votre fournisseur habituel : il est obligé de le reprendre.",
      "Conservez tous les documents (certificat de dégazage, attestation de neutralisation) : ils seront nécessaires en cas de vente du bien.",
    ],
    montantMPR: TRAVAUX.depose_cuve_fioul.montantMPR,
    unite: TRAVAUX.depose_cuve_fioul.unite,
    plafondDepenses: TRAVAUX.depose_cuve_fioul.plafondDepenses,
    ceeBas: TRAVAUX.depose_cuve_fioul.ceeBas,
    ceeHaut: TRAVAUX.depose_cuve_fioul.ceeHaut,
    relatedSlugs: ['pompe-chaleur-air-eau', 'chaudiere-bois', 'pompe-chaleur-geothermique'],
    faq: [
      {
        question: "Combien coûte la dépose d'une cuve à fioul ?",
        answer:
          "Le coût varie entre 1 500 et 4 000 € TTC selon la taille de la cuve, son emplacement (enterrée ou aérienne) et la technique choisie (retrait ou neutralisation). Avec MaPrimeRénov' (jusqu'à 1 200 €), le reste à charge descend à 500-2 500 €.",
      },
      {
        question: "La dépose de cuve à fioul est-elle obligatoire ?",
        answer:
          "La dépose n'est pas obligatoire tant que la cuve est entretenue et aux normes. Cependant, une cuve inutilisée doit être neutralisée (vidée, dégazée, nettoyée) pour des raisons de sécurité et de pollution. En cas de vente du bien, l'état de la cuve est vérifié dans les diagnostics.",
      },
      {
        question: "Quelles aides pour la dépose de cuve à fioul en 2026 ?",
        answer:
          "MaPrimeRénov' accorde 1 200 € (Bleu), 800 € (Jaune) et 400 € (Violet). Les primes CEE ne s'appliquent pas. La dépose doit être couplée avec l'installation d'un nouveau système de chauffage décarboné pour être éligible aux aides.",
      },
    ],
  },
];

/** Retrouver une entrée par son slug */
export function getTravauxBySlug(slug: string): TravauxPageData | undefined {
  return travauxData.find((t) => t.slug === slug);
}

/** Retrouver les entrées liées */
export function getRelatedTravaux(slugs: string[]): TravauxPageData[] {
  return slugs.map((s) => travauxData.find((t) => t.slug === s)).filter(Boolean) as TravauxPageData[];
}
