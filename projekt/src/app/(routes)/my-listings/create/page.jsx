import ListingForm from "@/components/pages/my-listings/form";

export const metadata = { title: "Create Listing" };

export default function CreateListingPage() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="sr-only">Create Listing</h1>
      <ListingForm mode="create" />
    </div>
  );
}