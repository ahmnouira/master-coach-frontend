import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() model: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() onItemOneSelect = new EventEmitter<any>();
  @Input() label: string = '';
  @Input() name?: string = '';

  @Input() text?: string = 'Sélectionner...';

  @Input() data: any;

  @Input() singleSelection = false;

  @Input() disableMargin = false;

  settings: {};

  constructor() {}

  ngOnInit(): void {
    this.name = this.name ?? this.label.toLowerCase();
    this.settings = {
      text: this.text,
      singleSelection: this.singleSelection,
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

  handleItemSelect(item: any) {
    const { _id, name } = item;
    this.onItemOneSelect.emit(name);
  }
}
