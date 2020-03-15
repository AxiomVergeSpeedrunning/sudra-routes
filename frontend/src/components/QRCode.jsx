import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ThemedWindow from 'components/ThemedWindow';

const useStyles = makeStyles({

});

const QRCode = () => {
  const classes = useStyles();

  return (
    <ThemedWindow variant='purple' subVariant='avsr'>
      //add code for the qr image here
    </ThemedWindow>
  );
};

export default QRCode;