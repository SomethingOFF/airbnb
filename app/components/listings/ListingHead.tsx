"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import Heading from "../Heading";
import useCountry from "@/app/hooks/useCountry";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  user?: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  user,
}) => {
  const { getByValue } = useCountry();
  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className=" w-full h-[60vh] overflow-hidden  rounded-xl relative">
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div className=" absolute top-5 right-5">
          <HeartButton listingId={id} user={user} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
