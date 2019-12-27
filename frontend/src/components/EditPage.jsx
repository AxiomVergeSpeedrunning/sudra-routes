import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { useStaffRedirect } from 'hooks';

import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import MarkdownEditor from 'components/MarkdownEditor';
import Spacer from 'components/Spacer';

const EditPage = ({ title, setTitle, content, setContent, onSubmit, loading }) => {
  const Redirect = useStaffRedirect();

  return (
    <>
      <Redirect />

      <TextField
        variant="outlined"
        onChange={e => setTitle(e.target.value)}
        value={title}
        label="Title"
        placeholder="Title"
        fullWidth
      />

      <Spacer v={32} />

      <MarkdownEditor value={content} onChange={setContent} />

      <Typography variant="caption" align="right" component="div">
        To embed a YouTube video, simply paste the URL (e.g.{' '}
        <Link href="https://www.youtube.com/watch?v=p7U_1NOyw8M">
          https://www.youtube.com/watch?v=p7U_1NOyw8M
        </Link>
        )
      </Typography>

      <Spacer v={16} />

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={onSubmit}
        color="primary"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Submit'}
      </Button>
    </>
  );
};

EditPage.propTypes = {
  title: PropTypes.string,
  setTitle: PropTypes.func.isRequired,
  content: PropTypes.string,
  setContent: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

EditPage.defaultProps = {
  title: '',
  content: '',
  loading: false,
};

export default observer(EditPage);
