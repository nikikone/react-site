import { React, useEffect } from 'react';
import { createStore } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import FcomponentMain from './FcomponentMain';

import Cosplay from './Cosplay'
import Product from './Product'
import Basket from './Basket'
import Formalization from './Formalization'
import { useState } from 'react';
import { connect } from 'react-redux';
import { personsFetchData, personsFetchDataSuccess } from './actions/products';
import { cartsFetchData, cartsFetchDataSuccess } from './actions/carts';
import { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}))

var personData = '[{"title":"Аниместафф","price":1500}, {"title":"Docimacura","price":1500}]';

class App extends Component {

  componentDidMount(){
    this.props.fetchData("http://localhost/api/products");
    this.props.fetchDataCarts("http://localhost/api/carts");
  }


  render() {
    return (
      <div>
        <Router>
          <FcomponentMain />
          <Switch>
            {this.props.products.map((card, index) => (
              <Route path={"/Product/" + card.id}>
                <Product cardess={card} cartes = {this.props.carts} />
              </Route>
            ))}

            <Route path="/Basket">
              <Basket />
            </Route>
            <Route path="/Formalization">
              <Formalization />
            </Route>
            <Route path="/">
              <Cosplay product={this.props.products} />
            </Route>
          </Switch>
        </Router>

      </div>
    );
  }
}

const mapStaterToProps = state => {
  return {
    products: state.products,
    carts: state.carts
  };
}

const mapDispathToProps = dispatch => {
  return {
    fetchData: url => dispatch(personsFetchData(url)),
    fetchDataCarts: url => dispatch(cartsFetchData(url))
  };
}
export default connect(mapStaterToProps, mapDispathToProps)(App);
