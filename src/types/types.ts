export interface ICabin {
  created_at?: string | null;
  description: string | null;
  discount: number | null;
  id?: number;
  image: string | null;
  maxCapacity: number | null;
  name: string | null;
  regularPrice: number | null;
}

export interface INewCabin {
  created_at?: string;
  description: string;
  discount: number;
  id?: number;
  image: File;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}
