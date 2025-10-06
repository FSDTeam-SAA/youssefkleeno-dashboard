import { UsersResponse } from "@/types/userMangementDataType"

export async function getUser(token: string, currentPage: number, limit: number, userType: string): Promise<UsersResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/all-user?type=${userType}&page=${currentPage}&limit=${limit}`, {
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
