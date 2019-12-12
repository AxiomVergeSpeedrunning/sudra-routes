import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

import Link from 'components/Link';
import FixedFab from 'components/FixedFab';
import urls from 'urls';
import { useGlobalContext } from 'hooks';

import Preview from './Preview';

const ALL_TUTORIALS = gql`
  {
    tutorials {
      id
      title

      author {
        username
      }
    }
  }
`;

const TutorialsPage = () => {
  const { loading, data, refetch } = useQuery(ALL_TUTORIALS);
  const { userInfo } = useGlobalContext();

  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      {userInfo.isStaff && (
        <Link to={urls.tutorials.create}>
          <FixedFab color="primary">
            <AddIcon />
          </FixedFab>
        </Link>
      )}

      {data.tutorials.length > 0 && (
        <Grid container direction="row" wrap="wrap" spacing={2} justify="center">
          {data.tutorials.map(t => (
            <Grid item key={t.id}>
              <Preview tutorial={t} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default observer(TutorialsPage);
