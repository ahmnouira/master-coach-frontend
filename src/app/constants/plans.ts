import { PlanType } from '../models/plan.enum';
import { Plan } from '../models/plan.model';

export const FREE_MONTHLY_PLAN_ID = 'm-1';
export const FREE_ANNUAL_PLAN_ID = 'a-1';

export const PLANS_MONTHLY: Plan[] = [
  {
    id: FREE_MONTHLY_PLAN_ID,
    title: `Offer libre\nValable toute l'année`,
    price: '0 euros HT',

    features: [
      'Page web prsonnalisée',
      'Référencement de votre profil avec un rayonnment optimal',
      'Messagerie sécurisée',
      'Synchronisation automatique de vos agendas et prise de rendez-vous',
      'Factures automatiques',
      'Gestion de la ralation client',
      'Jusqu`s a 3 fromulaires de suivi',
      'Jusqu`s a 50H de vidéconférence mensuelles',
      'Jusqu`s a 3 produits dans lat Boutique en ligne',
    ],
    type: PlanType.Monthly,
  },

  {
    id: 'm-2',
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
    type: PlanType.Monthly,
  },

  {
    id: 'm-3',
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

    type: PlanType.Monthly,
  },
  {
    id: 'm-4',
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
    type: PlanType.Monthly,
  },
];

export const PLANS_ANNUAL: Plan[] = [
  {
    id: FREE_ANNUAL_PLAN_ID,
    title: `Offer libre\nValable toute l'année`,
    price: '0 euros HT',
    features: [
      'Page web prsonnalisée',
      'Référencement de votre profil avec un rayonnment optimal',
      'Messagerie sécurisée',
      'Synchronisation automatique de vos agendas et prise de rendez-vous',
      'Factures automatiques',
      'Gestion de la ralation client',
      'Jusqu`s a 3 fromulaires de suivi',
      'Jusqu`s a 50H de vidéconférence mensuelles',
      'Jusqu`s a 3 produits dans lat Boutique en ligne',
    ],
    type: PlanType.Annual,
  },

  {
    id: 'a-2',
    title: 'Initiation',
    price: `${19 * 12} euros HT`,
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
    type: PlanType.Annual,
  },

  {
    id: 'a-3',
    title: 'Pro',
    price: `${49 * 12} euros HT`,
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
    type: PlanType.Annual,
  },
  {
    id: 'a-4',
    title: 'Master',
    price: `${140 * 12} euros HT`,
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
    type: PlanType.Annual,
  },
];
