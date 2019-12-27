import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import renderers from './renderers';

const MdRenderer = ({ children, ...props }) => (
  <ReactMarkdown {...props} renderers={renderers}>
    {children}
  </ReactMarkdown>
);

MdRenderer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MdRenderer;
