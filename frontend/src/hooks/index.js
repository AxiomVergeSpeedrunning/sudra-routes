import { useContext } from 'react';
import { useObserver } from 'mobx-react';
import { GlobalContext } from 'contexts';

const useGlobalContext = () => useObserver(() => useContext(GlobalContext));

// eslint-disable-next-line
export { useGlobalContext };
