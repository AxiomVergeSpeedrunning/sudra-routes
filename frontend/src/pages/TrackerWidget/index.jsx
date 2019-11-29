import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';

import { useTrackerInformation } from 'hooks';

import Spacer from 'components/Spacer';

import Window from './Window';
import Row from './Row';
import Item from './Item';
import MapDot from './MapDot';
import ItemDot from './ItemDot';

const TrackerWidget = () => {
  const info = useTrackerInformation();
  const urlParams = new URLSearchParams(window.location.search);

  const hp = info.currentHealth ? `${info.currentHealth}/${info.maxHealth}` : null;

  const [direction, justify] = urlParams.get('reverse')
    ? ['row-reverse', 'flex-end']
    : ['row', 'flex-start'];

  return (
    <Grid container direction={direction} justify={justify}>
      <Grid item>
        <Window heading="AV Tracker">
          <Row>
            <Item label="Game Difficulty" value={info.difficulty} />
          </Row>

          <Row>
            <Item label="Item%" value={`${info.overallItemPercentage}%`} />
            <Spacer h={8} />
            <Item label="Map%" value={`${info.overallMapPercentage}%`} />
          </Row>

          <Row>
            <Item label="HP" value={hp} />
          </Row>

          <Row>
            <Item label="Bubbles Popped" value={info.redGooDestroyed} />
          </Row>

          <Row>
            <Item label="Blocks Broken" value={info.bricksDestroyed} />
          </Row>

          <Row>
            <Item label="Enemies Glitched" value={info.creaturesGlitched} />
          </Row>

          <Row>
            <Item label="Deaths" value={info.deaths} />
          </Row>

          {info.overallMapPercentage === 100 && <MapDot />}
          {info.overallItemPercentage === 100 && <ItemDot />}
        </Window>
      </Grid>

      <Spacer h={8} v={8} />

      <Grid item>
        <Window heading={info.areaName || 'null'}>
          <Row>
            <Item label="Item%" value={`${info.areaItemPercentage}%`} />
            <Spacer h={8} />
            <Item label="Map%" value={`${info.areaMapPercentage}%`} />
          </Row>

          {info.areaMapPercentage === 100 && <MapDot />}
          {info.areaItemPercentage === 100 && <ItemDot />}
        </Window>
      </Grid>
    </Grid>
  );
};

export default observer(TrackerWidget);
