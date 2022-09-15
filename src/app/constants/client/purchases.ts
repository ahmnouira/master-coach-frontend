import { DatableTableAction } from 'src/app/shared/datatable/action.model';

export const CLIENT_PURCHASES_DISPLAYED_COLUMNS = [

  {
    data: 'createdAt',
    value: 'date',
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
    data: 'price',
    value: 'total',
    type: 'text',
    search: true,
    sort: true,
  },
];

export const CLIENT_PURCHASES_ACTION_COLUMNS: DatableTableAction[] = [
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
        type: 'download',
        iconClass: 'download',
      },
    ],
  },
];
