import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Spacer from 'components/Spacer';
import ThemedWindow from 'components/ThemedWindow';

import CollectableRow from './CollectableRow';
import CollectableEntry from './CollectableEntry';

const useStyles = makeStyles(() => ({
  window: {
    padding: 8,
  },
  grid: {
    width: '100%',
    height: '100%',
  },
}));

const Collectables = ({ itemInfo }) => {
  const classes = useStyles();

  return (
    <ThemedWindow className={classes.window}>
      <Grid container direction="column" wrap="nowrap" justify="center" className={classes.grid}>
        <CollectableRow>
          <CollectableEntry name="healthNode" number={itemInfo.healthNodes} total={9} />
          <Spacer h={8} />
          <CollectableEntry name="healthFragment" number={itemInfo.healthFragments} total={20} />
        </CollectableRow>

        <CollectableRow>
          <CollectableEntry name="powerNode" number={itemInfo.powerNodes} total={6} />
          <Spacer h={8} />
          <CollectableEntry name="powerFragment" number={itemInfo.powerFragments} total={18} />
        </CollectableRow>

        <CollectableRow>
          <CollectableEntry name="rangeNode" number={itemInfo.rangeNodes} total={4} />
          <Spacer h={8} />
          <CollectableEntry name="sizeNode" number={itemInfo.sizeNodes} total={4} />
        </CollectableRow>
      </Grid>
    </ThemedWindow>
  );
};

Collectables.propTypes = {
  itemInfo: PropTypes.object.isRequired,
};

export default Collectables;
