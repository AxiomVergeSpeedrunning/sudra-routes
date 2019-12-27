import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useStaffRedirect } from 'hooks';
import urls from 'urls';

import EditPage from 'components/EditPage';

const GET_TUTORIAL = gql`
  query Tutorial($id: ID!) {
    tutorial(id: $id) {
      id
      title
      content
    }
  }
`;

const UPDATE_TUTORIAL = gql`
  mutation updateTutorial($id: ID!, $input: PatchTutorialInput!) {
    updateTutorial(id: $id, input: $input) {
      tutorial {
        id
        title
        content
      }
    }
  }
`;

const Edit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [updateTutorial] = useMutation(UPDATE_TUTORIAL, {
    onCompleted: () => history.push(urls.tutorials.root),
    onError: error => {
      // eslint-disable-next-line
      console.log(error);

      enqueueSnackbar('Something went wrong! Please contact Mark.', { variant: 'error' });
    },
  });

  const { data, loading: queryLoading } = useQuery(GET_TUTORIAL, { variables: { id: Number(id) } });
  const Redirect = useStaffRedirect();

  useEffect(() => {
    if (queryLoading) {
      return;
    }

    const { tutorial } = data;

    setTitle(tutorial.title);
    setContent(tutorial.content);
  }, [data, queryLoading]);

  if (queryLoading) {
    return null;
  }

  const onSubmit = () => {
    if (!title || !content) {
      enqueueSnackbar('Please fill out both fields', { variant: 'error' });
      return;
    }

    try {
      setLoading(true);
      updateTutorial({ variables: { id, input: { title, content } } });
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

export default observer(Edit);
