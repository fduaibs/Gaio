import React, { useState, useEffect } from 'react';

import ReactAudioPlayer from 'react-audio-player';

import { Container, Grid, TextField, Button, Typography, Divider, Hidden, Card, CardContent, CardActions, Paper, Box } from '@material-ui/core';
import { Delete, Hearing, Forward, Refresh } from '@material-ui/icons';
import useStyles from './styles';

import api from '../../services/axiosConfig';

export default function Home() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [audioSource, setAudioSource] = useState('');

  const styles = useStyles();

  useEffect(() => {
    const storagedUser = localStorage.getItem('userId');
    if(!storagedUser) {
      async function fetchUser() {
        try {
          const response = await api.post('users');
          localStorage.setItem('userId', response.data.id);
          setUser(response.data.id);
          setSession(response.data.id);
        } catch(error) {
          alert('Não foi possível estabelecer uma sessão.');
        }
      }
      fetchUser()
    } else { 
      setUser(storagedUser);
      setSession(storagedUser);
    }
  }, [user]);

  useEffect(() => {
    if(user) {
      async function fetchComments() {
        try {
          const response = await api.get(`users/${user}/comments`);
          setComments(response.data.reverse());
        } catch(error) {
          alert('Não foi possivel carregar os comentários.');
        }
      }
      fetchComments();
    }
  }, [user]);

  async function handleNewComment(e) {
    e.preventDefault();

    try {
      const response = await api.post(`users/${user}/comments`, {
        text: comment,
      });
      if(response.status === 200) {
        setComment('');
        setComments([response.data, ...comments]);
      }
    } catch(error) {
      alert('Não foi possivel criar um comentário.');
    }
  };

  async function handleListenComment(commentText, commentId) {
    const sessionStorageObject = {
      user: user,
      commentId: commentId,
    };

    const storagedBase64Audio = sessionStorage.getItem(JSON.stringify(sessionStorageObject));
    if(storagedBase64Audio) {
      const array = Buffer.from(storagedBase64Audio, 'base64');
      const blob = new Blob([array], {type: 'audio/wav'})
      const objecturl = URL.createObjectURL(blob);
      setAudioSource(objecturl);

    } else {
      try {
        const response = await api.post(`synthesize`, {
          text: commentText,
        });
        const array = Buffer.from(response.data.base64Audio, 'base64');
        const blob = new Blob([array], {type: 'audio/wav'})
        const objecturl = URL.createObjectURL(blob);

        sessionStorage.setItem(JSON.stringify(sessionStorageObject), response.data.base64Audio);
        setAudioSource(objecturl);
      } catch(error) {
        alert('Não foi possivel sintetizar seu comentário.');
      }
    }
  };

  async function handleDeleteComment(commentId) {
    try {
      await api.delete(`users/${user}/comments/${commentId}`);
      const newCommentList = comments.filter(comment => comment.id !== commentId);
      setComments(newCommentList);
    } catch(error) {
      alert('Não foi possivel apagar o comentário.');
    }
  };

  function handleSessionChange() {
    localStorage.clear();
    localStorage.setItem('userId', session);
    setUser(session);
  }

  async function handleSessionRefresh() {
    localStorage.clear();
    try {
      const response = await api.post('users');
      localStorage.setItem('userId', response.data.id);
      setUser(response.data.id);
    } catch(error) {
      alert('Não foi possível estabelecer uma sessão.');
    }
  }

  return (
    <Container>
      <Paper className={styles.PaperStyle} square={true}>
      <Container>
      <Grid container>
        <Grid item xs sm/>
        <Grid container item xs={12} sm={10}>
          <Grid className={styles.FullGridStyle} container item xs={12}>
            
          </Grid>
          <Grid item xs={12} sm={5}>
              <TextField
                className={styles.SessionInputStyle}
                type="text"
                label="ID da Sessão"
                color="secondary"
                size="small"
                value={session}
                onChange={e => setSession(e.target.value)}
              />
              <Button
                className={styles.SessionButtonStyle}
                variant="contained"
                color="primary"
                size="small"
                endIcon={<Forward/>}
                onClick={() => handleSessionChange()}
              >
                Mudar
              </Button>
              <Button
                className={styles.SessionRefreshButtonStyle}
                variant="contained"
                color="primary"
                size="small"
                endIcon={<Refresh/>}
                onClick={() => handleSessionRefresh()}
              >
                Nova
              </Button>
            <form onSubmit={handleNewComment}>
              <TextField
                className={styles.FormStyle}
                id="standard-textarea"
                type="text"
                label="Comentário"
                placeholder="Digite um comentário..."
                multiline
                variant="outlined"
                color="secondary"
                fullWidth={true}
                rows={5}
                value={comment} 
                onChange={e => setComment(e.target.value)}
              />
              <Button
                className={styles.FormButtonStyle}
                variant="contained"
                color="primary"
                fullWidth={true}
                type="submit"
              >
                Cadastrar
              </Button>
            </form>
            <Box className={styles.AudioPlayerStyle} autoPlay={true} component={ReactAudioPlayer} controls src={audioSource}/>
          </Grid>
          <Hidden xsDown>
            <Grid container item className={styles.DividerStyle} xs sm>
              <Divider orientation="vertical"/>
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Hidden>
          <Grid item className={styles.CommentAreaStyle} xs={12} sm={5}>
            {comments.map(comment => (
              <Card key={comment.id} className={styles.CardStyle} variant="outlined">
              <CardContent className={styles.CardContentStyle}>
                <Typography color="textSecondary" gutterBottom>
                  {comment.text}
                </Typography>
              </CardContent>
              <CardActions className={styles.CardActionStyle}>
              <Button
                  className={styles.CardActionButtonStyle}
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<Hearing/>}
                  onClick={() => handleListenComment(comment.text, comment.id)}
                >
                  Ouvir
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  endIcon={<Delete/>}
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Apagar
                </Button>
              </CardActions>
            </Card>
            ))}
          </Grid>
        </Grid>
        <Grid item xs sm/>
      </Grid>
      </Container>
      </Paper>
    </Container>
  );
};