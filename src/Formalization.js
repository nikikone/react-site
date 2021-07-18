import React from 'react'
import { AppBar, Container, IconButton, Toolbar, Typography, Box, Paper, Grid, CardMedia, CardContent, Card, CardActions, DialogTitle, DialogActions } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Dialog from '@material-ui/core/Dialog';

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


export default function Formalization() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: true,
    })
    const [FullName, setFullName] = React.useState('')
    const [Number, setNumber] = React.useState('')
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

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleClose = () => {
        setOpen(false);
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
            if (!(z2.test(Number))) {
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

            var z6 = /^\d+[а-я]$/;
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
                                onChange={(e) => setNumber(e.target.value)}
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
                            Общая стоимость заказа:
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
