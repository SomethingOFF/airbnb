import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import useLoginModel from "../hooks/useLoginModel";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

const page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return <EmptyState title="Unauthorized" subTitle="Please login" />;
  }
  const reservations = await getReservations({ authorId: user.id });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subTitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return (
    <>
      <ReservationsClient reservations={reservations} user={user} />
    </>
  );
};

export default page;
