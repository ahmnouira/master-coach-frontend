import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boutique-add',
  templateUrl: './boutique-add.component.html',
  styleUrls: ['./boutique-add.component.scss']
})
export class BoutiqueAddComponent implements OnInit {

  form: any = {};

  categories = []

  settings  ={}
  constructor() {}

  ngOnInit(): void {

    this.settings = {
      text: 'Coaching de carriére...',
      position: 'bottom',
      autoPosition: false,
      searchPlaceholderText: 'Rechercher...',
      filterSelectAllText: 'Sélectionner tous les résultats filtrés',
      filterUnSelectAllText: 'Désélectionner tous les résultats filtrés',
      selectAllText: 'Sélectionner tout',
      unSelectAllText: 'Désélectionner tout',
      noDataLabel: 'Aucune donnée disponible',
      enableSearchFilter: true,
      labelKey: 'name',
      primaryKey: '_id',
      classes: 'form-control element-spec multiselect',
    };
   
    
  }

  addPhoto(event) {

  }

  save() {

  }

  
}
