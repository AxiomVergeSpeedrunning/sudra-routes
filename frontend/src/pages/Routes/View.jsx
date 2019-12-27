import React from 'react';
import { observer } from 'mobx-react';
import gql from 'graphql-tag';

import urls from 'urls';
import QueryViewer from 'components/QueryViewer';

const GET_ROUTE = gql`
  query Route($id: ID!) {
    route(id: $id) {
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
    query={GET_ROUTE}
    extractInfo={d => d.route}
    getEditUrl={d => `${urls.routes.edit}${d.route.id}/`}
  />
);

export default observer(View);
