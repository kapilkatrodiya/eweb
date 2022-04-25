import './App.css';
import Header from "./component/layout/Header/Header.js";
import {BrowserRouter as Router,Route} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
 
function App() {
  React.useEffect(()=> {
    WebFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"]
      },
    });
  }, []);
  
  return (  
    <Router>
      <Header />
      <Route extact path="/" component={Home} />
      <Route extact path="/product/:id" component={ProductDetails} />
      <Route extact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route extact path="/search" component={Search} />


      <Footer />
    </Router>
  );
}

export default App;
