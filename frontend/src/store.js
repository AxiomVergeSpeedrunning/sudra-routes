import { decorate, observable, computed, action, flow } from 'mobx';
import api from 'api';
import Cookies from 'js-cookie';

class Store {
  userInfo = {};

  isAuthenticated = false;

  loading = true;

  useNav = true;

  checkAuthentication = flow(function*() {
    try {
      const { userInfo } = yield api.checkAuthentication();
      this.userInfo = userInfo;

      console.log(this.userInfo);
      this.isAuthenticated = true;
    } catch (e) {
      this.userInfo = {};
      this.isAuthenticated = false;
      Cookies.remove('authToken');
    } finally {
      this.loading = false;
    }
  });

  logout() {
    Cookies.remove('authToken');

    this.checkAuthentication();
  }

  get loaded() {
    return !this.loading;
  }
}

export default decorate(Store, {
  logout: action.bound,
  loaded: computed,
  userInfo: observable,
  isAuthenticated: observable,
  loading: observable,
  useNav: observable,
  checkAuthentication: action,
});
