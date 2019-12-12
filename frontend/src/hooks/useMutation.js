import { useMutation as baseHook } from '@apollo/react-hooks';

const useMutation = (query, options = {}) => {
  const [baseUpdater, ...rest] = baseHook(query, options);

  return [data => baseUpdater({ variables: { input: data } }), ...rest];
};

export default useMutation;
