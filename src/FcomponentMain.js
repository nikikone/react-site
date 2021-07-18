import React from 'react'
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { AppBar, Container, IconButton, Toolbar, Typography, Box, Paper, Grid, CardMedia, CardContent, Card, CardActions } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Autorenew } from '@material-ui/icons';
import Formalization from './Formalization'
import { connect } from 'react-redux';
import { personsFetchData, personsFetchDataSuccess } from './actions/products';
import { useEffect, useRef } from 'react'
import { useState } from 'react';
import { cartsFetchData, cartsFetchDataSuccess } from './actions/carts';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  mainTitle: {
    position: 'relative',
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginLeft: theme.spacing(25),
      marginRight: theme.spacing(25),
    },
  },


  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundOverlay: "rgba(0,0,0,.3)"
  },
}))


function FcomponentMain(props) {

  const [lengthCarts, setLengthCarts] = useState();

  const handleClick = () => {
    window.location.assign('http://localhost:3000/basket');
  };

  const classes = useStyles();
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const [card, setCard] = useState([{}, {}]);

  function getLength() {
    var lng = 0;
    for (const item of props.carts) {
      //setLengthCarts(item.length);
      lng = item.length;
      break
    }
    return lng;
  };

  useEffect(() => {
    setCard(props.carts);
  }, [props.catrs]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.mainTitle} align="Center" variant="h6" noWrap>
          Интернет магазин аниме товаров
        </Typography>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge onClick={handleClick} badgeContent={getLength()} color="secondary">
              <ShoppingBasketIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

const mapStaterToProps = state => {
  return {
    carts: state.carts
  };
}

const mapDispathToProps = dispatch => {
  return {
    cartsFetchData: url => dispatch(cartsFetchData(url))
  };
}
export default connect(mapStaterToProps, mapDispathToProps)(FcomponentMain);
