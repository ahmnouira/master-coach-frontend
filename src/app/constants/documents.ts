import { DatableTableAction } from '../shared/datatable/action.model';

export const COACH_DOCS_DISPLAYED_COLUMNS = [
  
  {
    data: 'title',
    value: 'titre',
    type: 'text',
    search: true,
    sort: true,
  },
  {
    data: 'type',
    value: 'type',
    type: 'text',
    search: true,
    sort: true,
  },
  {
    data: 'category',
    value: 'Catégory',
    type: 'text',
    search: true,
    sort: true,
  },
];

export const COACH_DOCS_ACTION_COLUMNS: DatableTableAction[] = [
  {
    value: '',
    children: [
      {
        type: 'view',
        iconClass: 'view',
      },
    ],
  },
  {
    value: '',
    children: [
      {
        type: 'edit',
        iconClass: 'edit',
      },
    ],
  },
  {
    value: '',
    children: [
      {
        type: 'delete',
        iconClass: 'delete',
      },
    ],
  },
];

export const COACH_DOCS_FILTERS_TYPES = [
  {
    _id: '1',
    name: 'Achat',
  },
  {
    _id: '2',
    name: 'Réservation',
  },
];

export const COACH_DOCS_FILTERS_WITH = [
  {
    _id: '1',
    name: 'Coach',
  },
  {
    _id: '2',
    name: 'Client',
  },
];
