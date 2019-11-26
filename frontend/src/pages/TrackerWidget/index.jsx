import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import api from 'api';
import { useGlobalContext } from 'hooks';

import Spacer from 'components/Spacer';

import Window from './Window';
import Row from './Row';
import Item from './Item';
import MapDot from './MapDot';
import ItemDot from './ItemDot';

const TrackerWidget = ({
  match: {
    params: { uid },
  },
}) => {
  const store = useGlobalContext();
  const [info, setInfo] = useState({});

  useEffect(() => {
    store.useNav = false;

    return () => {
      store.useNav = true;
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      api.getTrackerInfo({ uid }).then(data => setInfo(data));
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const hp = info.currentHealth ? `${info.currentHealth}/${info.maxHealth}` : null;

  return (
    <>
      <Window heading="AV Tracker">
        <Row>
          <Item label="Game Difficulty" value={info.difficulty} />
        </Row>

        <Row>
          <Item label="Item%" value={info.overallItemPercentage} />
          <Spacer h={8} />
          <Item label="Map%" value={info.overallMapPercentage} />
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

      <Spacer v={8} />

      <Window heading={info.areaName || 'null'}>
        <Row>
          <Item label="Item%" value={info.areaItemPercentage} />
          <Spacer h={8} />
          <Item label="Map%" value={info.areaMapPercentage} />
        </Row>

        {info.areaMapPercentage === 100 && <MapDot />}
        {info.areaItemPercentage === 100 && <ItemDot />}
      </Window>
    </>
  );
};

TrackerWidget.propTypes = {
  match: PropTypes.object.isRequired,
};

export default observer(TrackerWidget);
