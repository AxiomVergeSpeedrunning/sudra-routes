import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { observer } from 'mobx-react';

const CREATE_RACE = gql`
  mutation CreateRace($input: CreateRaceInput!) {
    createRace(input: $input) {
      race {
        id
        commentator_name
      }
    }
  }
`;

export default observer(CreationModal);
