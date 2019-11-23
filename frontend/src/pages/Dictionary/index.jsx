import React from 'react';
import Grid from '@material-ui/core/Grid';

import ThemedWindow from '../../components/ThemedWindow';
import Definition from '../../components/Definition';

import terms from './terms';

const Dictionary = () => (
  <Grid container spacing={2} wrap="wrap" direction="row">
    {terms.map(([term, definition]) => (
      <Grid item xs={3} key={term}>
        <ThemedWindow>
          <Definition term={term} definition={definition} />
        </ThemedWindow>
      </Grid>
    ))}
  </Grid>
);

export default Dictionary;
