import React from 'react'
import { AppBar, Container, IconButton, Toolbar, Typography, Box, Paper, Grid, CardMedia, CardContent, Card, CardActions } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import AccordionDetails from '@material-ui/core/AccordionDetails';

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

export default function Product(props) {

    const classes = useStyles();


    return (
        <>
            <Container className={classes.cardGrid} maxWidth="lg">
                <Container maxWidth="sm">
                    <Typography variant="h2" algin="center" color="textPrimary" gutterBottom>
                        {props.cardess.name}
                    </Typography>
                </Container>
                <main>
                    <div style={{ display: 'flex', flexDirection: 'column' }} style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '50em'}}>
                        <Grid container spacing={4} >
                            {cards.map((card) => (
                                <Grid item key={card} xs={8} sm={4} md={7}>
                                    <Card className={classes.card}>
                                        <CardMedia 
                                            className={classes.cardMedia}
                                            image={props.cardess.image}
                                            //image="https://source.unsplash.com/random"
                                            title="Image title" />
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
                    </div>
                </main>
            </Container>
        </>
    )
}
