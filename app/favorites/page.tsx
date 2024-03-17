import React from "react";
import getFavoriteListings from "../actions/getFavoriteListings";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import FavoriteClient from "./FavoriteClient";

const page = async () => {
  const listings = await getFavoriteListings();
  const user = await getCurrentUser();
  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Favorite Found!"
        subTitle="Looks like you have no favorite listings!"
      />
    );
  }
  return <FavoriteClient listings={listings} user={user} />;
};

export default page;
