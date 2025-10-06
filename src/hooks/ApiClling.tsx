import { getBooking } from "@/lib/booking";
import { getProfile, ProfileUpdatePayload, updateProfileInfo } from "@/lib/profileInfo";
import { addPromocode, deletePromocode, editPromocode, getPromocode, getSinglePromocode } from "@/lib/promocode";
import { getUser } from "@/lib/userMangement";
import { BookingResponse } from "@/types/bookingDataType";
import { PromoCodeInput, PromoCodeResponse, SinglePromocodeResponse } from "@/types/promoCodeDataType";
import { ProfileResponse } from "@/types/userDataType";
import { UsersResponse } from "@/types/userMangementDataType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useProfileQuery(token: string | undefined) {
    return useQuery<ProfileResponse>({
        queryKey: ["me"],
        queryFn: () => {
            if (!token) throw new Error("Token is missing")
            return getProfile(token)
        },
        enabled: !!token,
    })
}

export function useProfileInfoUpdate(token: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ProfileUpdatePayload) => updateProfileInfo(token, payload),
        onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries({ queryKey: ["me"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "Update failed");
            else toast.error("Update failed");
        },
    });
}

export function useGetPromocode(token: string | undefined, currentPage: number, limit: number) {
    return useQuery<PromoCodeResponse>({
        queryKey: ["promocode", currentPage, limit],
        queryFn: () => {
            if (!token) throw new Error("Token is missing")
            return getPromocode(token, currentPage, limit)
        },
        enabled: !!token,
    })
}

export function useAddPromocode(token: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: PromoCodeInput) => addPromocode(token, payload),
        onSuccess: () => {
            toast.success("Promocode added successfully");
            queryClient.invalidateQueries({ queryKey: ["promocode"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "Update failed");
            else toast.error("Update failed");
        },
    });
}

export function useEditPromocode(token: string, id: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: PromoCodeInput) => editPromocode(token, id, payload),
        onSuccess: () => {
            toast.success("Promocode added successfully");
            queryClient.invalidateQueries({ queryKey: ["promocode"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "Update failed");
            else toast.error("Update failed");
        },
    });
}

export function useGetSingelPromocode(token: string | undefined, id: string) {
    return useQuery<SinglePromocodeResponse>({
        queryKey: ["promocode"],
        queryFn: () => {
            if (!token) throw new Error("Token is missing")
            return getSinglePromocode(token, id)
        },
        enabled: !!token,
    })
}

export function useDeletePromocode(token: string, id: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deletePromocode(token, id),
        onSuccess: () => {
            toast.success("Promocode deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["promocode"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "Update failed");
            else toast.error("Update failed");
        },
    });
}


export function useGetBooking(token: string | undefined, currentPage: number, limit: number, bookingType: string) {
    return useQuery<BookingResponse>({
        queryKey: ["booking", currentPage, limit],
        queryFn: () => {
            if (!token) throw new Error("Token is missing")
            return getBooking(token, currentPage, limit, bookingType)
        },
        enabled: !!token,
    })
}

export function useGetUser(token: string | undefined, currentPage: number, limit: number, bookingType: string) {
    return useQuery<UsersResponse>({
        queryKey: ["user", currentPage, limit],
        queryFn: () => {
            if (!token) throw new Error("Token is missing")
            return getUser(token, currentPage, limit, bookingType)
        },
        enabled: !!token,
    })
}
