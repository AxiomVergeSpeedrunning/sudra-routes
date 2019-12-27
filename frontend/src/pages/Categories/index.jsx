import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useGlobalContext } from 'hooks';

import FixedFab from 'components/FixedFab';
import urls from 'urls';
import Link from 'components/Link';
import ThemedWindow from 'components/ThemedWindow';

const ALL_CATEGORIES = gql`
  {
    categories {
      id
      name
    }
  }
`;

const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      category {
        id
        name
      }
    }
  }
`;

const Categories = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const { userInfo } = useGlobalContext();
  const { loading, data, refetch } = useQuery(ALL_CATEGORIES);
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    onCompleted: () => {
      setShowModal(false);
      setName('');
      refetch();
    },
    onError: error => {
      // eslint-disable-next-line
      console.log(error);
      enqueueSnackbar('Error submitting new category', { variant: 'error' });
    },
  });

  const submit = () => {
    if (!name) {
      enqueueSnackbar('Please enter a name');
      return;
    }

    createCategory({ variables: { input: { name } } });
  };

  if (loading || !data) {
    return null;
  }

  return (
    <>
      {userInfo.isStaff && (
        <FixedFab color="primary" onClick={() => setShowModal(true)}>
          <AddIcon />
        </FixedFab>
      )}

      {Boolean(data.categories) && (
        <Grid container direction="row" wrap="wrap" spacing={2} justify="center">
          {data.categories.map(category => (
            <Grid item key={category.id}>
              <ThemedWindow variant="purple">
                <Link to={`${urls.categories.view}${category.id}/`} color="secondary">
                  <Typography variant="h5">{category.name}</Typography>
                </Link>
              </ThemedWindow>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Create a new category</DialogTitle>

        <DialogContent>
          <DialogContentText>Enter the name of a new category below.</DialogContentText>

          <TextField
            autoFocus
            variant="outlined"
            label="Category Name"
            placeholder="The One True 100%"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setShowModal(false)} color="primary">
            Cancel
          </Button>

          <Button onClick={submit} color="primary" variant="outlined">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default observer(Categories);
