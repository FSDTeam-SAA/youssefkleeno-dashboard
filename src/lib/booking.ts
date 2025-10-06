import { BookingResponse } from "@/types/bookingDataType"

export async function getBooking(token: string, currentPage: number, limit: number, bookingType: string): Promise<BookingResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking?bookingType=${bookingType}&page=${currentPage}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
    const resData = await response.json()
    if (!response.ok) {
        throw new Error(resData.message || "Failed to get booking")
    }
    return resData
}
