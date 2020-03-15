  
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { observer } from 'mobx-react';

import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';
import ThemedWindow from 'components/ThemedWindow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch } from '@fortawesome/free-solid-svg-icons'

import urls from 'urls';

import useGlobalContext from 'hooks/useGlobalContext';

import classNames from 'classnames';

const useStyles = makeStyles({
  gameWindow: {
    position: 'absolute',
	  top: 0,
    backgroundColor: 'none',
    width: 'calc(960px - 4px)',
	  height: 'calc(540px - 4px)',
  },
  player1: {
    left: 0,
  },
  player2: {
    right: 0,
  },
  userBox: {
    position: 'absolute',
    top: 'calc(1080px / 2)',
    width: 'calc(960px - 18px)',
    height: 30,
    textAlign: 'center',
  },
  qrCode: {
    position: 'absolute',
    top: 'calc(100% / 2)',
    width: 'calc(150px - 4px)',
	  height: 'calc(150px - 4px)',
  },
  center: {
    left: 'calc(100% / 2 - 250px)',
  },
  gameName: {
    position: 'absolute',
    top: 'calc(1080px / 2 + 47px)',
    background: 'black',
    width: 'calc(500px - 4px)',
    height: 50,
    textAlign: 'center',
  },
  gameCategory: {
    position: 'absolute',
	  top: 'calc(100% / 2 + 101px)',
    width: 'calc(500px - 4px)',
    height: 27,
    textAlign: 'center',
  },
  timer: {
    position: 'absolute',
    top: 'calc(100% / 2 + 138px)',
    width: 'calc(500px - 18px)',
    height: 50,
    textAlign: 'center',
  },
  extraInformation: {
    position: 'absolute',
    top: 'calc(100% / 2 + 204px)',
    width: 'calc(500px - 4px)',
    height: 20,
    textAlign: 'center',
  },
  timeBox: {
    position: 'absolute',
    top: 'calc(100% / 2 + 81px)',
    width: 300,
    height: 50,
    opacity: 0,
    textAlign: 'center',
  },
  p1time: {
    left: 150,
  },
  p2time: {
    right: 150,
  },
});

const GET_Race = gql`
  query Race($id: ID!) {
    race(id: $id) {
      id
      startTime
      gameName
      commentatorName
      category
      extraInformation

      runners {
        id
        name
        endTime
      }
    }
  }
`;


const View = () => {
  const store = useGlobalContext();
  const { id } = useParams();
  const { loading, data } = useQuery(GET_Race, { variables: { id: Number(id) } });

  useEffect(() => {
    store.useNav = false;

    return () => {
      store.useNav = true;
    };
  });

  if (loading) {
    return null;
  }

  return (
    <>
      <ThemedWindow className={classNames(classes.gameWindow, classes.player1)} variant="purple" subVariant="avsr"></ThemedWindow>
      <ThemedWindow className={classNames(classes.gameWindow, classes.player2)} variant="purple" subVariant="avsr"></ThemedWindow>
      <ThemedWindow className={classNames(classes.userBox, classes.player1)} variant="red" subVariant="avsr"><FontAwesomeIcon icon={faTwitch}/>{data.race.runners[0].name}</ThemedWindow>
      <QRCode className={classNames(classes.qrCode, classes.player1)}></QRCode>
      <ThemedWindow className={classNames(classes.userBox, classes.player2)} variant="red" subVariant="avsr"><FontAwesomeIcon icon={faTwitch}/>{data.race.runners[1].name}</ThemedWindow>
      <QRCode className={classNames(classes.qrCode, classes.player2)}></QRCode>
      <ThemedWindow className={classNames(classes.gameName, classes.center)} variant="purple" subVariant="avsr">{data.race.gameName}</ThemedWindow>
      <ThemedWindow className={classNames(classes.gameCategory, classes.center)} variant="purple" subVariant="avsr">{data.race.category}</ThemedWindow>
      <ThemedWindow className={classNames(classes.timer, classes.center)} variant="red" subVariant="avsr">{data.race.startTime}</ThemedWindow>
      <ThemedWindow className={classNames(classes.extraInformation, classes.center)} variant="purple" subVariant="avsr">{data.race.extraInformation}</ThemedWindow>
      <ThemedWindow className={classNames(classes.timeBox, classes.p1time)} variant="red" subVariant="avsr">{data.race.runners[0].endTime}</ThemedWindow>
      <ThemedWindow className={classNames(classes.timeBox, classes.p2time)} variant="red" subVariant="avsr">{data.race.runners[1].endTime}</ThemedWindow>
    </>
  );
};

  

export default observer(View);