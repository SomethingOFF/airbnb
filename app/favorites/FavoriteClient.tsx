import { Listing, User } from "@prisma/client";
import React from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
interface FavoriteClientProps {
  listings: Listing[];
  user: User | null;
}
const FavoriteClient: React.FC<FavoriteClientProps> = ({ listings, user }) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div className=" mt-10 grid  grid-cols-1  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
        {listings.map((listing: any) => (
          <ListingCard user={user} key={listing.id} data={listing} />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;
