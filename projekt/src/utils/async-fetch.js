// Taget fra tidligere opgave.
export default async function asyncFetch(endpoint, options = {}) {
  try {
    const response = await fetch(`http://localhost:4000/api/v1/${endpoint}`, options);

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