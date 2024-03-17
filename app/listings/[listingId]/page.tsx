
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingsById from "@/app/actions/getListingsById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const listing = await getListingsById(params);
  const user = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }
  return <ListingClient listing={listing} user={user} />;
};

export default page;
