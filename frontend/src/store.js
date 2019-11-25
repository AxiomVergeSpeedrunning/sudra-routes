import { observable, computed, action, flow } from 'mobx';
import api from 'api';
import Cookies from 'js-cookie';

class Store {
  @observable userInfo = {};

  @observable isAuthenticated = false;

  @observable loading = true;

  @observable useNav = true;

  checkAuthentication = flow(function*() {
    this.loading = true;

    try {
      const { userInfo } = yield api.checkAuthentication();

      this.userInfo = userInfo;
      this.isAuthenticated = true;
    } catch (e) {
      this.userInfo = {};
      this.isAuthenticated = false;
      Cookies.remove('authToken');
    } finally {
      this.loading = false;
    }
  });

  @action.bound
  logout() {
    Cookies.remove('authToken');

    this.checkAuthentication();
  }

  @computed get loaded() {
    return !this.loading;
  }
}

export default Store;
