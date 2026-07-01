/**
 * Barèmes MaPrimeRénov' 2026
 * Sources : ANAH (anah.gouv.fr), décret n°2020-26, arrêté du 14 janvier 2020 modifié
 * Dernière mise à jour : janvier 2026
 *
 * Les plafonds de revenus sont indexés annuellement.
 * Les montants d'aide sont ceux en vigueur au 1er janvier 2026.
 */

// --- Catégories de revenus ---

export type CategorieRevenu = 'bleu' | 'jaune' | 'violet' | 'rose';

export interface PlafondRevenu {
  /** Plafond par nombre de personnes du foyer (index 0 = 1 personne) */
  plafonds: number[];
  /** Montant par personne supplémentaire au-delà de 5 */
  parPersonneSupp: number;
}

/** Plafonds RFR Île-de-France */
export const PLAFONDS_IDF: Record<Exclude<CategorieRevenu, 'rose'>, PlafondRevenu> = {
  bleu: {
    plafonds: [23_541, 34_551, 41_493, 48_447, 55_427],
    parPersonneSupp: 7_613,
  },
  jaune: {
    plafonds: [28_657, 42_058, 50_513, 58_981, 67_473],
    parPersonneSupp: 9_272,
  },
  violet: {
    plafonds: [40_018, 58_827, 70_382, 82_839, 94_844],
    parPersonneSupp: 13_089,
  },
};

/** Plafonds RFR hors Île-de-France */
export const PLAFONDS_HORS_IDF: Record<Exclude<CategorieRevenu, 'rose'>, PlafondRevenu> = {
  bleu: {
    plafonds: [17_009, 24_875, 29_917, 34_948, 40_002],
    parPersonneSupp: 5_045,
  },
  jaune: {
    plafonds: [21_805, 31_889, 38_349, 44_802, 51_281],
    parPersonneSupp: 6_462,
  },
  violet: {
    plafonds: [30_549, 44_907, 53_882, 63_303, 72_400],
    parPersonneSupp: 9_165,
  },
};

// --- Types de travaux ---

export type TypeTravaux =
  | 'pac_air_eau'
  | 'pac_geothermique'
  | 'chauffe_eau_thermo'
  | 'poele_granules'
  | 'insert_cheminee'
  | 'chaudiere_bois'
  | 'systeme_solaire_combine'
  | 'chauffe_eau_solaire'
  | 'vmc_double_flux'
  | 'isolation_murs_ext'
  | 'isolation_murs_int'
  | 'isolation_combles'
  | 'isolation_plancher'
  | 'fenetres'
  | 'audit_energetique'
  | 'depose_cuve_fioul';

export interface TravauxInfo {
  label: string;
  categorie: 'chauffage' | 'isolation' | 'ventilation' | 'autres';
  unite: 'forfait' | 'par_m2' | 'par_fenetre';
  /** Montant MPR par catégorie de revenus. null = non éligible */
  montantMPR: Record<CategorieRevenu, number | null>;
  /** Plafond de dépenses éligibles (TTC) */
  plafondDepenses: number;
  /** Fourchette CEE basse (€) */
  ceeBas: number;
  /** Fourchette CEE haute (€) */
  ceeHaut: number;
}

export const TRAVAUX: Record<TypeTravaux, TravauxInfo> = {
  pac_air_eau: {
    label: 'Pompe à chaleur air/eau',
    categorie: 'chauffage',
    unite: 'forfait',
    montantMPR: { bleu: 5_000, jaune: 4_000, violet: 3_000, rose: null },
    plafondDepenses: 18_000,
    ceeBas: 2_500,
    ceeHaut: 4_000,
  },
  pac_geothermique: {
    label: 'Pompe à chaleur géothermique ou solarothermique',
    categorie: 'chauffage',
    unite: 'forfait',
    montantMPR: { bleu: 11_000, jaune: 9_000, violet: 6_000, rose: null },
    plafondDepenses: 25_000,
    ceeBas: 4_000,
    ceeHaut: 5_500,
  },
  chauffe_eau_thermo: {
    label: 'Chauffe-eau thermodynamique',
    categorie: 'chauffage',
    unite: 'forfait',
    montantMPR: { bleu: 1_200, jaune: 800, violet: 400, rose: null },
    plafondDepenses: 3_500,
    ceeBas: 100,
    ceeHaut: 200,
  },
  poele_granules: {
    label: 'Poêle à granulés',
    categorie: 'chauffage',
    unite: 'forfait',
    montantMPR: { bleu: 2_500, jaune: 2_000, violet: 1_500, rose: null },
    plafondDepenses: 5_000,
    ceeBas: 250,
    ceeHaut: 800,
  },
  insert_cheminee: {
    label: 'Insert ou foyer fermé à bûches ou granulés',
    categorie: 'chauffage',
    unite: 'forfait',
    montantMPR: { bleu: 2_500, jaune: 1_500, violet: 1_000, rose: null },
    plafondDepenses: 4_000,
    ceeBas: 250,
    ceeHaut: 800,
  },
  chaudiere_bois: {
    label: 'Chaudière bois à bûches ou granulés',
    categorie: 'chauffage',
    unite: 'forfait',
    montantMPR: { bleu: 8_000, jaune: 6_500, violet: 3_000, rose: null },
    plafondDepenses: 18_000,
    ceeBas: 800,
    ceeHaut: 1_800,
  },
  systeme_solaire_combine: {
    label: 'Système solaire combiné (chauffage + eau chaude)',
    categorie: 'chauffage',
    unite: 'forfait',
    montantMPR: { bleu: 10_000, jaune: 8_000, violet: 4_000, rose: null },
    plafondDepenses: 20_000,
    ceeBas: 3_000,
    ceeHaut: 4_500,
  },
  chauffe_eau_solaire: {
    label: 'Chauffe-eau solaire individuel',
    categorie: 'chauffage',
    unite: 'forfait',
    montantMPR: { bleu: 4_000, jaune: 3_000, violet: 2_000, rose: null },
    plafondDepenses: 7_000,
    ceeBas: 100,
    ceeHaut: 250,
  },
  vmc_double_flux: {
    label: 'VMC double flux',
    categorie: 'ventilation',
    unite: 'forfait',
    montantMPR: { bleu: 2_500, jaune: 2_000, violet: 1_500, rose: null },
    plafondDepenses: 6_000,
    ceeBas: 200,
    ceeHaut: 500,
  },
  isolation_murs_ext: {
    label: 'Isolation des murs par l\'extérieur',
    categorie: 'isolation',
    unite: 'par_m2',
    montantMPR: { bleu: 75, jaune: 60, violet: 40, rose: 15 },
    plafondDepenses: 150,
    ceeBas: 8,
    ceeHaut: 15,
  },
  isolation_murs_int: {
    label: 'Isolation des murs par l\'intérieur',
    categorie: 'isolation',
    unite: 'par_m2',
    montantMPR: { bleu: 25, jaune: 20, violet: 15, rose: 7 },
    plafondDepenses: 70,
    ceeBas: 8,
    ceeHaut: 15,
  },
  isolation_combles: {
    label: 'Isolation des rampants de toiture et plafonds de combles',
    categorie: 'isolation',
    unite: 'par_m2',
    montantMPR: { bleu: 25, jaune: 20, violet: 15, rose: 7 },
    plafondDepenses: 75,
    ceeBas: 6,
    ceeHaut: 12,
  },
  isolation_plancher: {
    label: 'Isolation des planchers bas',
    categorie: 'isolation',
    unite: 'par_m2',
    montantMPR: { bleu: 25, jaune: 20, violet: 15, rose: 7 },
    plafondDepenses: 60,
    ceeBas: 5,
    ceeHaut: 10,
  },
  fenetres: {
    label: 'Fenêtres et portes-fenêtres (remplacement simple vitrage)',
    categorie: 'isolation',
    unite: 'par_fenetre',
    montantMPR: { bleu: 100, jaune: 80, violet: 40, rose: null },
    plafondDepenses: 1_000,
    ceeBas: 30,
    ceeHaut: 80,
  },
  audit_energetique: {
    label: 'Audit énergétique',
    categorie: 'autres',
    unite: 'forfait',
    montantMPR: { bleu: 500, jaune: 400, violet: 300, rose: null },
    plafondDepenses: 800,
    ceeBas: 0,
    ceeHaut: 0,
  },
  depose_cuve_fioul: {
    label: 'Dépose de cuve à fioul',
    categorie: 'autres',
    unite: 'forfait',
    montantMPR: { bleu: 1_200, jaune: 800, violet: 400, rose: null },
    plafondDepenses: 4_000,
    ceeBas: 0,
    ceeHaut: 0,
  },
};

// --- Éco-PTZ ---

export interface EcoPtzInfo {
  /** Montant max en fonction du nombre de gestes */
  montantMaxParGestes: Record<number, number>;
  /** Durée max en années */
  dureeMaxAnnees: number;
  /** Taux d'intérêt */
  taux: number;
}

export const ECO_PTZ: EcoPtzInfo = {
  montantMaxParGestes: {
    1: 15_000,
    2: 25_000,
    3: 30_000, // 3 gestes ou plus
  },
  dureeMaxAnnees: 20,
  taux: 0,
};

/** Montant éco-PTZ pour rénovation globale (gain ≥ 35% de conso) */
export const ECO_PTZ_RENOVATION_GLOBALE = 50_000;

// --- TVA réduite ---

export const TVA_REDUITE = 0.055;
export const TVA_NORMALE = 0.20;

// --- Plafonds de cumul sur 5 ans glissants ---

export const PLAFOND_CUMUL_5ANS: Record<CategorieRevenu, number> = {
  bleu: 40_000,
  jaune: 40_000,
  violet: 40_000,
  rose: 40_000,
};

// --- Taux d'écrêtement (reste à charge minimum) ---
/** Le cumul des aides ne peut dépasser ce % du coût TTC des travaux */
export const TAUX_ECRETEMENT: Record<CategorieRevenu, number> = {
  bleu: 0.90,
  jaune: 0.75,
  violet: 0.60,
  rose: 0.40,
};

// --- Labels ---

export const CATEGORIE_LABELS: Record<CategorieRevenu, string> = {
  bleu: 'Bleu — Revenus très modestes',
  jaune: 'Jaune — Revenus modestes',
  violet: 'Violet — Revenus intermédiaires',
  rose: 'Rose — Revenus supérieurs',
};

export const CATEGORIE_COULEURS: Record<CategorieRevenu, string> = {
  bleu: '#3b82f6',
  jaune: '#eab308',
  violet: '#8b5cf6',
  rose: '#ec4899',
};
