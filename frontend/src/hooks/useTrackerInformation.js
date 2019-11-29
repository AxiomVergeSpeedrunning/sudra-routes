import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from 'api';
import useGlobalContext from './useGlobalContext';

const useTrackerInformation = () => {
  const store = useGlobalContext();
  const [info, setInfo] = useState({});
  const { uid } = useParams();

  // Disable all of the fancy layout stuff on this page
  useEffect(() => {
    store.useNav = false;

    return () => {
      store.useNav = true;
    };
  });

  // Refresh the information at regular intervals
  useEffect(() => {
    const intervalId = setInterval(() => {
      api.getTrackerInfo({ uid }).then(data => setInfo(data));
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return info;
};

export default useTrackerInformation;
