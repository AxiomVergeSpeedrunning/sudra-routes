import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useStaffRedirect } from 'hooks';
import urls from 'urls';

import EditPage from 'components/EditPage';

const GET_ROUTE = gql`
  query Route($id: ID!) {
    route(id: $id) {
      id
      title
      content
    }
  }
`;

const UPDATE_ROUTE = gql`
  mutation updateRoute($id: ID!, $input: PatchRouteInput!) {
    updateRoute(id: $id, input: $input) {
      route {
        id
        title
        content

        category {
          id
        }
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

  const [updateRoute] = useMutation(UPDATE_ROUTE, {
    onCompleted: () => history.push(`${urls.routes.view}${id}/`),
    onError: error => {
      // eslint-disable-next-line
      console.log(error);

      enqueueSnackbar('Something went wrong! Please contact Mark.', { variant: 'error' });
    },
  });

  const { data, loading: queryLoading } = useQuery(GET_ROUTE, { variables: { id: Number(id) } });
  const Redirect = useStaffRedirect();

  useEffect(() => {
    if (queryLoading) {
      return;
    }

    const { route } = data;

    setTitle(route.title);
    setContent(route.content);
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
      updateRoute({ variables: { id, input: { title, content } } });
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
