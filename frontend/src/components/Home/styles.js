import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  PaperStyle: {
    height: '100%',
    minHeight: '100vh'
  },
  FullGridStyle: {
    marginTop: '2rem'
  },
  SessionInputStyle: {
    marginRight: theme.spacing(2),
  },
  SessionButtonStyle: {
    marginTop: '1rem',
    marginRight: theme.spacing(2),
  },
  SessionRefreshButtonStyle: {
    marginTop: '1rem',
  },
  FormStyle: {
    marginTop: '1rem',
  },
  FormButtonStyle: {
    marginTop: '1rem',
  },
  AudioPlayerStyle: {
    marginTop: '1rem',
    marginBottom: '0.5rem',
    width: '100%',
  },
  DividerStyle: {
    justifyContent: 'center',
    height: '100%',
    minHeight: '85vh'
  },
  CommentAreaStyle: {
    overflow: 'auto',
    maxHeight: '75vh',
  },
  CardStyle: {
    marginRight: theme.spacing(1),
    marginBottom: '1rem'
  },
  CardContentStyle: {
    paddingBottom: '0px',
  },
  CardActionStyle: {
    paddingTop: '0px',
    paddingLeft: '16px',
    paddingBottom: '16px',
  },
  CardActionButtonStyle: {
    marginRight: theme.spacing(1)
  }
}));

export default useStyles;