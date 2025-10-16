export async function handler() {
  console.log("Environment check:", {
    hasClientId: !!process.env.PETFINDER_CLIENT_ID,
    hasSecret: !!process.env.PETFINDER_SECRET,
  });

  try {
    const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: process.env.PETFINDER_CLIENT_ID,
        client_secret: process.env.PETFINDER_SECRET,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Petfinder API error:", data);
      throw new Error(data.detail || "Failed to fetch token");
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: data.access_token,
        expires_in: data.expires_in,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch token" }),
    };
  }
}
