// Taget fra tidligere opgave.
export default async function asyncFetch(endpoint, options = {}) {
  try {
    const response = await fetch(`http://localhost:4000/api/v1/${endpoint}`, options);

    if (!response.ok) {
      throw new Error('Endpoint not found');
    }

    if (!response.headers.get('content-type').includes('application/json')) {
      throw new Error('Recieved content is not JSON');
    }

    return await response.json();

  } catch (error) {
    throw error;
  }
}