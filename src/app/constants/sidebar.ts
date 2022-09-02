import { SidebarItem } from '../types/sidebar-item.type';

export const COACH_SIDEBAR: SidebarItem[] = [
  {
    icon: 'assets/img/common/account%20(2).svg',
    route: '/pages/coach/profil',
    title: 'Tableau de board',
  },
  {
    icon: 'assets/img/common/customer%20(5).svg',
    route: '/pages/coach/services',
    title: 'Mes Services',
  },
  {
    icon: 'assets/img/common/clothing-store.svg',
    route: '/pages/coach/boutique',
    title: 'Ma boutique',
  },

  {
    icon: 'assets/img/common/deadline.svg',
    route: '/pages/coach/calendar',
    title: 'Mes rendez-vous',
  },
  {
    icon: 'assets/img/common/rating%20(1).svg',
    route: '/pages/coach/coach-client',
    title: 'Mes clients',
  },

  {
    icon: 'assets/img/common/presentation%20(2).svg',
    route: '/pages/coach/payments',
    title: 'Paiements',
  },

  {
    icon: 'assets/img/common/chatting%20(1).svg',
    route: '/pages/conversations',
    title: 'Messagerie',
  },
  {
    icon: 'assets/img/common/file%20(5).svg',
    route: '/pages/coach/documents',
    title: 'Mes documents',
  },
];


export const CLIENT_SIDEBAR: SidebarItem[] = [
  {
    icon: 'assets/img/common/account%20(2).svg',
    route: '/pages/client/profil',
    title: 'Tableau de board',
  },
  {
    icon: 'assets/img/common/edit.svg',
    route: '/pages/client/coach-list',
    title: 'Trouver un coach',
  },
  {
    icon: 'assets/img/common/deadline.svg',
    route: '/pages/client/rdv/list',
    title: 'Mes rendez-vous',
  },

  {
    icon: 'assets/icon/shopping-cart.svg',
    route: '/pages/client/purchases',
    title: 'Mes achats',
  },
  {
    icon: 'assets/img/common/chatting%20(1).svg',
    route: '/pages/conversations',
    title: 'Messagerie',
  },

  {
    icon: 'assets/img/common/file%20(5).svg',
    route: '/pages/client/docs',
    title: 'Mes outils de suivi',
  },
  {
    icon: 'assets/img/common/clothing-store.svg',
    route: '/pages/client/library',
    title: 'Ma bibliothèque',
  },
];

