import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useStaffRedirect } from 'hooks';
import urls from 'urls';

import EditPage from './EditPage';

const CREATE_TUTORIAL = gql`
  mutation CreateTutorial($input: CreateTutorialInput!) {
    createTutorial(input: $input) {
      tutorial {
        id
        title
        content
      }
    }
  }
`;

const Create = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [createTutorial] = useMutation(CREATE_TUTORIAL, {
    onCompleted: () => history.push(urls.tutorials.root),
    onError: error => {
      // eslint-disable-next-line
      console.log(error);

      enqueueSnackbar('Something went wrong! Please contact Mark.', { variant: 'error' });
    },
  });

  const Redirect = useStaffRedirect();

  const onSubmit = () => {
    if (!title || !content) {
      enqueueSnackbar('Please fill out both fields', { variant: 'error' });
      return;
    }

    try {
      setLoading(true);
      createTutorial({ variables: { input: { title, content } } });
    } finally {
      setLoading(false);
    }
  };

  const pageProps = {
    title,
    setTitle,
    content,
    setContent,
    loading,
    onSubmit,
  };

  return (
    <>
      <Redirect />
      <EditPage {...pageProps} />
    </>
  );
};

export default observer(Create);
