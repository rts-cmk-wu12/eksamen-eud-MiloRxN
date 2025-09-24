import ListingsProvider from "@/components/providers/listings-provider";
import Card from "@/components/ui/cards/listings-card";
import ListingsSearchSort from "@/components/ui/forms/search-sort";
import Grid from "@/components/ui/grid";
import asyncFetch from "@/utils/async-fetch";

export const metadata = {
  title: "Frontpage"
};

export default async function Home() {

  const products = await asyncFetch("listings")
  // console.log(products)

  return (
    <>
      <ListingsProvider products={products} productsPerPage={6}>
        <ListingsSearchSort />
        <Grid pagination={true} columns={3}>
          <Card />
        </Grid>
      </ListingsProvider>
    </>
  );
}
