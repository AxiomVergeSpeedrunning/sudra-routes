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
    }, 800);

    return () => {
      clearInterval(intervalId);
    };
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('log')) {
      // eslint-disable-next-line
      console.log(info);
    }
  });

  return info;
};

export default useTrackerInformation;
