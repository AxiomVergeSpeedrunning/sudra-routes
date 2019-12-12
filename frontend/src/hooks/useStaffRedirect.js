import React from 'react';
import { Redirect } from 'react-router-dom';
import { useObserver } from 'mobx-react';

import urls from 'urls';
import useGlobalContext from './useGlobalContext';

const useStaffRedirect = () => {
  const store = useGlobalContext();

  return useObserver(() => () => {
    if (store.userInfo.isStaff) {
      return null;
    }

    return <Redirect to={urls.login} />;
  });
};

export default useStaffRedirect;
