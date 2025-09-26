"use server"
const { readCookie } = require("@/utils/async/cookies");

export default async function proposeAction(prevState, formData) {
  const { userItemId, targetItemId, userId } = Object.fromEntries(formData);

  const accessToken = await readCookie('sh_access_token');

  const response = await fetch('http://localhost:4000/api/v1/requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      userid: userId,
      requestItem: targetItemId,
      offerItem: userItemId
    })
  });

  if (!response.ok) {
    return {
      success: false,
      errors: ['Could not send request. Try again later'],
    };
  }

  return { success: true };
}