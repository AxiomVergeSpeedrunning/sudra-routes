import React from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import gql from 'graphql-tag';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useSnackbar } from 'notistack';

import urls from 'urls';
import { useGlobalContext } from 'hooks';

import FixedFab from 'components/FixedFab';
import AddIcon from '@material-ui/icons/Add';

const ALL_RACES = gql`
  {
    races {
      id
      started
      game_name
      commentator_name
      extra_information

      runners {
        id
        name
        end_time
      }
    }
  }
`;

const CREATE_RACE = gql`
  mutation CreateRace($input: CreateRaceInput!) {
    createRace(input: $input) {
      race {
        id
      }
    }
  }
`;

const AdminIndex = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const { loading: userLoading } = useGlobalContext();
  const { loading: racesLoading, data, refetch } = useQuery(ALL_RACES);
  const [newRace] = useMutation(CREATE_RACE, {
    onCompleted: mutationData => history.push(urls.races.admin.view + `${mutationData.race.id}/`),
  });

  if (userLoading || racesLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      {data.races.map((r, idx) => (
        <div key={idx}>
          <Typography>{started}</Typography>
          <Typography>{commentator_name}</Typography>
          <Typography>{game_name}</Typography>
          <Typography>{extra_information}</Typography>
        </div>
      ))}
      
      {data.runners.map((r, idx) => (
        <div key={idx}>
          <Typography>{name}</Typography>
          <Typography>{end_time}</Typography>
        </div>
      ))}

      <FixedFab color="primary" onClick={newRace}>
        <AddIcon />
      </FixedFab>
    </>
  );
};

export default observer(AdminIndex);
