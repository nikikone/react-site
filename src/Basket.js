import React from 'react'
import { AppBar, Container, IconButton, Toolbar, Typography, Box, Paper, Grid, CardMedia, CardContent, Card, CardActions } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { cartsFetchData, cartsFetchDataSuccess } from './actions/carts';
import { cartsFetchDataDelete } from './actions/carts';
import { cartsFetchDataPutQuantity } from './actions/carts';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useEffect, useRef } from 'react'


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

    function getProd(crv, id) {
        const prd = [{ name: "" }];
        if (crv.length > 2) {
            return crv[id];
        } else {
            return prd;
        }
    }

    const handleUpdateQty = (id, num) => {
        if (num >= 1) {
            const url = "http://localhost/api/carts/update/" + id + "?quantity=" + num;
            props.putQuantityCartsFetchData(url);
        }
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

    const handleDelete = (id) => {
        const url = "http://localhost/api/carts/delete/" + id;
        props.deleteCartsFetchData(url);
        if(cards.length <=1){
            setTimeout(()=>{
                window.location.assign('http://localhost:3000/');
            }, 1000)
        }
    }

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
                                        {product.length > 1 ? (<div><img src={product[card.prod_id - 1].image} /></div>) : (<div></div>)}
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1">
                                                    {product.length > 1 ? (<div>{product[card.prod_id - 1].name}</div>) : (<div></div>)}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {product.length > 1 ? (<div>{product[card.prod_id - 1].cathegory}</div>) : (<div></div>)}
                                                </Typography>
                                                <Button type='button' size='small' onClick={() => handleUpdateQty(card.prod_id, card.quantity - 1)} > - </Button>
                                                <Typography> {card.quantity} </Typography>
                                                <Button type='button' size='small' onClick={() => handleUpdateQty(card.prod_id, card.quantity + 1)} > + </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button id={"buttonDelete" + card.prod_id} onClick={() => handleDelete(card.prod_id)}>
                                                    Remove
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1">{product.length > 1 ? (<div>{Number(product[card.prod_id - 1].price)*Number(card.quantity)}р</div>) : (<div></div>)}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Grid>
                    <div><Typography gutterBottom variant="subtitle1">
                        Общая цена: {props.carts.map((card, index) => card.sum)}
                    </Typography>
                    </div>
                    <Formalization_button />
                </Container>
            </Container>
        </div>
    )
}

const mapStaterToProps = state => {
    return {
        carts: state.carts,
        products: state.products
    };
}
const mapDispathToProps = dispatch => {
    return {
        cartsFetchData: url => dispatch(cartsFetchData(url)),
        deleteCartsFetchData: url => dispatch(cartsFetchDataDelete(url)),
        putQuantityCartsFetchData: url => dispatch(cartsFetchDataPutQuantity(url))
    };
}
export default connect(mapStaterToProps, mapDispathToProps)(Basket);
