/**
 * Données enrichies pour les pages programmatiques par catégorie de revenus.
 * Sources : ANAH, barèmes MaPrimeRénov' 2026.
 */

import {
  type CategorieRevenu,
  PLAFONDS_IDF,
  PLAFONDS_HORS_IDF,
  TAUX_ECRETEMENT,
  PLAFOND_CUMUL_5ANS,
} from './baremes-mpr-2026';

export interface CategoriePageData {
  /** Identifiant technique */
  categorieKey: CategorieRevenu;
  /** Slug URL (sans slash) */
  slug: string;
  /** Libellé court */
  label: string;
  /** Couleur associée */
  couleur: string;
  /** Nom de la couleur MaPrimeRénov' */
  couleurNom: string;
  /** Description courte */
  description: string;
  /** Contenu de contexte long */
  contexte: string;
  /** Plafonds RFR IDF (1 à 5 personnes) */
  plafondsIdf: number[];
  /** Par personne supplémentaire IDF */
  parPersonneSuppIdf: number;
  /** Plafonds RFR hors IDF (1 à 5 personnes) */
  plafondsHorsIdf: number[];
  /** Par personne supplémentaire hors IDF */
  parPersonneSuppHorsIdf: number;
  /** Taux d'écrêtement */
  tauxEcretement: number;
  /** Plafond de cumul 5 ans */
  plafondCumul: number;
  /** FAQ spécifique (3 questions) */
  faq: { question: string; answer: string }[];
}

export const categoriesData: CategoriePageData[] = [
  {
    categorieKey: 'bleu',
    slug: 'tres-modeste',
    label: 'Ménages très modestes',
    couleur: '#3b82f6',
    couleurNom: 'Bleu',
    description:
      'La catégorie Bleu correspond aux ménages aux revenus très modestes. Elle donne accès aux montants MaPrimeRénov\' les plus élevés et à un taux d\'écrêtement de 90 %, soit un reste à charge minimum de seulement 10 %.',
    contexte:
      "Les ménages classés en catégorie Bleu par MaPrimeRénov' sont ceux dont le revenu fiscal de référence (RFR) est le plus bas. Ils bénéficient des aides les plus généreuses, car l'objectif du dispositif est de rendre la rénovation énergétique accessible à tous, y compris aux foyers les plus modestes. En 2026, les plafonds de revenus pour la catégorie Bleu sont de 23 541 € pour une personne seule en Île-de-France et de 17 009 € hors Île-de-France. Ces plafonds augmentent avec la taille du foyer : 34 551 € pour deux personnes en IDF (24 875 € hors IDF), jusqu'à 55 427 € pour cinq personnes en IDF (40 002 € hors IDF). Au-delà de cinq personnes, un montant de 7 613 € (IDF) ou 5 045 € (hors IDF) s'ajoute par personne supplémentaire.\n\nLes ménages Bleu peuvent cumuler MaPrimeRénov' et les primes CEE jusqu'à 90 % du coût total TTC des travaux, ce qui signifie que le reste à charge minimum est de seulement 10 %. Par exemple, pour un chantier d'installation d'une pompe à chaleur air/eau à 15 000 € TTC, le cumul des aides peut atteindre 13 500 € (90 % de 15 000 €), laissant un reste à charge de seulement 1 500 €. Cette catégorie est éligible à l'ensemble des 16 gestes de travaux pris en charge par MaPrimeRénov', sans exception.\n\nLe plafond de cumul MaPrimeRénov' sur 5 ans est de 40 000 €, ce qui permet de financer plusieurs gestes de rénovation successifs. L'éco-PTZ est également accessible sans conditions de ressources, avec un montant maximum de 30 000 € (ou 50 000 € pour une rénovation globale) remboursable sur 20 ans à taux zéro. La TVA réduite à 5,5 % s'applique automatiquement à tous les travaux éligibles.\n\nPour les ménages Bleu, la rénovation globale du logement est particulièrement intéressante car elle permet de bénéficier de MaPrimeRénov' Parcours Accompagné, avec des bonifications pouvant atteindre 80 % du coût des travaux HT (dans la limite de plafonds). Un accompagnateur Mon Accompagnateur Rénov' agréé est obligatoire pour ce parcours, mais son coût est pris en charge à 100 % pour les ménages très modestes.",
    plafondsIdf: PLAFONDS_IDF.bleu.plafonds,
    parPersonneSuppIdf: PLAFONDS_IDF.bleu.parPersonneSupp,
    plafondsHorsIdf: PLAFONDS_HORS_IDF.bleu.plafonds,
    parPersonneSuppHorsIdf: PLAFONDS_HORS_IDF.bleu.parPersonneSupp,
    tauxEcretement: TAUX_ECRETEMENT.bleu,
    plafondCumul: PLAFOND_CUMUL_5ANS.bleu,
    faq: [
      {
        question: 'Comment savoir si je suis en catégorie Bleu MaPrimeRénov\' ?',
        answer:
          "Vous êtes en catégorie Bleu si votre revenu fiscal de référence (RFR) est inférieur aux plafonds fixés par l'ANAH. Pour une personne seule, le plafond est de 17 009 € hors Île-de-France et 23 541 € en Île-de-France. Votre RFR figure sur la première page de votre avis d'imposition, dans le cadre « Vos références ».",
      },
      {
        question: 'Quelles sont les aides maximales pour les ménages très modestes ?',
        answer:
          "Les ménages Bleu bénéficient des montants MaPrimeRénov' les plus élevés : jusqu'à 11 000 € pour une PAC géothermique, 10 000 € pour un système solaire combiné, 8 000 € pour une chaudière bois, 5 000 € pour une PAC air/eau. Le cumul des aides (MPR + CEE) peut atteindre 90 % du coût TTC des travaux.",
      },
      {
        question: 'Le reste à charge peut-il être de 0 € pour les ménages très modestes ?',
        answer:
          "Non, le taux d'écrêtement de 90 % impose un reste à charge minimum de 10 % du coût TTC. Cependant, l'éco-PTZ (prêt à taux zéro) peut financer ce reste à charge, ce qui revient à ne débourser aucune somme immédiatement. Les mensualités de remboursement sont d'environ 60 à 125 € sur 20 ans.",
      },
    ],
  },
  {
    categorieKey: 'jaune',
    slug: 'modeste',
    label: 'Ménages modestes',
    couleur: '#eab308',
    couleurNom: 'Jaune',
    description:
      'La catégorie Jaune correspond aux ménages aux revenus modestes. Elle donne accès à des montants MaPrimeRénov\' intermédiaires-hauts et à un taux d\'écrêtement de 75 %, soit un reste à charge minimum de 25 %.',
    contexte:
      "Les ménages classés en catégorie Jaune sont ceux dont le revenu fiscal de référence dépasse les plafonds de la catégorie Bleu mais reste inférieur aux plafonds de la catégorie Violet. Il s'agit de foyers aux revenus modestes qui bénéficient d'aides substantielles, bien que légèrement inférieures à celles de la catégorie Bleu. En 2026, les plafonds de revenus pour la catégorie Jaune sont de 28 657 € pour une personne seule en Île-de-France et de 21 805 € hors Île-de-France. Pour un foyer de quatre personnes, ces plafonds atteignent 58 981 € en IDF et 44 802 € hors IDF.\n\nLe taux d'écrêtement de la catégorie Jaune est de 75 %, ce qui signifie que le cumul MaPrimeRénov' + primes CEE ne peut pas dépasser 75 % du coût total TTC des travaux. Le reste à charge minimum est donc de 25 %. Pour un chantier de 15 000 € TTC, le maximum d'aides cumulées est de 11 250 €, laissant un reste à charge d'au moins 3 750 €. L'éco-PTZ peut financer tout ou partie de ce reste à charge.\n\nLes ménages Jaune sont éligibles à tous les gestes de travaux MaPrimeRénov', y compris le remplacement du système de chauffage (PAC, chaudière bois, poêle, systèmes solaires), l'isolation (murs, toiture, plancher, fenêtres), la ventilation (VMC double flux) et les travaux annexes (audit énergétique, dépose de cuve à fioul). Les montants sont en moyenne 15 à 25 % inférieurs à ceux de la catégorie Bleu.\n\nPour les ménages Jaune, MaPrimeRénov' Parcours Accompagné est également très avantageux, avec une prise en charge pouvant atteindre 60 % du coût HT des travaux de rénovation globale (sous plafonds). L'accompagnement par Mon Accompagnateur Rénov' est pris en charge à 80 % pour les ménages modestes. Le plafond de cumul sur 5 ans reste de 40 000 €.",
    plafondsIdf: PLAFONDS_IDF.jaune.plafonds,
    parPersonneSuppIdf: PLAFONDS_IDF.jaune.parPersonneSupp,
    plafondsHorsIdf: PLAFONDS_HORS_IDF.jaune.plafonds,
    parPersonneSuppHorsIdf: PLAFONDS_HORS_IDF.jaune.parPersonneSupp,
    tauxEcretement: TAUX_ECRETEMENT.jaune,
    plafondCumul: PLAFOND_CUMUL_5ANS.jaune,
    faq: [
      {
        question: 'Quels sont les plafonds de revenus pour la catégorie Jaune ?',
        answer:
          "Pour une personne seule, le RFR doit être compris entre 17 009 et 21 805 € hors IDF (entre 23 541 et 28 657 € en IDF). Pour un foyer de 4 personnes, entre 34 948 et 44 802 € hors IDF (entre 48 447 et 58 981 € en IDF). Les plafonds augmentent de 6 462 € (hors IDF) ou 9 272 € (IDF) par personne supplémentaire au-delà de 5.",
      },
      {
        question: 'Quelles aides pour les ménages modestes en 2026 ?',
        answer:
          "Les ménages Jaune bénéficient de MaPrimeRénov' avec des montants élevés : 9 000 € pour une PAC géothermique, 8 000 € pour un SSC, 6 500 € pour une chaudière bois, 4 000 € pour une PAC air/eau. Le cumul avec les CEE est plafonné à 75 % du coût TTC (reste à charge minimum de 25 %).",
      },
      {
        question: "L'éco-PTZ est-il accessible aux ménages modestes ?",
        answer:
          "Oui, l'éco-PTZ est accessible sans conditions de ressources, donc tous les ménages Jaune y ont droit. Le montant maximum est de 15 000 € pour un geste, 25 000 € pour deux gestes et 30 000 € pour trois gestes ou plus, remboursable sur 20 ans à 0 % d'intérêt.",
      },
    ],
  },
  {
    categorieKey: 'violet',
    slug: 'intermediaire',
    label: 'Ménages aux revenus intermédiaires',
    couleur: '#8b5cf6',
    couleurNom: 'Violet',
    description:
      'La catégorie Violet correspond aux ménages aux revenus intermédiaires. Elle donne accès à des montants MaPrimeRénov\' modérés et à un taux d\'écrêtement de 60 %, soit un reste à charge minimum de 40 %.',
    contexte:
      "Les ménages classés en catégorie Violet sont ceux dont le revenu fiscal de référence se situe au-dessus des plafonds Jaune et en dessous des plafonds Violet. Il s'agit de la classe moyenne, qui bénéficie d'aides réduites par rapport aux deux catégories précédentes, mais reste éligible à la quasi-totalité des gestes MaPrimeRénov'. En 2026, les plafonds de la catégorie Violet sont de 40 018 € pour une personne seule en IDF et 30 549 € hors IDF. Pour un foyer de quatre personnes, ces plafonds atteignent 82 839 € en IDF et 63 303 € hors IDF.\n\nLe taux d'écrêtement de la catégorie Violet est de 60 %, ce qui signifie que le cumul MaPrimeRénov' + CEE est plafonné à 60 % du coût TTC des travaux. Le reste à charge minimum est de 40 %. Pour un chantier de 15 000 €, les aides ne peuvent pas dépasser 9 000 €, laissant un reste à charge d'au moins 6 000 €.\n\nLes ménages Violet sont éligibles à tous les gestes de chauffage, d'isolation, de ventilation et d'audit. Cependant, les montants sont sensiblement inférieurs à ceux des catégories Bleu et Jaune. Par exemple, une PAC air/eau donne droit à 3 000 € de MaPrimeRénov' (contre 5 000 € en Bleu), et une chaudière bois à 3 000 € (contre 8 000 € en Bleu). L'isolation des murs par l'extérieur est aidée à hauteur de 40 €/m² (contre 75 €/m² en Bleu).\n\nPour cette catégorie, la stratégie de cumul des aides est particulièrement importante : en combinant MaPrimeRénov', les primes CEE, l'éco-PTZ et la TVA à 5,5 %, il est possible de réduire significativement le coût global de la rénovation. MaPrimeRénov' Parcours Accompagné permet une prise en charge de 40 % du coût HT pour les ménages intermédiaires. Le plafond de cumul sur 5 ans reste de 40 000 €.",
    plafondsIdf: PLAFONDS_IDF.violet.plafonds,
    parPersonneSuppIdf: PLAFONDS_IDF.violet.parPersonneSupp,
    plafondsHorsIdf: PLAFONDS_HORS_IDF.violet.plafonds,
    parPersonneSuppHorsIdf: PLAFONDS_HORS_IDF.violet.parPersonneSupp,
    tauxEcretement: TAUX_ECRETEMENT.violet,
    plafondCumul: PLAFOND_CUMUL_5ANS.violet,
    faq: [
      {
        question: 'Les ménages aux revenus intermédiaires ont-ils droit à MaPrimeRénov\' ?',
        answer:
          "Oui, les ménages Violet sont éligibles à MaPrimeRénov' pour tous les gestes de travaux : chauffage (PAC, chaudière bois, poêle, systèmes solaires), isolation (murs, toiture, plancher, fenêtres), ventilation (VMC double flux), audit énergétique et dépose de cuve à fioul.",
      },
      {
        question: 'Quel reste à charge pour un ménage aux revenus intermédiaires ?',
        answer:
          "Le taux d'écrêtement de 60 % impose un reste à charge minimum de 40 % du coût TTC. Par exemple, pour une PAC air/eau à 15 000 €, le cumul des aides est plafonné à 9 000 €, soit un reste à charge d'au moins 6 000 €. L'éco-PTZ peut financer tout ou partie de ce reste à charge.",
      },
      {
        question: 'Comment maximiser les aides en catégorie Violet ?',
        answer:
          "Cumulez MaPrimeRénov' avec les primes CEE (comparez les offres de plusieurs fournisseurs d'énergie), l'éco-PTZ pour financer le reste à charge, et la TVA à 5,5 %. Regroupez plusieurs gestes (isolation + chauffage + ventilation) pour maximiser l'éco-PTZ (30 000 € pour 3 gestes).",
      },
    ],
  },
  {
    categorieKey: 'rose',
    slug: 'aises',
    label: 'Ménages aux revenus supérieurs',
    couleur: '#ec4899',
    couleurNom: 'Rose',
    description:
      'La catégorie Rose correspond aux ménages aux revenus supérieurs. L\'accès à MaPrimeRénov\' est limité aux travaux d\'isolation, avec un taux d\'écrêtement de 40 % (reste à charge minimum de 60 %).',
    contexte:
      "Les ménages classés en catégorie Rose sont ceux dont le revenu fiscal de référence dépasse les plafonds de la catégorie Violet. Contrairement aux idées reçues, les ménages aisés ne sont pas totalement exclus de MaPrimeRénov' : ils restent éligibles aux aides pour les travaux d'isolation thermique (murs, toiture, planchers). En revanche, les gestes de remplacement du système de chauffage (PAC, chaudière bois, poêle, systèmes solaires), de ventilation (VMC double flux), d'audit énergétique et de dépose de cuve à fioul ne sont pas pris en charge.\n\nLe taux d'écrêtement de la catégorie Rose est de 40 %, ce qui signifie que le cumul MaPrimeRénov' + CEE est plafonné à 40 % du coût TTC des travaux. Le reste à charge minimum est de 60 %. Pour un chantier d'isolation de 20 000 €, les aides ne peuvent pas dépasser 8 000 €.\n\nLes montants MaPrimeRénov' pour l'isolation sont réduits par rapport aux autres catégories : 15 €/m² pour l'isolation des murs par l'extérieur (contre 75 €/m² en Bleu), 7 €/m² pour l'isolation des murs par l'intérieur, des combles et des planchers (contre 25 €/m² en Bleu). Les fenêtres ne sont pas éligibles en catégorie Rose.\n\nMalgré ces limitations, les ménages Rose ont tout intérêt à rénover leur logement pour plusieurs raisons : la TVA à 5,5 % s'applique sans conditions de ressources (économie significative sur les gros chantiers), l'éco-PTZ est accessible à tous (jusqu'à 30 000 € à taux zéro sur 20 ans), et les primes CEE sont versées indépendamment de la catégorie MaPrimeRénov'. De plus, MaPrimeRénov' Parcours Accompagné est accessible aux ménages Rose pour les projets de rénovation globale, avec une prise en charge de 20 % du coût HT (sous plafonds).\n\nEnfin, la valorisation immobilière d'un logement rénové est significative : un gain de 2 classes DPE (par exemple de F à D) peut augmenter la valeur du bien de 5 à 15 %, ce qui représente un retour sur investissement intéressant même avec un reste à charge élevé.",
    plafondsIdf: [] as number[],
    parPersonneSuppIdf: 0,
    plafondsHorsIdf: [] as number[],
    parPersonneSuppHorsIdf: 0,
    tauxEcretement: TAUX_ECRETEMENT.rose,
    plafondCumul: PLAFOND_CUMUL_5ANS.rose,
    faq: [
      {
        question: 'Les ménages aisés ont-ils droit à MaPrimeRénov\' ?',
        answer:
          "Oui, mais uniquement pour les travaux d'isolation : murs par l'extérieur (15 €/m²), murs par l'intérieur (7 €/m²), combles et toiture (7 €/m²), planchers bas (7 €/m²). Les gestes de chauffage, ventilation, audit et dépose de cuve ne sont pas éligibles en catégorie Rose.",
      },
      {
        question: 'Quelles aides pour les ménages aux revenus supérieurs en 2026 ?',
        answer:
          "Outre MaPrimeRénov' pour l'isolation, les ménages Rose bénéficient de la TVA à 5,5 % (sans condition de ressources), des primes CEE, et de l'éco-PTZ (15 000 à 30 000 € à taux zéro sur 20 ans). MaPrimeRénov' Parcours Accompagné est aussi accessible avec 20 % de prise en charge.",
      },
      {
        question: 'Comment savoir si je suis en catégorie Rose ?',
        answer:
          "Vous êtes en catégorie Rose si votre RFR dépasse les plafonds de la catégorie Violet. Pour une personne seule : au-delà de 30 549 € hors IDF ou 40 018 € en IDF. Pour 4 personnes : au-delà de 63 303 € hors IDF ou 82 839 € en IDF. Il n'y a pas de plafond supérieur.",
      },
    ],
  },
];

/** Retrouver une catégorie par son slug */
export function getCategorieBySlug(slug: string): CategoriePageData | undefined {
  return categoriesData.find((c) => c.slug === slug);
}
