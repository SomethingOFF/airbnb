import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";


import useLoginModel from "./useLoginModel";
import { User } from "@prisma/client";

interface UseFavorite {
    listingId: string;
    user?: User | null
}

const useFavorite = ({ listingId, user }: UseFavorite) => {
    const router = useRouter()
    const loginModel = useLoginModel()
    const hasFavorited = useMemo(() => {
        const list = user?.favoriteIds || []
        return list.includes(listingId)
    }, [user, listingId])
    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        if (!user) {
            return loginModel.onOpen()
        }
        try {
            let request;
            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success('Success');
        } catch (error) {
            toast.error('Something went wrong.');
        }
    }, [user, hasFavorited, listingId, loginModel, router])
    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default useFavorite;