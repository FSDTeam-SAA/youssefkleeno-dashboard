export interface BookingResponse {
  success: boolean;
  message: string;
  data: {
    bookings: Booking[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Booking {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  bookingType: string;
  licensePlate: string;
  vehicle: {
    _id: string;
  };
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  dates: BookingDate[];
  price: number;
  payment_status: "pending" | "paid" | "failed" | string; 
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BookingDate {
  _id: string;
  date: string; // ISO date string
  slot: string;
  wash_type: {
    _id: string;
    serviceName: string;
  };
}
