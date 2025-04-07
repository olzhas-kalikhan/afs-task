import { makeAutoObservable } from "mobx";

type User = {
  userName: string;
};

export class AuthStore {
  isAuthenticated = false;
  user: User | null = null;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setUser(user: User) {
    this.isAuthenticated = true;
    this.user = user;
  }
  reset() {
    this.isAuthenticated = false;
    this.user = null;
  }
}

export const authStore = new AuthStore();
