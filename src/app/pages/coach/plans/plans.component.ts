import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan.model';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  plans: Plan[] = [
    {
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


  // monthly by default 
  monthly = true;

  constructor() {}

  ngOnInit(): void {}

  changeOffer(event: any) {
    this.monthly = !this.monthly;
    if (this.monthly) {
      this.plans[1].price = '29 euros HT';
      this.plans[2].price = '59 euros HT';
      this.plans[3].price = '150 euros HT';
    } else {
      this.plans[1].price = '19 euros HT';
      this.plans[2].price = '49 euros HT';
      this.plans[3].price = '140 euros HT';
    }
  }
}
