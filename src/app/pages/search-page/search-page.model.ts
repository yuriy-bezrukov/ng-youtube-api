import { ITab } from '../../shared/modules/tabs/tabs.model';

export enum Tab {
    all = 'all',
    favorites = 'favorites'
}

export const Tabs: ITab<Tab>[] = [
    { id: Tab.all, name: 'All' },
    { id: Tab.favorites, name: 'Favorites' }
  ];