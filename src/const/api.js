import httpClient from "./httpClient";
import polyfilledEventSource from '@sanity/eventsource/browser'

const Api = {
  Auth: {
    async signIn({ login, password }) {
      return httpClient.post("/auth/signin", {
        login: login,
        password: password,
      });
    },

    async signUp({ login, password }) {
      return httpClient.post("/auth/signup", {
        login: login,
        password: password,
      });
    },
  },

  Rewards: {
    async getOwnedRewards() {
      return httpClient.get("/reward/owned");
    },
  },

  Game: {
    async getCurrentGame() {
      return httpClient.get("/game");
    },

    async openLootbox(lootboxId) {
      return httpClient.post("/game/open-lootbox", { lootboxId });
    },
  },

  Sse: {
    getEventSource() {
      return new polyfilledEventSource(`${import.meta.env.VITE_API_URL}/sse`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
          "x-refresh-token": window.localStorage.getItem("refreshToken")
        },
      });
    },

    getConnectedUsers() {
      return httpClient.get("/sse/connected-users");
    },
  },
};

export default Api;
