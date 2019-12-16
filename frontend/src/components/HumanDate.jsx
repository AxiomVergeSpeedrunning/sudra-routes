import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const HumanDate = ({ date, formatOptions }) => (
  <>{new Date(date).toLocaleDateString('en-US', formatOptions)}</>
);

HumanDate.propTypes = {
  date: PropTypes.string.isRequired,
  formatOptions: PropTypes.object,
};

HumanDate.defaultProps = {
  formatOptions: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
};

export default observer(HumanDate);
