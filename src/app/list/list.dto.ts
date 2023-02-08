import { Item } from './item/item.dto';

export interface ListItem {
  name: string;
  id: string;
  year_built?: number;
  type?: string;
}

export type ListQuery = {
  ships: ListItem[];
  shipsResult: {
    result: {
      totalCount: number;
    };
  };
  loading: boolean;
};

export type HomePortsQuery = {
  ships: Item[];
  loading: boolean;
};
