import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return <EmptyState title="Unauthorized" subTitle="Please login" />;
  }
  const listings = await getListings({ userId: user.id });
  if (!listings || listings?.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subTitle="Looks like you have no properties."
      />
    );
  }
  return <PropertiesClient listings={listings} user={user} />;
};

export default page;
