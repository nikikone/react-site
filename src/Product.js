import React from 'react'
import { AppBar, Container, IconButton, Toolbar, Typography, Box, Paper, Grid, CardMedia, CardContent, Card, CardActions } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import { cartsFetchDataPostProduct, } from './actions/carts';
import { connect } from 'react-redux';
import { useEffect, useRef } from 'react'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    cardMedia: {
        paddingTop: "56.25%"
    },
    cardContent: {
        flexGrow: 1,
    },
}));


const cards = [1];

function Product(props) {

    const classes = useStyles();

    const [stateButton, setStateButton] = React.useState(true)
    const [cartsProd, setCartsProd] = React.useState([]);
    const handleLinkToBasket = () => {
        window.location.assign('http://localhost:3000/basket');
    }


    const handleProv = (id) => {
        const url = "http://localhost/api/carts?prod_id=" + id;
        props.postProductCartsFetchData(url);
        setStateButton(false);
    }


    function getProv(crd_id) {
        for (const item of cartsProd) {
            if (Number(item.prod_id) == Number(crd_id)) {
                return false;
            }
        }
        return true;
    }

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

    return (
        <>
            <Container className={classes.cardGrid} maxWidth="lg">
                <Container maxWidth="sm">
                    <Typography variant="h2" algin="center" color="textPrimary" gutterBottom>
                        {props.cardess.name}
                    </Typography>
                </Container>
                <main>
                    <div style={{
                        display: 'flex', flexDirection: 'column',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '50em'
                    }}>
                        <Grid container spacing={4} style={{
                            display: 'flex', flexDirection: 'column',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}>
                            {cards.map((card) => (
                                <Grid item key={card} >
                                    <Card className={classes.card}>
                                        <div><img src={props.cardess.image} alt="cur" /></div>
                                    </Card>

                                </Grid>

                            ))}
                        </Grid>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>Описание</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {props.cardess.description}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        {getProv(props.cardess.id) ? (
                            <Button id="button1" onClick={() => handleProv(props.cardess.id)}>Добавить</Button>
                        ) : (
                            <Button id="button2" onClick={() => handleLinkToBasket()}>В корзине</Button>
                        )}
                    </div>
                </main>
            </Container>
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

export default connect(mapStaterToProps, mapDispathToProps)(Product);
