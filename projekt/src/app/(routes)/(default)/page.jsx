import asyncFetch from "@/utils/async-fetch";

export const metadata = {
  title: "Frontpage"
};

export default async function Home() {

  const data = await asyncFetch("listings")
  console.log(data)

  return (
    <>
    <div className="grid grid-cols-3 grid-rows-2">
      
    </div>
    </>
  );
}
