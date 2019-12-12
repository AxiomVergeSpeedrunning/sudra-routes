import React from 'react';
import { observer } from 'mobx-react';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';

const InnerLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const Link = props => <MuiLink component={InnerLink} {...props} />;

export default observer(Link);
