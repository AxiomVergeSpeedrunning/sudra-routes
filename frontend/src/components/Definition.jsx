import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MarkdownDisplay from './MarkdownDisplay';

const useStyles = makeStyles({
  root: {
    maxWidth: 320,
  },
});

const Definition = ({ term, definition }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography paragraph>
        <strong>{term}</strong>
      </Typography>

      <MarkdownDisplay>{definition}</MarkdownDisplay>
    </div>
  );
};

Definition.propTypes = {
  term: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
};

export default Definition;
