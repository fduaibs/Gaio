import React from 'react';

import { AppBar, Toolbar } from '@material-ui/core';
import useStyles from './styles.js';

import gaioLogo from '../../assets/gaioLogo.png';
import gaioWord from '../../assets/gaioWord.png';


export default function NavBar() {
  const styles = useStyles();

  return (
    <div className={styles.rootStyle}>
      <AppBar position="fixed">
        <Toolbar className={styles.toolbarStyle}>
            <img className={styles.logoStyle} src={gaioLogo} alt="Gaio"/>
            <img className={styles.logoStyle} src={gaioWord} alt="Gaio"/>
        </Toolbar>
      </AppBar>
      <Toolbar className={styles.toolbarStyle}/>
    </div>
  );
}