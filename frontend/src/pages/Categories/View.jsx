import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';

// TODO: Make this popup into its own reusable component
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/Add';

import Link from 'components/Link';
import urls from 'urls';
import Preview from 'components/Preview';
import FixedFab from 'components/FixedFab';
import { useGlobalContext } from 'hooks';

const GET_CATEGORY = gql`
  query Category($id: ID!) {
    category(id: $id) {
      name

      routes {
        id
        author {
          username
        }
        title
      }
    }
  }
`;

const View = () => {
  const { userInfo } = useGlobalContext();
  const { id } = useParams();
  const { loading, data } = useQuery(GET_CATEGORY, { variables: { id: Number(id) } });

  if (loading || !data) {
    return <LinearProgress />;
  }

  const { category } = data;

  return (
    <>
      {userInfo.isStaff && (
        <Link to={`${urls.routes.create}${id}/`}>
          <FixedFab color="primary">
            <AddIcon />
          </FixedFab>
        </Link>
      )}

      {category.routes.length > 0 && (
        <Grid container direction="row" wrap="wrap" spacing={2} justify="center">
          {category.routes.map(r => (
            <Grid item key={r.id}>
              <Preview
                title={r.title}
                subtitle={`by ${r.author.username}`}
                href={`${urls.routes.view}${r.id}/`}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default observer(View);
