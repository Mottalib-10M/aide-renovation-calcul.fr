import { describe, it, expect } from 'vitest';
import {
  determinerCategorie,
  calculerMPR,
  calculerCEE,
  calculerEconomieTVA,
  calculerEcoPtzMax,
  simuler,
} from './engine';

describe('determinerCategorie', () => {
  it('classe un RFR très modeste hors IDF en bleu', () => {
    expect(determinerCategorie(15_000, 1, false)).toBe('bleu');
  });

  it('classe un RFR très modeste IDF en bleu', () => {
    expect(determinerCategorie(20_000, 1, true)).toBe('bleu');
  });

  it('classe un RFR modeste hors IDF en jaune', () => {
    expect(determinerCategorie(18_000, 1, false)).toBe('jaune');
  });

  it('classe un RFR intermédiaire en violet', () => {
    // Violet 1 pers hors IDF = 30_549, so 28_000 is below
    expect(determinerCategorie(28_000, 1, false)).toBe('violet');
  });

  it('classe un RFR élevé en rose', () => {
    expect(determinerCategorie(80_000, 1, false)).toBe('rose');
  });

  it('gère correctement 5 personnes hors IDF', () => {
    // Bleu 5 pers hors IDF = 40_002
    expect(determinerCategorie(39_000, 5, false)).toBe('bleu');
    expect(determinerCategorie(41_000, 5, false)).toBe('jaune');
  });

  it('gère les foyers > 5 personnes avec supplément', () => {
    // Bleu 5 pers hors IDF = 40_002, +5_045 par pers supp
    // 6 pers = 45_047
    expect(determinerCategorie(44_000, 6, false)).toBe('bleu');
    expect(determinerCategorie(46_000, 6, false)).toBe('jaune');
  });
});

describe('calculerMPR', () => {
  it('calcule le montant forfaitaire PAC air/eau bleu', () => {
    expect(calculerMPR('pac_air_eau', 1, 'bleu')).toBe(5_000);
  });

  it('calcule le montant forfaitaire PAC air/eau jaune', () => {
    expect(calculerMPR('pac_air_eau', 1, 'jaune')).toBe(4_000);
  });

  it('retourne 0 pour PAC air/eau rose (non éligible)', () => {
    expect(calculerMPR('pac_air_eau', 1, 'rose')).toBe(0);
  });

  it('calcule isolation murs ext au m²', () => {
    expect(calculerMPR('isolation_murs_ext', 100, 'bleu')).toBe(7_500);
  });

  it('calcule fenêtres par unité', () => {
    expect(calculerMPR('fenetres', 6, 'bleu')).toBe(600);
  });

  it('retourne le montant pour isolation rose (aisé)', () => {
    // Rose a accès à l'isolation mais pas au chauffage
    expect(calculerMPR('isolation_murs_ext', 50, 'rose')).toBe(750);
  });
});

describe('calculerCEE', () => {
  it('retourne une fourchette CEE forfaitaire', () => {
    const cee = calculerCEE('pac_air_eau', 1);
    expect(cee.bas).toBe(2_500);
    expect(cee.haut).toBe(4_000);
  });

  it('retourne une fourchette CEE au m²', () => {
    const cee = calculerCEE('isolation_murs_ext', 100);
    expect(cee.bas).toBe(800);
    expect(cee.haut).toBe(1_500);
  });

  it('retourne 0 pour audit énergétique', () => {
    const cee = calculerCEE('audit_energetique', 1);
    expect(cee.bas).toBe(0);
    expect(cee.haut).toBe(0);
  });
});

describe('calculerEconomieTVA', () => {
  it('calcule l\'économie entre TVA 20% et 5,5%', () => {
    // Coût TTC 10_000€ à 5,5% → HT = 10000/1.055 ≈ 9478.67
    // TVA 5,5% ≈ 521.33, TVA 20% ≈ 1895.73
    // Économie ≈ 1374
    const eco = calculerEconomieTVA(10_000);
    expect(eco).toBeGreaterThan(1_300);
    expect(eco).toBeLessThan(1_500);
  });
});

describe('calculerEcoPtzMax', () => {
  it('retourne 15_000 pour 1 geste', () => {
    expect(calculerEcoPtzMax(1)).toBe(15_000);
  });

  it('retourne 25_000 pour 2 gestes', () => {
    expect(calculerEcoPtzMax(2)).toBe(25_000);
  });

  it('retourne 30_000 pour 3+ gestes', () => {
    expect(calculerEcoPtzMax(3)).toBe(30_000);
    expect(calculerEcoPtzMax(5)).toBe(30_000);
  });

  it('retourne 0 pour 0 geste', () => {
    expect(calculerEcoPtzMax(0)).toBe(0);
  });
});

describe('simuler', () => {
  it('simule un cas simple PAC air/eau pour ménage bleu', () => {
    const result = simuler({
      rfr: 15_000,
      personnesFoyer: 2,
      idf: false,
      travaux: [{ type: 'pac_air_eau', quantite: 1, coutTTC: 15_000 }],
    });

    expect(result.categorie).toBe('bleu');
    expect(result.totalMPR).toBe(5_000);
    expect(result.totalCEEBas).toBeGreaterThan(0);
    expect(result.totalCEEHaut).toBeGreaterThan(result.totalCEEBas);
    expect(result.coutTotalTTC).toBe(15_000);
    expect(result.resteAChargeBas).toBeLessThan(15_000);
    expect(result.ecoPtzMax).toBe(15_000);
  });

  it('simule un cas multi-gestes (PAC + isolation)', () => {
    const result = simuler({
      rfr: 20_000,
      personnesFoyer: 3,
      idf: false,
      travaux: [
        { type: 'pac_air_eau', quantite: 1, coutTTC: 15_000 },
        { type: 'isolation_murs_ext', quantite: 80, coutTTC: 12_000 },
      ],
    });

    expect(result.categorie).toBe('bleu');
    expect(result.nombreGestes).toBe(2);
    expect(result.totalMPR).toBe(5_000 + 80 * 75); // 5000 + 6000
    expect(result.ecoPtzMax).toBe(25_000);
    expect(result.details).toHaveLength(2);
  });

  it('applique l\'écrêtement pour les ménages rose', () => {
    const result = simuler({
      rfr: 100_000,
      personnesFoyer: 2,
      idf: false,
      travaux: [
        { type: 'isolation_murs_ext', quantite: 50, coutTTC: 5_000 },
      ],
    });

    expect(result.categorie).toBe('rose');
    // Écrêtement rose = 40% du coût TTC = 2000
    expect(result.tauxEcretement).toBe(0.40);
    // MPR rose isolation murs ext = 15€/m² × 50 = 750
    expect(result.totalMPR).toBe(750);
  });

  it('prend en compte les aides déjà perçues', () => {
    const result = simuler({
      rfr: 15_000,
      personnesFoyer: 1,
      idf: false,
      travaux: [{ type: 'pac_geothermique', quantite: 1, coutTTC: 20_000 }],
      aidesDejaPercues: 35_000,
    });

    // Plafond 5 ans = 40_000, déjà perçu = 35_000, reste = 5_000
    // MPR géothermique bleu = 11_000 mais plafonné à 5_000
    expect(result.totalMPR).toBe(5_000);
  });

  it('gère un cas sans aucun travaux', () => {
    const result = simuler({
      rfr: 25_000,
      personnesFoyer: 2,
      idf: false,
      travaux: [],
    });

    expect(result.totalMPR).toBe(0);
    expect(result.totalCEEBas).toBe(0);
    expect(result.coutTotalTTC).toBe(0);
    expect(result.ecoPtzMax).toBe(0);
  });

  it('calcule correctement l\'économie de TVA', () => {
    const result = simuler({
      rfr: 15_000,
      personnesFoyer: 1,
      idf: false,
      travaux: [{ type: 'chauffe_eau_thermo', quantite: 1, coutTTC: 3_000 }],
    });

    expect(result.totalEconomieTVA).toBeGreaterThan(0);
    expect(result.details[0].economieTVA).toBeGreaterThan(0);
  });
});
