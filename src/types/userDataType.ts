export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    avatar: {
      public_id: string;
      url: string;
    };
    _id: string;
    name: string;
    phone: string;
    email: string;
    dob: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    lastActive: string;  // ISO date string
    createdAt: string;   // ISO date string
    updatedAt: string;   // ISO date string
    __v: number;
  };
}
