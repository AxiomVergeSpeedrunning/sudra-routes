import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const Heading = ({ level, ...props }) => <Typography {...props} variant={`h${level.toString()}`} />;

Heading.propTypes = {
  level: PropTypes.number.isRequired,
};

const renderers = {
  paragraph: props => <Typography {...props} paragraph />,
  heading: Heading,
  link: Link,
  linkReference: Link,
  table: Table,
  tableHead: TableHead,
  tableBody: TableBody,
  tableRow: TableRow,
  tableCell: TableCell,
};

export default renderers;
