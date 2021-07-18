import React from 'react'
//import AppBar from '@material-ui/core/AppBar';
//import Toolbar from '@material-ui/core/Toolbar';
//import IconButton from '@material-ui/core/IconButton';
//import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
//import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import { AppBar, Container, IconButton, Toolbar, Typography, Box, Paper, Grid, CardMedia, CardContent, Card, CardActions } from '@material-ui/core';
import { alpha, makeStyles} from '@material-ui/core/styles';
import FcomponentMain from './FcomponentMain';

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom"


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  mainFeaturesPost:{
    position: "relative",
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),

    
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay:{
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundOverlay: "rgba(0,0,0,.3)"
  },
  mainFeaturesPostContent:{
    position: "relative",
    padding: theme.spacing(9)
  },
  cardMedia: {
    paddingTop: "56.25%"
  },
  cardContent: {
    flexGrow: 1,
  },
  cardGrid: {
    marginTop: theme.spacing(4)
  }
}))



const cards = [["Аниме стафф", "Бенто, Зонты, Очки, Часы"],
              ["Дакимакуры", ""],
              ["Прочая атрибутика", "Гобелены, Катаны, Комиксы, Кошельки, Наушники, Пазлы, Плед, Постельное бельё, Футляр для очков"],
              ["Косплей", "Костюмы и атрибутика"]];

export default function Catalog() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    class Back_button extends React.Component {
        onclick () {
          window.location.assign('http://localhost:3000/cosplay');
        }
    
        render() {
          return (<Button size="small" color="primary" onClick={(e) => this.onclick(e)}>Добавить</Button>);
        }
      }


    const menuId = 'primary-search-account-menu';

    const mobileMenuId = 'primary-search-account-menu-mobile';

    return (
        <>
        <main>
          <Paper className={classes.mainFeaturesPost}
          style={{backgroundImage:'url(https://source.unsplash.com/random)'}}>
            <Container fixed>
              <div className={classes.overlay}/>
              <Grid container>
                <Grid item md={9}>
    
                  <div className={classes.mainFeaturesPostContent}>
                    <Typography
                      component="h1"
                      variant="h3"
                      color="inherit"
                      gutterBottom>
                        Web Developer Blog
                    </Typography>
                    <Typography
                      variant="h5"
                      color="inherit"
                      paragraph>
                        Lorem ipsum dolor sit amet, c
                        onsectetur adipiscing elit.
                    </Typography>
                    <Button variant="contained" color="secondary">    
                      Learn more
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </Paper>
          <div className={classes.mainContent}>
            <Container maxWidth="sm">
              <Typography variant="h2" algin="center" color = "textPrimary" gutterBottom>
                Категории товаров
              </Typography>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid component={Link} style={{ textDecoration: 'none' }} to={"/cosplay"} item key={card} xs={8} sm={4} md={3}> 
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image = "https://i.postimg.cc/zvJpD5vp/272d6857-eb13-4756-a6b9-7d7594f9c2df.jpg"
                        //image="https://source.unsplash.com/random"
                        title = "Image title"/>
                      <CardContent className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>
                            {card[0]}
                        </Typography>
                        <Typography>
                            {card[1]}
                        </Typography>
                      </CardContent>
                      <CardActions>
                          <Back_button/>
                      </CardActions>
                    </Card>
                    
                </Grid>
                
              ))}
            </Grid>
          </Container>
        </main>
        </>
    )
}
