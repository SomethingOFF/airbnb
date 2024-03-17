"use client";
import { Reservation, User } from "@prisma/client";
import React, { useCallback, useEffect, useState } from "react";
import Container from "../components/Container";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
interface TripsClientProps {
  reservations: Reservation[];
  user?: User | null;
}

const TripsClient: React.FC<TripsClientProps> = ({ user, reservations }) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");
  const onCancle = useCallback(
    (id: string) => {
      setDeleteId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeleteId("");
        });
    },
    [router]
  );
  useEffect(() => {
    router.refresh();
  }, []);
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className=" mt-10 grid  grid-cols-1  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancle}
            disabled={deleteId === reservation.id}
            actionLabel="Cancel reservation"
            user={user}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
