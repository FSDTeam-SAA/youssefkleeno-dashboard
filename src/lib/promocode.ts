import { PromoCodeInput, PromoCodeResponse, SinglePromocodeResponse } from "@/types/promoCodeDataType"

export async function getPromocode(token: string, currentPage: number, limit: number): Promise<PromoCodeResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/promo-code?page=${currentPage}&limit=${limit}`, {
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

export async function addPromocode(token: string, payload: PromoCodeInput) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/promo-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to add promocdoe");
  return resData;
}

export async function editPromocode(token: string, id: string, payload: PromoCodeInput) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/promo-code/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to add promocdoe");
  return resData;
}

export async function getSinglePromocode(token: string, id: string): Promise<SinglePromocodeResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/promo-code/${id}`, {
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

export async function deletePromocode(token: string, id: string) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/promo-code/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to delete promocdoe");
  return resData;
}
