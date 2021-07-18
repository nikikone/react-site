import React from 'react'
import { Button, FormControlLabel, FormGroup } from '@material-ui/core'
import { useEffect, useRef } from 'react'
import { AppBar, Container, IconButton, Toolbar, Typography, Box, Paper, Grid, CardMedia, CardContent, Card, CardActions } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Pagination } from '@material-ui/lab';
import { connect } from 'react-redux';
import { useState } from 'react';
import { personsFetchData, personsFetchDataSuccess } from './actions/products';
import { cartsFetchData, cartsFetchDataSuccess } from './actions/carts';
import { cartsFetchDataPostProduct, } from './actions/carts';

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom"


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
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
  mainFeaturesPost: {
    position: "relative",
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),


    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundOverlay: "rgba(0,0,0,.3)"
  },
  mainFeaturesPostContent: {
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
  },
  paperLeftBlock: {
    height: 50,
  },
  paperLeftLeftBlock: {
    //height: 100,
    width: 310,
    marginRight: 20
  },
  paperRightBlock: {
    height: 200,
  },
  typographyMainStyle: {
    flexGrow: 1,
    width: '100%',
  },
  checked: {},
  myUI: {
    justifyContent: 'center',
    margin: '10px 0px'
  }
}))


const pageCount = 12;

const optionsSpis = ['Возрастание по цене', 'Убывание по цене', 'Возрастание по названию', 'Убывание по названию'];
const crd = [1]

function Cosplay(props) {

  const [cartsProd, setCartsProd] = useState([]);
  const [cardss, setCardss] = useState(props.products);
  const [page, setPage] = useState(1);
  const [cards, setList] = useState(cardss); // .slice((page - 1) * (pageCount + 1), page - 1 + pageCount)

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(3);
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    checkedF: false,
    checkedG: false,
  })
  const [minCost, setMinCost] = useState('0')
  const [maxCost, setMaxCost] = useState('30000')
  const [priceFilter, setPriceFilter] = useState(cards)
  const [checkFilter, setCheckFilter] = useState(cards)

  const handleClick = () => {
    console.info(`You clicked ${optionsSpis[selectedIndex]}`);
  };


  useEffect(() => {
    const var1 = props.products;

    var1.sort((a, b) => a.name < b.name ? 1 : -1);
    setList(var1);
    setCardss(var1)
    setPriceFilter(var1);
    setCheckFilter(var1);
  }, [props.products]);

  useEffect(() => {
    var itm = [];
    for (const item of props.carts) {
      itm = item;
      break;
    }
    if (Number(itm.length)) {
      setCartsProd(itm);
      console.log(itm);
    }
  }, [props.carts]);

  const handleChange = (event) => {
    const newState = { ...state, [event.target.name]: event.target.checked }

    setState(newState);
    handleFilter(newState);
  };



  const handleFilter = (newState) => {
    var newProductList = []
    var newProductList2 = []

    if (newState['checkedA'] == newState['checkedB'] && newState['checkedB'] == newState['checkedF'] && newState['checkedF'] == newState['checkedG']) {
      newProductList = checkFilter;
      newProductList2 = cardss;
    }
    else {
      if (newState['checkedA']) {
        for (const item of checkFilter) {
          if (item.cathegory === 'anime related') {
            newProductList = newProductList.concat(item)
          }
        }
        for (const item of cardss) {
          if (item.cathegory === 'anime related') {
            newProductList2 = newProductList2.concat(item)
          }
        }
      }

      if (newState['checkedB']) {
        for (const item of checkFilter) {
          if (item.cathegory === 'dakimakuras') {
            newProductList = newProductList.concat(item)
          }
        }
        for (const item of cardss) {
          if (item.cathegory === 'dakimakuras') {
            newProductList2 = newProductList2.concat(item)
          }
        }
      }

      if (newState['checkedF']) {
        for (const item of checkFilter) {
          if (item.cathegory === 'cosplay') {
            newProductList = newProductList.concat(item)
          }
        }
        for (const item of cardss) {
          if (item.cathegory === 'cosplay') {
            newProductList2 = newProductList2.concat(item)
          }
        }
      }
      if (newState['checkedG']) {
        for (const item of checkFilter) {
          if (item.cathegory === 'other stuff') {
            newProductList = newProductList.concat(item)
          }
        }
        for (const item of cardss) {
          if (item.cathegory === 'other stuff') {
            newProductList2 = newProductList2.concat(item)
          }
        }
      }
    }
    if (selectedIndex == 0) {
      newProductList2.sort((a, b) => a.price > b.price ? 1 : -1);
      newProductList.sort((a, b) => a.price > b.price ? 1 : -1);

    } else if (newProductList == 1) {
      newProductList2.sort((a, b) => a.price < b.price ? 1 : -1);
      newProductList.sort((a, b) => a.price < b.price ? 1 : -1);
    } else if (newProductList == 2) {
      newProductList2.sort((a, b) => a.name > b.name ? 1 : -1);
      newProductList.sort((a, b) => a.name > b.name ? 1 : -1);
    } else {
      newProductList2.sort((a, b) => a.name < b.name ? 1 : -1);
      newProductList.sort((a, b) => a.name < b.name ? 1 : -1);
    }
    setList(newProductList);
    setPriceFilter(newProductList2);
  };

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    var cards2 = priceFilter;
    var cards3 = checkFilter;
    if (index == 0) {
      cards.sort((a, b) => a.price > b.price ? 1 : -1);
      cards2.sort((a, b) => a.price > b.price ? 1 : -1);
      cards3.sort((a, b) => a.price > b.price ? 1 : -1);

    } else if (index == 1) {
      cards.sort((a, b) => a.price < b.price ? 1 : -1);
      cards2.sort((a, b) => a.price < b.price ? 1 : -1);
      cards3.sort((a, b) => a.price < b.price ? 1 : -1);
    } else if (index == 2) {
      cards.sort((a, b) => a.name > b.name ? 1 : -1);
      cards2.sort((a, b) => a.name > b.name ? 1 : -1);
      cards3.sort((a, b) => a.name > b.name ? 1 : -1);
    } else {
      cards.sort((a, b) => a.name < b.name ? 1 : -1);
      cards2.sort((a, b) => a.name < b.name ? 1 : -1);
      cards3.sort((a, b) => a.name < b.name ? 1 : -1);
    }
    setPriceFilter(cards2);
    setCheckFilter(cards3);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  class Product_button extends React.Component {
    onclick() {
      window.location.assign('http://localhost:3000/basket');
    }

    render() {
      return (<Button size="small" color="primary" onClick={(e) => this.onclick(e)}>Добавить</Button>);
    }
  }

  class Filter_button extends React.Component {
    onclick() {

      //новое удаление
      var newProductList3 = []
      for (const item of cardss) {
        if (Number(item.price) >= Number(minCost) && Number(item.price) <= Number(maxCost)) {
          newProductList3 = newProductList3.concat(item)
        }
      }
      var newProductList4 = []
      for (const item of priceFilter) {
        if (Number(item.price) >= Number(minCost) && Number(item.price) <= Number(maxCost)) {
          newProductList4 = newProductList4.concat(item)
        }
      }
      setList(newProductList4);
      setCheckFilter(newProductList3);
    }

    render() {
      return (<Button type="submit" color="secondary" variant="contained" onClick={(e) => this.onclick(e)}>Фильтр по цене</Button>);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleLinkToBasket = () => {
    window.location.assign('http://localhost:3000/basket');
  }

  const handleProv = (id) => {
    const url = "http://localhost/api/carts?prod_id=" + id;
    props.postProductCartsFetchData(url);
  }

  function getProv(crd_id) {
    for (const item of cartsProd) {
      if (Number(item.prod_id) == Number(crd_id)) {
        return false;
      }
    }
    return true;
  }


  return (
    <>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={4}>
          <Grid xs="12">
            <Paper className={classes.paperLeftBlock} align="Center">
              <Typography className={classes.typographyMainStyle} align="center" variant="h5" color="textPrimary" gutterBottom>
                Каталог
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Paper className={classes.paperLeftLeftBlock} >
              <Grid container direction="column" alignItems="center">
                <Typography className={classes.typographyMainStyle} align="center" variant="h5" color="textPrimary" gutterBottom>
                  Фильтры
                </Typography>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <TextField
                    onChange={(e) => setMinCost(e.target.value)}
                    required
                    type="number"
                    id="inputMin"
                    label="Цена от"
                    defaultValue="0"
                    variant="filled"
                  />
                  <TextField
                    onChange={(e) => setMaxCost(e.target.value)}
                    type="number"
                    id="inputMax"
                    label="Цена до"
                    defaultValue="30000"
                    variant="filled"
                  />
                  <Filter_button />
                </form>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                    label="Аниме стафф"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
                    label="Дакимакуры"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={state.checkedF} onChange={handleChange} name="checkedF" />}
                    label="Косплей"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={state.checkedG} onChange={handleChange} name="checkedG" />}
                    label="Атрибутика"
                  />
                </FormGroup>
                <Grid container direction="column" alignItems="center" >
                  <Grid item>
                    <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                      <Button onClick={handleClick}>{optionsSpis[selectedIndex]}</Button>
                      <Button
                        color="primary"
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                      >
                        <ArrowDropDownIcon />
                      </Button>
                    </ButtonGroup>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList id="split-button-menu">
                                {optionsSpis.map((option, index) => (
                                  <MenuItem
                                    key={option}
                                    //disabled={index === 2}
                                    selected={index === selectedIndex}
                                    onClick={(event) => handleMenuItemClick(event, index)}
                                  >
                                    {option}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </Grid>
                </Grid >
              </Grid>
            </Paper>
            <Grid container spacing={4}>
              {cards.slice(page * pageCount - pageCount, page * pageCount).map((card) => (
                <Grid item key={card} xs={8} sm={4} md={3}>
                  <Card className={classes.card}>
                    <div><img src={card.image} /></div>
                    <CardContent component={Link} style={{ textDecoration: 'none' }} to={"/product" + "/" + card.id} className={classes.cardContent}>
                      <Typography variant="h6" gutterBottom>
                        {card.name}
                      </Typography>
                      <Typography variant="h7" gutterBottom>
                        {card.cathegory}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {getProv(card.id) ? (
                        <Button id={"product%" + card.id} onClick={() => handleProv(card.id)}>Добавить</Button>
                      ) : (
                        <Button id={"product%2" + card.id} onClick={() => handleLinkToBasket()}>В корзине</Button>
                      )}
                      <Grid item>
                        <Typography variant="subtitle1">{card.price + "р"}</Typography>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              ))}

            </Grid>

          </div>
          <Pagination count={Math.ceil(cards.length / pageCount)} page={page} className={classes.myUl} classes={{ ul: classes.myUl }} onChange={handlePaginationChange} />
        </Container>
      </main>
    </>
  )
}

const mapStaterToProps = state => {
  return {
    products: state.products,
    carts: state.carts
  };
}

const mapDispathToProps = dispatch => {
  return {
    postProductCartsFetchData: url => dispatch(cartsFetchDataPostProduct(url))
  };
}
export default connect(mapStaterToProps, mapDispathToProps)(Cosplay);
