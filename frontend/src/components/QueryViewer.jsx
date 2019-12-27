import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import PencilIcon from '@material-ui/icons/Create';

import Link from 'components/Link';
import FixedFab from 'components/FixedFab';
import HumanDate from 'components/HumanDate';
import ThemedWindow from 'components/ThemedWindow';
import Spacer from 'components/Spacer';
import MarkdownDisplay from 'components/MarkdownDisplay';

import { useGlobalContext } from 'hooks';

const QueryViewer = ({ extractInfo, query, getEditUrl }) => {
  const { userInfo } = useGlobalContext();
  const { id } = useParams();
  const { loading, data } = useQuery(query, { variables: { id: Number(id) } });

  if (loading || !data) {
    return <LinearProgress />;
  }

  const info = extractInfo(data);
  const editUrl = getEditUrl(data);

  const canEdit =
    userInfo.isSuperuser ||
    (userInfo.isStaff && info.author ? info.author.username === userInfo.username : false);

  return (
    <>
      <ThemedWindow variant="purple">
        <Typography variant="h2" color="secondary">
          {info.title}
        </Typography>

        <Spacer v={16} />

        {info.author && (
          <Typography variant="subtitle1" align="right">
            by {info.author.username}
          </Typography>
        )}

        {info.createdAt && (
          <Typography variant="subtitle2" align="right">
            created <HumanDate date={info.createdAt} />
          </Typography>
        )}

        {info.updatedAt && (
          <Typography variant="subtitle2" align="right">
            updated <HumanDate date={info.updatedAt} />
          </Typography>
        )}
      </ThemedWindow>
      <Spacer v={32} />
      <MarkdownDisplay>{info.content}</MarkdownDisplay>
      {canEdit && editUrl && (
        <Link to={editUrl}>
          <FixedFab color="primary">
            <PencilIcon />
          </FixedFab>
        </Link>
      )}
    </>
  );
};

QueryViewer.propTypes = {
  // Returns {title, author?, createdAt?, updatedAt?, content}
  extractInfo: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  getEditUrl: PropTypes.func.isRequired,
};

export default observer(QueryViewer);
