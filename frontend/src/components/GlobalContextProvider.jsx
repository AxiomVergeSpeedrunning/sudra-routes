import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { GlobalContext } from 'contexts';
import { useLocation } from 'react-router-dom';
import Store from 'store';

const store = new Store();
store.checkAuthentication();

const GlobalContextProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    store.checkAuthentication();
  }, [location]);

  return <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>;
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default observer(GlobalContextProvider);
