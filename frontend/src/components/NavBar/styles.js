import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    flexGrow: 1,
  },
  logoStyle: {
    maxHeight: '56px',
  },
  middleDivStyle: {
    flexGrow: 1
  },
  toolbarStyle: {
    minHeight: '64px',
    maxHeight: '64px',
    justifyContent: 'center',
  },
}));

export default useStyles;