import { DatableTableAction } from '../../shared/datatable/action.model';

export const CLIENT_DOCS_DISPLAYED_COLUMNS = [

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

export const CLIENT_DOCS_ACTION_COLUMNS: DatableTableAction[] = [
  {
    value: '',
    children: [
      {
        type: 'view',
        iconClass: 'view',
      },
    ],
  },
];

export const CLIENT_DOCS_FILTER_STATUS = [
  {
    _id: '1',
    name: 'En attente',
  },
  {
    _id: '2',
    name: 'Clos',
  },
];

export const CLIENT_DOCS_FILTER_THEMATIC = [
  {
    _id: '1',
    name: 'Quiz',
  },
  {
    _id: '2',
    name: 'Support de formation',
  },
];
