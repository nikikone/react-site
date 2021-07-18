import { React, useEffect } from 'react';
import { createStore } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import FcomponentMain from './FcomponentMain';

import Cosplay from './Cosplay'
import Catalog from './Catalog'
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
/*const cardss = [
  { title: 'Аниместафф', price: 1500 },
  { title: 'Дакимакуры', price: 1994 },
  { title: 'Атрибутика', price: 2000 },
  { title: 'Косплей', price: 3000 },
  { title: 'Товар 1', price: 4000 },
  { title: 'Товар 2', price: 5000 },
  { title: 'Товар 3', price: 6000 },
  { title: 'Товар 4', price: 7000 },
  { title: 'Аниместафф', price: 8000 },
  { title: 'Дакимакуры', price: 9000 },
  { title: 'Атрибутика', price: 10000 },
  { title: 'Косплей', price: 11000 },
  { title: 'Косплей', price: 12000 },
];*/

var personData = '[{"title":"Аниместафф","price":1500}, {"title":"Docimacura","price":1500}]';

class App extends Component {
  /*
    componentDidMount(){
      this.props.fetchData("http://localhost/api/products");
    }
  
    const API = "http://localhost/api/";
    const productsAPI = API + 'products';
    const [cardss, setCardss] = useState([{id:0}, {id:0}]);
    
    const updateState = jsonData => {
      //setIsloading(false);
      setCardss(jsonData);
    };
  
    useEffect(() => {
      async function getProducts(){
        const request = fetch(productsAPI);
        const response = await request;
        const parsed = await response.json();
        return parsed;
      }
      getProducts().then(
        cardss => updateState(cardss)
      );
    }, []);
  */
  //var request = new XMLHttpRequest();
  //request.open('GET', productsAPI);
  //request.responseType = 'json';
  //request.send();
  //request.onload = function(){
  //  var prod = JSON.stringify(request.response);
  //  const per = JSON.parse(prod);
  //  setProducts(per);
  //}

  //let response2 = await response;
  //if (response.ok){
  //}
  /*async function getProducts(){
    const request = fetch(productsAPI);
    const response = await request;
    const parsed = await response.json();
    //const cardsspers = JSON.parse(parsed);
    setCardss(parsed);
  }
  getProducts();
  */
  //const cardss = JSON.parse(products); 
  //const cardss = JSON.parse(products);
  //const classes = useStyles();

  //const classes = useStyles();

  componentDidMount(){
    this.props.fetchData("http://localhost/api/products");
    this.props.fetchDataCarts("http://localhost/api/carts");
  }


  render() {
    return (
      <div>
        "Здесь должен быть текст"
        {
          this.props.carts.map((card, index) => card.sum)
        }
        <Router>
          <FcomponentMain />
          <Switch>
            {this.props.products.map((card, index) => (
              <Route path={"/Product/" + card.id}>
                <Product cardess={card} />
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
