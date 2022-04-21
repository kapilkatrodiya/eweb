import React, { Fragment, useEffect } from "react"; 
import "./Home.css";  
// import {CgMouse} from "@react-icons/all-files"
import Product from "./Product.js";
// eslint-disable-next-line
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
// eslint-disable-next-line
import {useSelector,useDispatch} from "react-redux"

const product ={
  name: "Blue Tshirt",
  images:[{ url: "https://target.scene7.com/is/image/Target/GUEST_a848f2e3-6cd6-4533-a1cf-b11d560c88b4"}],
  price:"3000",
  _id:"kapil"
};

const Home = () => {
  const dispatch = useDispatch();
  const {loading,error,products,productsCount} = useSelector((state)=>state.products);

  useEffect(()=>{
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
          <MetaData title="ECOMMERCE"/>
            <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll 
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products && products.map((product)=> <Product product={product} />)}
          </div>
    </Fragment>
  )};
    

export default Home;