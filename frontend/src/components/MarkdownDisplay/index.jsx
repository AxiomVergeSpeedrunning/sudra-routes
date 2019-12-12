import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown/with-html';

import renderers from './renderers';

const MdRenderer = ({ children, ...props }) => (
  <ReactMarkdown escapeHtml={false} {...props} renderers={renderers}>
    {children}
  </ReactMarkdown>
);

MdRenderer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MdRenderer;
