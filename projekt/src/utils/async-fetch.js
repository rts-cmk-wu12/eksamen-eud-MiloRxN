// Taget fra tidligere opgave.
export default async function asyncFetch(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Der opstod en fejl");
    }

    if (!response.headers.get("content-type").includes("application/json")) {
      throw new Error("Body er ikke JSON")
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}