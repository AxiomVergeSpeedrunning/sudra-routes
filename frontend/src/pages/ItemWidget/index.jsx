import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';

import { useTrackerInformation } from 'hooks';

import Spacer from 'components/Spacer';

import Window from './Window';
import ItemRow from './ItemRow';
import Collectables from './Collectables';
import LastItem from './LastItem';
import { weapons, tools } from './itemDict';

const ItemWidget = () => {
  const { itemInfo } = useTrackerInformation();

  if (!itemInfo) {
    return null;
  }

  return (
    <Grid container direction="row" justify="flex-start">
      <Window>
        <Grid container direction="column" wrap="nowrap">
          <ItemRow items={weapons} itemInfo={itemInfo} />
          <ItemRow items={tools} itemInfo={itemInfo} />
        </Grid>

        <Spacer h={16} />

        <LastItem itemInfo={itemInfo} />

        <Spacer h={16} />

        <Collectables itemInfo={itemInfo} />
      </Window>
    </Grid>
  );
};

export default observer(ItemWidget);
