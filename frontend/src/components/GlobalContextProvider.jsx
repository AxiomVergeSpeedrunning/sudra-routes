import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { GlobalContext } from 'contexts';
import Store from 'store';

const store = new Store();

const GlobalContextProvider = ({ children }) => {
  useEffect(() => {
    store.checkAuthentication();
  }, []);

  if (store.loading) {
    return null;
  }
  return <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>;
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default observer(GlobalContextProvider);
