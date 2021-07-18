import React from 'react'
import { AppBar, Container, IconButton, Toolbar, Typography, Box, Paper, Grid, CardMedia, CardContent, Card, CardActions, DialogTitle, DialogActions } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { cartsFetchDataPostProduct, } from './actions/carts';
import { cartsFetchDataDelete } from './actions/carts';
import Dialog from '@material-ui/core/Dialog';
import { useState } from 'react';
import { useEffect, useRef } from 'react'
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        marginTop: theme.spacing(4)
    },
    checked: {},
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40em',
        },
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


function Formalization(props) {
    const classes = useStyles();

    const [cards, setCards] = React.useState([]);

    const [state, setState] = React.useState({
        checkedA: true,
    })
    const [FullName, setFullName] = React.useState('')
    const [Numbers, setNumbers] = React.useState('')
    const [Mail, setMail] = React.useState('')
    const [City, setCity] = React.useState('')
    const [Street, setStreet] = React.useState('')
    const [House, setHouse] = React.useState('')
    const [Flat, setFlat] = React.useState('')
    const [Comment, setComment] = React.useState('')
    const [FullNameError, setFullNameError] = React.useState(false)
    const [NumberError, setNumberError] = React.useState(false)
    const [MailError, setMailError] = React.useState(false)
    const [CityError, setCityError] = React.useState(false)
    const [StreetError, setStreetError] = React.useState(false)
    const [HouseError, setHouseError] = React.useState(false)
    const [FlatError, setFlatError] = React.useState(false)
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        var itm = [];
        var stt = 0;
        for (const item of props.carts) {
            stt = stt + 1;
            if (Number(stt) == 2) {
                itm = item;
                break;
            }
        }
        setCards(itm);
        console.log(itm);
    }, [props.carts]);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleAddCarts = () => {
        const url = "http://localhost/api/carts?prod_id=1";
        props.postProductCartsFetchData(url);
    }

    const handleDelete = () => {
        const url = "http://localhost/api/carts/delete/1";
        props.deleteCartsFetchData(url);
    }

    const handleFormalization = () => {
        const url = "http://127.0.0.1/api/carts/submit/1?commentary=" + Comment + "&city=" + City + "&street=" + Street + "&house=" + House + "&room=" + Flat + "&email=" + Mail + "&phone=" + Numbers + "&name=" + FullName;
        fetch(url, {
            method: 'PUT'
        })

    }

    class Validation_button extends React.Component {
        onclick() {

            setFullNameError(false);
            setNumberError(false);
            setMailError(false);
            setCityError(false);
            setStreetError(false);
            setHouseError(false);
            setFlatError(false);

            var bul = true;

            var z = /^[А-Я][а-я]+\s[А-Я][а-я]+\s[А-Я][а-я]+$/;
            if (!(z.test(FullName))) {
                bul = false;
                setFullNameError(true);
            }

            var z2 = /^[\+7|8]\d{10}$/;
            if (!(z2.test(Numbers))) {
                bul = false;
                setNumberError(true);
            }

            var z3 = /^([0-9a-zA-Z]([-\.\+\_\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
            if (!(z3.test(Mail))) {
                bul = false;
                setMailError(true);
            }

            var z4 = /^[А-Я][а-я]+$/;
            if (!(z4.test(City))) {
                bul = false;
                setCityError(true);
            }

            var z5 = /^[А-Я][а-я]+$/;
            if (!(z5.test(Street))) {
                bul = false;
                setStreetError(true);
            }

            var z6 = /^\d+[а-я]*$/;
            if (!(z6.test(House))) {
                bul = false;
                setHouseError(true);
            }

            var z7 = /^\d+$/;
            if (!(z7.test(Flat))) {
                bul = false;
                setFlatError(true);
            }

            if (!(state.checkedA)) {
                bul = false;
                //
            }

            if (bul) {
                setOpen(true);
                handleFormalization();
                setTimeout(()=>{
                    handleAddCarts()
                }, 2000)
                setTimeout(()=>{
                    handleDelete()
                }, 2000)
                window.location.assign('http://localhost:3000/');
            }
        }

        render() {
            return (<Button type="submit" color="secondary" variant="contained" onClick={(e) => this.onclick(e)}>Оформить заказ</Button>);
        }
    }
    const error = [state.checkedA].filter((v) => v).length !== 1;

    return (
        <div>
            <Container className={classes.cardGrid} maxWidth="lg" >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography className={classes.typographyMainStyle} align="center" variant="h4" color="textPrimary" gutterBottom>
                        Оформление заказа
                    </Typography>
                    <div style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '40em'
                    }}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField
                                required
                                onChange={(e) => setFullName(e.target.value)}
                                id="outlined-required1"
                                label="ФИО"
                                variant="outlined"
                                error={FullNameError}
                            />
                            <TextField
                                required
                                onChange={(e) => setNumbers(e.target.value)}
                                id="outlined-number1"
                                label="Номер телефона"
                                type="number"
                                defaultValue="+8"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                error={NumberError}
                            />
                            <TextField
                                required
                                onChange={(e) => setMail(e.target.value)}
                                id="outlined-required2"
                                label="Mail"
                                defaultValue="@gmail.com"
                                variant="outlined"
                                error={MailError}
                            />



                            <TextField
                                required
                                onChange={(e) => setCity(e.target.value)}
                                id="outlined-required3"
                                label="Город"
                                variant="outlined"
                                error={CityError}
                            />
                            <TextField
                                required
                                onChange={(e) => setStreet(e.target.value)}
                                id="outlined-required4"
                                label="Улица"
                                variant="outlined"
                                error={StreetError}
                            />
                            <TextField
                                required
                                onChange={(e) => setHouse(e.target.value)}
                                id="outlined-required5"
                                label="Дом"
                                variant="outlined"
                                error={HouseError}
                            />
                            <TextField
                                required
                                onChange={(e) => setFlat(e.target.value)}
                                id="outlined-number2"
                                label="Квартира"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={FlatError}
                                variant="outlined"
                            />

                            <TextField
                                onChange={(e) => setComment(e.target.value)}
                                id="outlined-multiline-static"
                                label="Комментарий к заказу"
                                multiline
                                rows={4}
                                variant="outlined"
                            />
                        </form>
                        <Typography>
                            Общая стоимость заказа: {cards.sum + "р"}
                        </Typography>
                        <FormControl required error={error} component="fieldset" className={classes.formControl}>
                            <FormControlLabel
                                control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                                label="Согласие на обработку данных"
                            />
                            <FormLabel component="legend"></FormLabel>
                        </FormControl>
                        <Validation_button />
                        <Dialog open={open} onClose={handleClose} aria-lableby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Верификация прошла успешно!</DialogTitle>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">Закрыть</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </Container>
        </div >
    )
}

const mapStaterToProps = state => {
    return {
        carts: state.carts,
    };
}
const mapDispathToProps = dispatch => {
    return {
        deleteCartsFetchData: url => dispatch(cartsFetchDataDelete(url)),
        postProductCartsFetchData: url => dispatch(cartsFetchDataPostProduct(url))
    };
}
export default connect(mapStaterToProps, mapDispathToProps)(Formalization);
