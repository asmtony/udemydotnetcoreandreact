import { observable, computed, values, action } from "mobx";
import { IUser, IUserFormValues } from "../models/users";
import { act } from "react-dom/test-utils";
import agent from "../api/agent";

export default class UserStore {
  @observable user: IUser | null = null;

  @computed get isLoggedIn() { return !!this.user }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.user.login(values);
      this.user = user;
    } catch (error) {
      console.log(error);
    }
  }
}