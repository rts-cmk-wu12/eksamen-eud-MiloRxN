import SearchSort from "@/components/pages/frontpage/search-sort";
import ListingsProvider from "@/components/pages/frontpage/provider";
import Card from "@/components/ui/card";
import Grid from "@/components/pages/frontpage/grid";
import asyncFetch from "@/utils/async/async-fetch";

export const metadata = {
  title: "Frontpage"
};

export default async function Home() {

  const products = await asyncFetch("listings")
  // console.log(products)

  return (
    <>
      <ListingsProvider products={products} productsPerPage={6}>
        <SearchSort />
        <Grid pagination={true} columns={3}>
          <Card />
        </Grid>
      </ListingsProvider>
    </>
  );
}
