export interface PromoCode {
  _id: string;
  code: string;
  discountPrice: number;
  startDate: string;
  expiryDate: string;
  status: "active" | "inactive" | "expired";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PromoCodeResponse {
  success: boolean;
  message: string;
  data: PromoCode[];
}

export interface PromoCodeInput {
  code: string
  discountPrice: number
  startDate: Date
  expiryDate: Date
  status: string
}

export interface SinglePromocodeResponse {
  success: boolean;
  message: string;
  data: PromoCode;
}

export interface PromoCode {
  _id: string;
  code: string;
  discountPrice: number;
  startDate: string;   // ISO date string
  expiryDate: string;  // ISO date string
  status: "active" | "inactive" | "expired"; // limit to possible values
  createdAt: string;
  updatedAt: string;
  __v: number;
}
