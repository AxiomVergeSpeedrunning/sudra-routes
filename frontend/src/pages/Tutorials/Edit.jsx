import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import MarkdownEditor from 'components/MarkdownEditor';
import Spacer from 'components/Spacer';
import { useStaffRedirect, useMutation } from 'hooks';
import urls from 'urls';

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
  mutation AddTutorial($input: TutorialMutationInput!) {
    createTutorial(input: $input) {
      id
      title
      content
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

  const handleSubmit = () => {
    if (!title || !content) {
      enqueueSnackbar('Please fill out both fields', { variant: 'error' });
      return;
    }

    try {
      setLoading(true);
      updateTutorial({ id, title, content });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Redirect />

      <TextField
        variant="outlined"
        onChange={e => setTitle(e.target.value)}
        value={title}
        label="Title"
        placeholder="Title"
        fullWidth
      />

      <Spacer v={32} />

      <MarkdownEditor value={content} onChange={setContent} />

      <Typography variant="caption" align="right" component="div">
        To embed a YouTube video, simply paste the embed code
      </Typography>

      <Spacer v={16} />

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handleSubmit}
        color="primary"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Submit'}
      </Button>
    </>
  );
};

export default observer(Edit);
