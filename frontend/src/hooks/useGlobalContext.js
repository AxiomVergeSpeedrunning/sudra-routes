import { useContext } from 'react';
import { useObserver } from 'mobx-react';
import { GlobalContext } from 'contexts';

const useGlobalContext = () => useObserver(() => useContext(GlobalContext));

export default useGlobalContext;
