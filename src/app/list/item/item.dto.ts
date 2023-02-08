export interface Item {
  name: string;
  year_built?: number;
  type?: string;
  home_port?: string;
  weight_kg?: number;
  missions: Mission[];
}

export interface Mission {
  name: string;
}

export type ItemQuery = {
  ships: Item[];
  loading: boolean;
};
