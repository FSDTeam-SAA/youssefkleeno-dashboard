export interface UsersResponse {
    success: boolean;
    message: string;
    data: User[];
}

export interface User {
    _id: string;
    name: string;
    email: string;
    avatar: {
        public_id: string;
        url: string;
    };
    lastActive: string; // ISO date string
    createdAt: string;  // ISO date string
    updatedAt: string;  // ISO date string
    __v: number;
    city: string;
    state: string;
    street: string;
    zip: string;
    phone: string;
}
