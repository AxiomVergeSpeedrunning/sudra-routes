import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import PencilIcon from '@material-ui/icons/Create';

import urls from 'urls';
import { useGlobalContext } from 'hooks';

import Link from 'components/Link';
import FixedFab from 'components/FixedFab';
import ThemedWindow from 'components/ThemedWindow';
import Spacer from 'components/Spacer';
import MarkdownDisplay from 'components/MarkdownDisplay';

const GET_TUTORIAL = gql`
  query Tutorial($id: ID!) {
    tutorial(id: $id) {
      title
      content
      updatedAt
      createdAt

      author {
        username
      }
    }
  }
`;

const View = () => {
  const { userInfo } = useGlobalContext();
  const { id } = useParams();
  const { loading, data } = useQuery(GET_TUTORIAL, { variables: { id: Number(id) } });

  if (loading || !data) {
    return null;
  }

  const formatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const { tutorial } = data;
  const created = new Date(tutorial.createdAt).toLocaleDateString('en-US', formatOptions);
  const updated = new Date(tutorial.updatedAt).toLocaleDateString('en-US', formatOptions);

  const canEdit =
    userInfo.isSuperuser || (userInfo.isStaff && tutorial.author.username === userInfo.username);

  return (
    <>
      <ThemedWindow variant="purple">
        <Typography variant="h2" color="secondary">
          {tutorial.title}
        </Typography>

        <Spacer v={16} />

        <Typography variant="subtitle1" align="right">
          by {tutorial.author.username}
        </Typography>

        <Typography variant="subtitle2" align="right">
          created {created}
        </Typography>

        <Typography variant="subtitle2" align="right">
          updated {updated}
        </Typography>
      </ThemedWindow>

      <Spacer v={32} />

      <MarkdownDisplay>{tutorial.content}</MarkdownDisplay>

      {canEdit && (
        <Link to={`${urls.tutorials.edit}${id}/`}>
          <FixedFab color="primary">
            <PencilIcon />
          </FixedFab>
        </Link>
      )}
    </>
  );
};

export default observer(View);
