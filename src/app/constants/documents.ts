import { DatableTableAction } from '../shared/data-table/action.model';

export const COACH_DOCS_DISPLAYED_COLUMNS = [
  {
    data: '_id',
    value: 'ref',
    type: 'text',
    search: true,
    sort: true,
  },
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
