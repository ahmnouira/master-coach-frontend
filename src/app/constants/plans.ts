import { Plan } from '../models/plan.model';

export const PLANS: Plan[] = [
  {
    id: '1',
    title: `Offer libre\nValable toute l'année`,
    price: '0 euros HT',
    features: [
      'Page web prsonnalisée',
      'Référencement de votre profil avec un rayonnment optimal',
      'Messagerie sécurisée',
      'Synchronisation automatique de vos agendas et prise de rendez-vous',
    ],
  },

  {
    id: '2',
    title: 'Initiation',
    price: '29 euros HT',
    features: [
      'Page web prsonnalisée',
      'Gestion de la ralation client',
      'Tableau de board intégré',
      'Messagerie sécurisée',
      'Synchronisation automatique de vos agendas et prise de rendez-vous',
      'Factures automatiques',
      'Jusqu`s a 3 fromulaires de suivi',
      'Jusqu`s a 50H de vidéconférence mensuelles',
      'Jusqu`s a 3 produits dans lat Boutique en ligne',
    ],
  },

  {
    id: '3',
    title: 'Pro',
    price: '59 euros HT',
    features: [
      'Page web prsonnalisée',
      'Gestion de la ralation client',
      'Tableau de board intégré',
      'Messagerie sécurisée',
      'Synchronisation automatique de vos agendas et prise de rendez-vous',
      'Factures automatiques',
      'Jusqu`s a 6 fromulaires de suivi',
      'Jusqu`s a 100H de vidéconférence mensuelles',
      'Jusqu`s a 6 produits dans lat Boutique en ligne',
    ],
  },
  {
    id: '4',
    title: 'Master',
    price: '150 euros HT',
    features: [
      'Page web prsonnalisée',
      'Gestion de la ralation client',
      'Tableau de board intégré',
      'Messagerie sécurisée',
      'Synchronisation automatique de vos agendas et prise de rendez-vous',
      'Factures automatiques',
      'Formulaires de suivi illimitée et modifications illimtée',
      'Vidéoconférences illimitée',
      'Produits illimités Boutique en ligne',
    ],
  },
];
