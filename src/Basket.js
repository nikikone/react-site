import React from 'react'
import { AppBar, Container, IconButton, Toolbar, Typography, Box, Paper, Grid, CardMedia, CardContent, Card, CardActions } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import imger from './logo.svg';
import ButtonBase from '@material-ui/core/ButtonBase';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { cartsFetchData, cartsFetchDataSuccess } from './actions/carts';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useEffect, useRef } from 'react'
import {useImage} from 'react-image'

import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom"
import { products } from './reducers/products';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        marginTop: theme.spacing(4)
    },
    typographyMainStyle: {
        flexGrow: 1,
        width: '100%',
    },
    cardMedia: {
        paddingTop: "56.25%"
    },
    cardContent: {
        flexGrow: 1,
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}))

/*["Аниме стафф", "Бенто, Зонты, Очки, Часы"],
["Дакимакуры", ""],
["Прочая атрибутика", "Гобелены, Катаны, Комиксы, Кошельки, Наушники, Пазлы, Плед, Постельное бельё, Футляр для очков"],
["Косплей", "Костюмы и атрибутика"]*/
//const cards = [];

function Basket(props) {
    const [cards, setCards] = useState([]);
    const [product, setProduct] = useState([{ name: "" }]);
    const classes = useStyles();
    class Formalization_button extends React.Component {
        onclick() {
            window.location.assign('http://localhost:3000/formalization');
        }

        render() {
            return (<Button size="small" color="primary" onClick={(e) => this.onclick(e)}>Перейти к оформлению товара</Button>);
        }
    }
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    function getProd(crv, id) {
        const prd = [{ name: "" }];
        if (crv.length > 2) {
            return crv[id];
        } else {
            return prd;
        }
    }

    const handleUpdateQty = () => {

    }

    useEffect(() => {
        var itm = [];
        for (const item of props.carts) {
            itm = item;
            break;
        }
        if (Number(itm.length)) {
            setCards(itm);
        }
    }, [props.carts]);

    useEffect(() => {
        console.log(props.products);
        setProduct(props.products);
    }, [props.products]);

    return (
        <div>
            <Container className={classes.cardGrid} maxWidth="lg" >
                <Typography className={classes.typographyMainStyle} align="center" variant="h4" color="textPrimary" gutterBottom>
                    Корзина
                </Typography>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4} >
                        {cards.map((card) => (
                            <Paper className={classes.paper} /*</Grid>*className={classes.cardGrid}*/>
                                <Grid container spacing={2}>
                                    <Grid item>
                                    {product.length > 1 ? (<div><img src = {product[card.prod_id - 1].image}/></div>) : (<div></div>)}
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1">
                                                    {product.length > 1 ? (<div>{product[card.prod_id - 1].name}</div>) : (<div></div>)}
                                                </Typography>
                                                <Button type='button' size='small' onClick={() => handleUpdateQty(card.quantity - 1)} > - </Button>
                                                <Typography> {card.quantity} </Typography>
                                                <Button type='button' size='small' onClick={() => handleUpdateQty(card.quantity + 1)} > + </Button>
                                                {/*<Select
                                                    labelId="demo-simple-select-label"
                                                    id={"demo-simple-select" + card.id}
                                                    value={age}
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem value={10}>1</MenuItem>
                                                    <MenuItem value={20}>2</MenuItem>
                                                    <MenuItem value={30}>3</MenuItem>
                                                    <MenuItem value={30}>4</MenuItem>
                                                    <MenuItem value={30}>5</MenuItem>
                                                    <MenuItem value={30}>6</MenuItem>
                                                    <MenuItem value={30}>7</MenuItem>
                                                    <MenuItem value={30}>8</MenuItem>
                                                    <MenuItem value={30}>9</MenuItem>
                                                    <MenuItem value={30}>10</MenuItem>
                                                </Select>*/}
                                                <Typography variant="body2" color="textSecondary">
                                                    {product.length > 1 ? (<div>{product[card.prod_id - 1].cathegory}</div>) : (<div></div>)}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                                    Remove
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1">$19.00</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Grid>
                    <div><Typography gutterBottom variant="subtitle1">
                        Общая цена:
                    </Typography>
                    </div>
                    <Formalization_button />
                </Container>
            </Container>
        </div>
    )
}

/*
<Grid container direction="column" alignItems="center" xs={8} sm={4} md={6}>
<Card className={classes.card}>
    <CardMedia component={Link} style={{ textDecoration: 'none' }} to={"/product"}
        className={classes.cardMedia}
        image="https://i.postimg.cc/zvJpD5vp/272d6857-eb13-4756-a6b9-7d7594f9c2df.jpg"
        //image="https://source.unsplash.com/random"
        title="Image title" />
    <CardContent component={Link} style={{ textDecoration: 'none' }} to={"/product"} className={classes.cardContent}>
        <Typography variant="h5" gutterBottom>
            {card[0]}
        </Typography>
        <Typography>
            {card[1]}
        </Typography>
    </CardContent>
    <CardActions>
        <Product_button />
    </CardActions>
</Card>
</Grid>*/

const mapStaterToProps = state => {
    return {
        carts: state.carts,
        products: state.products
    };
}
const mapDispathToProps = dispatch => {
    return {
        cartsFetchData: url => dispatch(cartsFetchData(url))
    };
}
export default connect(mapStaterToProps, mapDispathToProps)(Basket);