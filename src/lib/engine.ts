/**
 * Moteur de calcul — Cumul des aides à la rénovation énergétique
 *
 * Calcule : MaPrimeRénov', prime CEE, éco-PTZ, TVA 5,5 %
 * Applique : écrêtement, plafond de cumul 5 ans
 */

import {
  type CategorieRevenu,
  type TypeTravaux,
  PLAFONDS_IDF,
  PLAFONDS_HORS_IDF,
  TRAVAUX,
  ECO_PTZ,
  ECO_PTZ_RENOVATION_GLOBALE,
  TVA_REDUITE,
  TVA_NORMALE,
  TAUX_ECRETEMENT,
  PLAFOND_CUMUL_5ANS,
} from './baremes-mpr-2026';

// --- Types d'entrée ---

export interface TravauxSelection {
  type: TypeTravaux;
  /** Surface en m² (pour isolation) ou nombre (pour fenêtres) ou 1 (forfait) */
  quantite: number;
  /** Coût total TTC estimé des travaux */
  coutTTC: number;
}

export interface SimulationInput {
  /** Revenu fiscal de référence du foyer */
  rfr: number;
  /** Nombre de personnes du foyer fiscal */
  personnesFoyer: number;
  /** true si le logement est en Île-de-France */
  idf: boolean;
  /** Liste des travaux sélectionnés */
  travaux: TravauxSelection[];
  /** Aides déjà perçues sur les 5 dernières années (€) */
  aidesDejaPercues?: number;
}

// --- Types de résultat ---

export interface AideDetail {
  type: TypeTravaux;
  label: string;
  coutTTC: number;
  montantMPR: number;
  ceeBas: number;
  ceeHaut: number;
  economieTVA: number;
}

export interface SimulationResult {
  /** Catégorie de revenus déterminée */
  categorie: CategorieRevenu;
  /** Détail par type de travaux */
  details: AideDetail[];
  /** Total MaPrimeRénov' avant écrêtement */
  totalMPR: number;
  /** Fourchette CEE basse */
  totalCEEBas: number;
  /** Fourchette CEE haute */
  totalCEEHaut: number;
  /** Économie de TVA (différence entre 20% et 5,5%) */
  totalEconomieTVA: number;
  /** Cumul des aides basse fourchette */
  totalAidesBas: number;
  /** Cumul des aides haute fourchette */
  totalAidesHaut: number;
  /** Coût total TTC des travaux */
  coutTotalTTC: number;
  /** Reste à charge basse fourchette */
  resteAChargeBas: number;
  /** Reste à charge haute fourchette */
  resteAChargeHaut: number;
  /** Écrêtement appliqué (true si les aides ont été plafonnées) */
  ecretementApplique: boolean;
  /** Montant éco-PTZ max éligible */
  ecoPtzMax: number;
  /** Mensualité éco-PTZ indicative (sur 20 ans) */
  ecoPtzMensualite: number;
  /** Nombre de gestes de travaux */
  nombreGestes: number;
  /** Taux d'écrêtement applicable */
  tauxEcretement: number;
}

// --- Fonctions ---

/**
 * Détermine la catégorie de revenus MaPrimeRénov' à partir du RFR,
 * du nombre de personnes du foyer et de la zone géographique.
 */
export function determinerCategorie(
  rfr: number,
  personnesFoyer: number,
  idf: boolean,
): CategorieRevenu {
  const plafonds = idf ? PLAFONDS_IDF : PLAFONDS_HORS_IDF;
  const personnes = Math.max(1, Math.round(personnesFoyer));

  function getPlafond(cat: 'bleu' | 'jaune' | 'violet'): number {
    const p = plafonds[cat];
    if (personnes <= 5) {
      return p.plafonds[personnes - 1];
    }
    return p.plafonds[4] + (personnes - 5) * p.parPersonneSupp;
  }

  if (rfr <= getPlafond('bleu')) return 'bleu';
  if (rfr <= getPlafond('jaune')) return 'jaune';
  if (rfr <= getPlafond('violet')) return 'violet';
  return 'rose';
}

/**
 * Calcule le montant MaPrimeRénov' pour un geste donné.
 */
export function calculerMPR(
  type: TypeTravaux,
  quantite: number,
  categorie: CategorieRevenu,
): number {
  const info = TRAVAUX[type];
  const montantUnitaire = info.montantMPR[categorie];

  if (montantUnitaire === null) return 0;

  switch (info.unite) {
    case 'forfait':
      return montantUnitaire;
    case 'par_m2':
      return Math.round(montantUnitaire * quantite);
    case 'par_fenetre':
      return Math.round(montantUnitaire * quantite);
  }
}

/**
 * Calcule la prime CEE (fourchettes) pour un geste donné.
 */
export function calculerCEE(
  type: TypeTravaux,
  quantite: number,
): { bas: number; haut: number } {
  const info = TRAVAUX[type];

  switch (info.unite) {
    case 'forfait':
      return { bas: info.ceeBas, haut: info.ceeHaut };
    case 'par_m2':
      return {
        bas: Math.round(info.ceeBas * quantite),
        haut: Math.round(info.ceeHaut * quantite),
      };
    case 'par_fenetre':
      return {
        bas: Math.round(info.ceeBas * quantite),
        haut: Math.round(info.ceeHaut * quantite),
      };
  }
}

/**
 * Calcule l'économie de TVA (différence entre TVA normale et TVA réduite).
 * S'applique aux travaux de rénovation énergétique dans un logement
 * de plus de 2 ans.
 */
export function calculerEconomieTVA(coutTTC: number): number {
  // Le coût TTC est déjà en TTC, on calcule le HT puis la différence de TVA
  const coutHT = coutTTC / (1 + TVA_REDUITE);
  const tvaReduite = coutHT * TVA_REDUITE;
  const tvaNormale = coutHT * TVA_NORMALE;
  return Math.round(tvaNormale - tvaReduite);
}

/**
 * Détermine le montant max de l'éco-PTZ.
 */
export function calculerEcoPtzMax(nombreGestes: number): number {
  if (nombreGestes <= 0) return 0;
  if (nombreGestes === 1) return ECO_PTZ.montantMaxParGestes[1];
  if (nombreGestes === 2) return ECO_PTZ.montantMaxParGestes[2];
  return ECO_PTZ.montantMaxParGestes[3];
}

/**
 * Simulation complète du cumul des aides à la rénovation.
 */
export function simuler(input: SimulationInput): SimulationResult {
  const categorie = determinerCategorie(input.rfr, input.personnesFoyer, input.idf);
  const aidesDejaPercues = input.aidesDejaPercues ?? 0;

  const details: AideDetail[] = [];
  let totalMPR = 0;
  let totalCEEBas = 0;
  let totalCEEHaut = 0;
  let totalEconomieTVA = 0;
  let coutTotalTTC = 0;

  for (const t of input.travaux) {
    const mpr = calculerMPR(t.type, t.quantite, categorie);
    const cee = calculerCEE(t.type, t.quantite);
    const economieTVA = calculerEconomieTVA(t.coutTTC);

    details.push({
      type: t.type,
      label: TRAVAUX[t.type].label,
      coutTTC: t.coutTTC,
      montantMPR: mpr,
      ceeBas: cee.bas,
      ceeHaut: cee.haut,
      economieTVA,
    });

    totalMPR += mpr;
    totalCEEBas += cee.bas;
    totalCEEHaut += cee.haut;
    totalEconomieTVA += economieTVA;
    coutTotalTTC += t.coutTTC;
  }

  // Plafond de cumul sur 5 ans
  const plafondRestant = Math.max(0, PLAFOND_CUMUL_5ANS[categorie] - aidesDejaPercues);
  totalMPR = Math.min(totalMPR, plafondRestant);

  // Écrêtement : le cumul MPR + CEE ne peut dépasser le taux d'écrêtement × coût TTC
  const tauxEcretement = TAUX_ECRETEMENT[categorie];
  const plafondEcretement = Math.round(coutTotalTTC * tauxEcretement);

  let totalAidesBas = totalMPR + totalCEEBas;
  let totalAidesHaut = totalMPR + totalCEEHaut;

  let ecretementApplique = false;
  if (totalAidesHaut > plafondEcretement) {
    ecretementApplique = true;
    totalAidesHaut = Math.min(totalAidesHaut, plafondEcretement);
    totalAidesBas = Math.min(totalAidesBas, plafondEcretement);
  }

  const resteAChargeBas = Math.max(0, coutTotalTTC - totalAidesHaut);
  const resteAChargeHaut = Math.max(0, coutTotalTTC - totalAidesBas);

  // Éco-PTZ
  const nombreGestes = input.travaux.length;
  const ecoPtzMax = calculerEcoPtzMax(nombreGestes);
  const ecoPtzMensualite = ecoPtzMax > 0
    ? Math.round(ecoPtzMax / (ECO_PTZ.dureeMaxAnnees * 12))
    : 0;

  return {
    categorie,
    details,
    totalMPR,
    totalCEEBas,
    totalCEEHaut,
    totalEconomieTVA,
    totalAidesBas,
    totalAidesHaut,
    coutTotalTTC,
    resteAChargeBas,
    resteAChargeHaut,
    ecretementApplique,
    ecoPtzMax,
    ecoPtzMensualite,
    nombreGestes,
    tauxEcretement,
  };
}
