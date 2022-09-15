import { DatableTableAction } from '../../shared/datatable/action.model';

export const COACH_PAYMENTS_DISPLAYED_COLUMNS = [
  {
    data: 'description',
    value: 'type',
    type: 'text',
    search: true,
    sort: true,
  },
  {
    data: 'amount',
    value: 'amount',
    type: 'text',
    search: true,
    sort: true,
  },
  {
    data: 'createdAt',
    value: 'Debut',
    type: 'text',
    search: true,
    sort: true,
  },
];

export const COACH_PAYMENTS_ACTION_COLUMNS: DatableTableAction[] = [

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
