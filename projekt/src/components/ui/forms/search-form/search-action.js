// Taget fra tidligere projekt.
"use server";

export default async function SearchAction(prevState, formData) {
  console.log(formData);
  const { keyword } = Object.fromEntries(formData)


  //Validering?

  const response = await fetch(`${process.env.API_BASE_URL}/activities`)
  if (!response.ok) {
    return {
      status: "NÆH!"
    }
  }

  const json = await response.json()


  // const filteredData = json.filter(activity => (activity.name.toLowerCase().includes(keyword.toLowerCase())
  //   || activity.description.toLowerCase().includes(keyword.toLowerCase())
  //   || activity.weekday.toLowerCase().includes(keyword.toLowerCase())
  //   || activity.time === keyword
  //   || (activity.minAge <= keyword && activity.maxAge >= keyword)));

  // console.log(filteredData);

  const fileteredData = json.filter(activity => {
    if (activity.name.toLowerCase().includes(keyword.toLowerCase())) return activity;
    if (activity.description.toLowerCase().includes(keyword.toLowerCase())) return activity;
    if (activity.weekday.toLowerCase().includes(keyword.toLowerCase())) return activity;
    if (activity.time.toLowerCase() === keyword.toLowerCase()) return activity;
    if (activity.minAge <= keyword && activity.maxAge >= keyword) return activity;
  })

  console.log(fileteredData)
}