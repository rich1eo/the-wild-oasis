////////////////////////////////////////////////
// Cabins

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
  image: File | string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

export interface IDefaultCabinValues {
  created_at?: string | undefined;
  description: string | undefined;
  discount: string | undefined;
  id?: string;
  image: FileList | undefined;
  maxCapacity: string | undefined;
  name: string | undefined;
  regularPrice: string | undefined;
}

////////////////////////////////////////////////
// Settings

export interface ISettings {
  breakfastPrice: number;
  created_at?: string;
  id?: number;
  maxBookingGuestsPerBooking: number;
  maxBookingLength: number;
  minBookingLength: number;
}
