import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';

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
