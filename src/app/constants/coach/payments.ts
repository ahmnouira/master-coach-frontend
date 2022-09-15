import { DatableTableAction } from '../../shared/datatable/action.model';

export const COACH_PAYMENTS_DISPLAYED_COLUMNS = [
  {
    data: 'description',
    value: "type d'abonnement",
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
    value: 'Date',
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
