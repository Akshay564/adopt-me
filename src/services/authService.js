class AuthService {
  constructor() {
    this.token = null;
    this.tokenExpiry = null;
    this.tokenPromise = null;
  }

  async getToken() {
    if (this.token && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.token;
    }

    // If there's already a token fetch in progress, return that promise
    if (this.tokenPromise) {
      return this.tokenPromise;
    }

    // Start a new token fetch and cache the promise
    this.tokenPromise = this.fetchNewToken().finally(() => {
      this.tokenPromise = null; // Clear the promise when done
    });

    return this.tokenPromise;
  }

  async fetchNewToken() {
    try {
      const response = await fetch("/.netlify/functions/getToken", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }

      const data = await response.json();
      this.token = data.access_token;
      // Set token expiry to 5 minutes before actual expiry to ensure we don't use an expired token
      this.tokenExpiry = new Date(Date.now() + data.expires_in * 1000 - 300000);
      return this.token;
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  }
}

// Create a singleton instance
const authService = new AuthService();
export default authService;
