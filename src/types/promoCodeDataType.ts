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

export interface PromoCodePagination {
  promoCodes: PromoCode[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PromoCodeResponse {
  success: boolean;
  message: string;
  data: PromoCodePagination;
}

export interface PromoCodeInput {
  code: string;
  discountPrice: number;
  startDate: Date;
  expiryDate: Date;
  status: string;
}

export interface SinglePromocodeResponse {
  success: boolean;
  message: string;
  data: PromoCode;
}
