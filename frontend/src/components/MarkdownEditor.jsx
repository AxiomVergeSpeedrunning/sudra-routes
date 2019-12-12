import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';

import ReactMDE from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';

import MarkdownDisplay from './MarkdownDisplay';

const useStyles = makeStyles(theme => ({
  reactMde: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  toolbar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,

    '& > * > *, & .mde-header-item > button': {
      color: `${theme.palette.text.primary} !important`,
    },

    '& .react-mde-dropdown': {
      backgroundColor: `${theme.palette.background.default} !important`,
    },
  },
  preview: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  textArea: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}));

const MarkdownEditor = ({ value, onChange, ...props }) => {
  const [selectedTab, setSelectedTab] = useState('write');
  const classes = useStyles();

  return (
    <ReactMDE
      value={value}
      onChange={onChange}
      classes={classes}
      minEditorHeight={256}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      {...props}
      generateMarkdownPreview={markdown =>
        Promise.resolve(<MarkdownDisplay>{markdown}</MarkdownDisplay>)
      }
    />
  );
};

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default observer(MarkdownEditor);
