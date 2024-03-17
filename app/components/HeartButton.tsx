"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";

import ClientOnly from "./ClientsOnly";
import React from "react";
import { User } from "@prisma/client";

interface HeartButtonProps {
  listingId: string;
  user?: User | null;
}
const HeartButton: React.FC<HeartButtonProps> = ({user ,listingId}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    user,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
