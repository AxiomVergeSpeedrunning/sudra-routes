import React from 'react';
import { observer } from 'mobx-react';
import gql from 'graphql-tag';

import urls from 'urls';

import QueryViewer from 'components/QueryViewer';

const GET_TUTORIAL = gql`
  query Tutorial($id: ID!) {
    tutorial(id: $id) {
      id
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

const View = () => (
  <QueryViewer
    query={GET_TUTORIAL}
    extractInfo={d => d.tutorial}
    getEditUrl={d => `${urls.tutorials.edit}${d.tutorial.id}/`}
  />
);

export default observer(View);
