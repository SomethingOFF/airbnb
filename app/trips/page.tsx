import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";
import useLoginModel from "../hooks/useLoginModel";

const page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return <EmptyState title="Unauthorized" subTitle="Please login" />;
  }
  const reservations = await getReservations({ userId: user.id });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subTitle="Looks like you havent reserved any trips."
      />
    );
  }
  console.log(reservations.length);
  return <TripsClient reservations={reservations} user={user} />;
};

export default page;
