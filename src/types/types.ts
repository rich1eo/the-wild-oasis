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

export type IUpdateSetting = {
  [key in SettingFieldType as string]: number;
};

export type SettingFieldType =
  | 'breakfastPrice'
  | 'maxBookingGuestsPerBooking'
  | 'maxBookingLength'
  | 'minBookingLength';

////////////////////////////////////////////////
// Bookings

export interface IBooking {
  cabinId: number | null;
  cabinPrice: number | null;
  created_at: string | null;
  endDate: string | null;
  extrasPrice: number | null;
  guestId: number | null;
  hasBreakfast: boolean | null;
  id: number;
  isPaid: boolean | null;
  numGuests: number | null;
  numNights: number | null;
  observations: string | null;
  startDate: string | null;
  status: string | null;
  totalPrice: number | null;
  cabins: {
    name: string;
  };
  guests: {
    fullName: string;
    email: string;
  };
}

export interface IUpdateBookings {
  cabinId?: number | null;
  cabinPrice?: number | null;
  created_at?: string | null;
  endDate?: string | null;
  extrasPrice?: number | null;
  guestId?: number | null;
  hasBreakfast?: boolean | null;
  id?: number;
  isPaid?: boolean | null;
  numGuests?: number | null;
  numNights?: number | null;
  observations?: string | null;
  startDate?: string | null;
  status?: string | null;
  totalPrice?: number | null;
}

export interface IBookingDetails {
  cabinId: number | null;
  cabinPrice: number | null;
  created_at: string | null;
  endDate: string | null;
  extrasPrice: number | null;
  guestId: number | null;
  hasBreakfast: boolean | null;
  id: number;
  isPaid: boolean | null;
  numGuests: number | null;
  numNights: number | null;
  observations: string | null;
  startDate: string | null;
  status: string | null;
  totalPrice: number | null;
  cabins: ICabin;
  guests: IGuest;
}

// Guests

export interface IGuest {
  countryFlag: string | null;
  created_at: string | null;
  email: string | null;
  fullName: string | null;
  id: number;
  nationalID: string | null;
  nationality: string | null;
}

////////////////////////////////////////////////
// Sort/Filter Options

export interface IOption {
  value: string;
  label: string;
}

export type CabinSortFieldType = keyof ICabin;

////////////////////////////////////////////////
// Sort/Filter Bookings

export interface IFilterBookings {
  field: string;
  value: string;
  method?: string;
}

export interface ISortBookings {
  field: string;
  direction: string;
}
