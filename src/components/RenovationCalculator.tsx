import { useState, useMemo } from 'react';
import {
  type TypeTravaux,
  TRAVAUX,
  CATEGORIE_LABELS,
  CATEGORIE_COULEURS,
} from '../lib/baremes-mpr-2026';
import { simuler, type TravauxSelection, type SimulationResult } from '../lib/engine';

const TRAVAUX_OPTIONS: { value: TypeTravaux; label: string; categorie: string }[] = [
  { value: 'pac_air_eau', label: 'Pompe à chaleur air/eau', categorie: 'Chauffage' },
  { value: 'pac_geothermique', label: 'PAC géothermique', categorie: 'Chauffage' },
  { value: 'chauffe_eau_thermo', label: 'Chauffe-eau thermodynamique', categorie: 'Chauffage' },
  { value: 'poele_granules', label: 'Poêle à granulés', categorie: 'Chauffage' },
  { value: 'insert_cheminee', label: 'Insert / foyer fermé', categorie: 'Chauffage' },
  { value: 'chaudiere_bois', label: 'Chaudière bois', categorie: 'Chauffage' },
  { value: 'systeme_solaire_combine', label: 'Système solaire combiné', categorie: 'Chauffage' },
  { value: 'chauffe_eau_solaire', label: 'Chauffe-eau solaire', categorie: 'Chauffage' },
  { value: 'vmc_double_flux', label: 'VMC double flux', categorie: 'Ventilation' },
  { value: 'isolation_murs_ext', label: 'Isolation murs extérieur', categorie: 'Isolation' },
  { value: 'isolation_murs_int', label: 'Isolation murs intérieur', categorie: 'Isolation' },
  { value: 'isolation_combles', label: 'Isolation combles / toiture', categorie: 'Isolation' },
  { value: 'isolation_plancher', label: 'Isolation plancher bas', categorie: 'Isolation' },
  { value: 'fenetres', label: 'Fenêtres (remplacement simple vitrage)', categorie: 'Isolation' },
  { value: 'audit_energetique', label: 'Audit énergétique', categorie: 'Autres' },
  { value: 'depose_cuve_fioul', label: 'Dépose cuve à fioul', categorie: 'Autres' },
];

interface TravauxRow {
  id: number;
  type: TypeTravaux;
  quantite: number;
  coutTTC: number;
}

function fmt(n: number): string {
  return n.toLocaleString('fr-FR', { maximumFractionDigits: 0 });
}

export default function RenovationCalculator() {
  const [rfr, setRfr] = useState(25_000);
  const [personnes, setPersonnes] = useState(2);
  const [idf, setIdf] = useState(false);
  const [aidesDejaPercues, setAidesDejaPercues] = useState(0);
  const [travaux, setTravaux] = useState<TravauxRow[]>([
    { id: 1, type: 'pac_air_eau', quantite: 1, coutTTC: 15_000 },
  ]);
  const [nextId, setNextId] = useState(2);

  const addTravaux = () => {
    setTravaux([...travaux, { id: nextId, type: 'isolation_combles', quantite: 50, coutTTC: 5_000 }]);
    setNextId(nextId + 1);
  };

  const removeTravaux = (id: number) => {
    setTravaux(travaux.filter(t => t.id !== id));
  };

  const updateTravaux = (id: number, field: keyof TravauxRow, value: string | number) => {
    setTravaux(travaux.map(t => {
      if (t.id !== id) return t;
      if (field === 'type') return { ...t, type: value as TypeTravaux };
      return { ...t, [field]: Number(value) || 0 };
    }));
  };

  const result: SimulationResult | null = useMemo(() => {
    if (travaux.length === 0) return null;
    const selections: TravauxSelection[] = travaux.map(t => ({
      type: t.type,
      quantite: t.quantite,
      coutTTC: t.coutTTC,
    }));
    return simuler({
      rfr,
      personnesFoyer: personnes,
      idf,
      travaux: selections,
      aidesDejaPercues,
    });
  }, [rfr, personnes, idf, travaux, aidesDejaPercues]);

  const getUniteLabel = (type: TypeTravaux): string => {
    const info = TRAVAUX[type];
    switch (info.unite) {
      case 'par_m2': return 'm²';
      case 'par_fenetre': return 'fenêtre(s)';
      case 'forfait': return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Formulaire revenus */}
      <div className="bg-white rounded-xl shadow-sm border border-border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Votre situation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Revenu fiscal de référence (RFR)
            </label>
            <div className="relative">
              <input
                type="number"
                value={rfr}
                onChange={e => setRfr(Number(e.target.value) || 0)}
                className="w-full rounded-lg border-gray-300 border px-3 py-2 pr-8 focus:ring-2 focus:ring-primary focus:border-primary"
                min={0}
              />
              <span className="absolute right-3 top-2.5 text-gray-500 text-sm">€</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Personnes du foyer fiscal
            </label>
            <input
              type="number"
              value={personnes}
              onChange={e => setPersonnes(Math.max(1, Number(e.target.value) || 1))}
              className="w-full rounded-lg border-gray-300 border px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
              min={1}
              max={20}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={idf}
                onChange={e => setIdf(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ms-3 text-sm font-medium text-gray-700">Île-de-France</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aides déjà perçues (5 ans)
            </label>
            <div className="relative">
              <input
                type="number"
                value={aidesDejaPercues}
                onChange={e => setAidesDejaPercues(Number(e.target.value) || 0)}
                className="w-full rounded-lg border-gray-300 border px-3 py-2 pr-8 focus:ring-2 focus:ring-primary focus:border-primary"
                min={0}
              />
              <span className="absolute right-3 top-2.5 text-gray-500 text-sm">€</span>
            </div>
          </div>
        </div>
      </div>

      {/* Travaux */}
      <div className="bg-white rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Vos travaux</h2>
          <button
            onClick={addTravaux}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            + Ajouter un geste
          </button>
        </div>

        <div className="space-y-4">
          {travaux.map((t, i) => (
            <div key={t.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Geste {i + 1}</span>
                {travaux.length > 1 && (
                  <button
                    onClick={() => removeTravaux(t.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Supprimer
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-1">
                  <label className="block text-xs text-gray-500 mb-1">Type de travaux</label>
                  <select
                    value={t.type}
                    onChange={e => updateTravaux(t.id, 'type', e.target.value)}
                    className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    {TRAVAUX_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.categorie} — {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    {TRAVAUX[t.type].unite === 'forfait'
                      ? 'Quantité'
                      : `Quantité (${getUniteLabel(t.type)})`}
                  </label>
                  <input
                    type="number"
                    value={t.quantite}
                    onChange={e => updateTravaux(t.id, 'quantite', e.target.value)}
                    className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                    min={1}
                    disabled={TRAVAUX[t.type].unite === 'forfait'}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Coût total TTC (€)</label>
                  <input
                    type="number"
                    value={t.coutTTC}
                    onChange={e => updateTravaux(t.id, 'coutTTC', e.target.value)}
                    className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                    min={0}
                    step={100}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Résultats */}
      {result && (
        <div className="bg-white rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Estimation de vos aides</h2>

          {/* Catégorie */}
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: CATEGORIE_COULEURS[result.categorie] + '15' }}>
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: CATEGORIE_COULEURS[result.categorie] }}
              />
              <div>
                <p className="text-sm font-medium text-gray-700">Votre catégorie MaPrimeRénov'</p>
                <p className="text-lg font-bold" style={{ color: CATEGORIE_COULEURS[result.categorie] }}>
                  {CATEGORIE_LABELS[result.categorie]}
                </p>
              </div>
            </div>
          </div>

          {/* Tableau détaillé */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 font-medium text-gray-600">Travaux</th>
                  <th className="text-right py-2 px-2 font-medium text-gray-600">Coût TTC</th>
                  <th className="text-right py-2 px-2 font-medium text-gray-600">MaPrimeRénov'</th>
                  <th className="text-right py-2 px-2 font-medium text-gray-600">Prime CEE</th>
                </tr>
              </thead>
              <tbody>
                {result.details.map((d, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-2 pr-4 text-gray-800">{d.label}</td>
                    <td className="text-right py-2 px-2 text-gray-700">{fmt(d.coutTTC)} €</td>
                    <td className="text-right py-2 px-2 font-medium text-primary">
                      {d.montantMPR > 0 ? `${fmt(d.montantMPR)} €` : '—'}
                    </td>
                    <td className="text-right py-2 px-2 text-secondary">
                      {d.ceeBas > 0 ? `${fmt(d.ceeBas)} – ${fmt(d.ceeHaut)} €` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Synthèse */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">MaPrimeRénov'</p>
              <p className="text-2xl font-bold text-primary">{fmt(result.totalMPR)} €</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Prime CEE</p>
              <p className="text-lg font-bold text-secondary">
                {fmt(result.totalCEEBas)} – {fmt(result.totalCEEHaut)} €
              </p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Économie TVA</p>
              <p className="text-lg font-bold text-accent">{fmt(result.totalEconomieTVA)} €</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Éco-PTZ max</p>
              <p className="text-lg font-bold text-purple-600">{fmt(result.ecoPtzMax)} €</p>
              {result.ecoPtzMensualite > 0 && (
                <p className="text-xs text-gray-500">soit {fmt(result.ecoPtzMensualite)} €/mois sur 20 ans</p>
              )}
            </div>
          </div>

          {/* Barre visuelle */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Coût total : {fmt(result.coutTotalTTC)} €</span>
              <span className="font-medium text-primary">
                Aides : {fmt(result.totalAidesBas)} – {fmt(result.totalAidesHaut)} €
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-primary h-4 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (result.totalAidesHaut / result.coutTotalTTC) * 100)}%` }}
              />
            </div>
          </div>

          {/* Reste à charge */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-sm text-gray-600">Reste à charge estimé</p>
                <p className="text-2xl font-bold text-gray-900">
                  {fmt(result.resteAChargeBas)} – {fmt(result.resteAChargeHaut)} €
                </p>
              </div>
              {result.ecretementApplique && (
                <div className="bg-amber-100 text-amber-800 text-xs px-3 py-1.5 rounded-full">
                  Écrêtement appliqué ({Math.round(result.tauxEcretement * 100)} % max)
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            Estimation indicative basée sur les barèmes MaPrimeRénov' 2026 et les fourchettes CEE constatées.
            Les montants réels dépendent des devis, de l'entreprise RGE choisie et des conditions d'éligibilité
            vérifiées par l'ANAH. Ce simulateur ne constitue pas un engagement de versement d'aides.
            Consultez <a href="https://www.maprimerenov.gouv.fr" target="_blank" rel="noopener noreferrer" className="underline">maprimerenov.gouv.fr</a> pour
            une simulation officielle.
          </p>
        </div>
      )}
    </div>
  );
}
