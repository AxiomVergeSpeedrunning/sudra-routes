import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import gql from 'graphql-tag';

import MarkdownEditor from 'components/MarkdownEditor';
import Spacer from 'components/Spacer';
import { useStaffRedirect, useMutation } from 'hooks';
import urls from 'urls';

const CREATE_TUTORIAL = gql`
  mutation AddTutorial($input: TutorialMutationInput!) {
    createTutorial(input: $input) {
      id
      title
      content
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

  const handleSubmit = () => {
    if (!title || !content) {
      enqueueSnackbar('Please fill out both fields', { variant: 'error' });
      return;
    }

    try {
      setLoading(true);
      createTutorial({ title, content });
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

export default observer(Create);
