import { ProfileResponse } from "@/types/userDataType";

export async function getProfile(token: string): Promise<ProfileResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get profile")
  }
  return resData
}

export interface ProfileUpdatePayload {
  name: string;
  email: string;
  phone: string;
  dob: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  avatar?: File;
}

export async function updateProfileInfo(token: string, payload: ProfileUpdatePayload) {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  console.log(payload)
  formData.append("phone", payload.phone);
  formData.append("dob", payload.dob);
  formData.append("street", payload.street);
  formData.append("city", payload.city);
  formData.append("state", payload.state);
  formData.append("zip", payload.zip);
  if(payload.avatar) formData.append("avatar", payload.avatar);
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update-profile`, {
    method: "PATCH",
    headers: {
  
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to update profile");
  return resData;
}

