import axios from "axios";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { MyNavbar } from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";
import {baseUrl,allProductsKey} from "../constants/ApiEndPoints";
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



export function Home(props){

    const [allProdData,setAllProdData]=useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {category, setCategory} = props;

  useEffect(() => {
    axios.get(`${baseUrl}${allProductsKey}${category !== 'all' ? `/category/${category}` : ''}`)
      .then(res => setAllProdData(res.data))
      .catch(err => console.log(err));
  }, [category]);
  useEffect(() => {
    axios.get(`${baseUrl}${allProductsKey}`)
      .then(response => {
        setAllProdData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  
  useEffect(() => {
    console.log(allProdData);
  }, [allProdData]);
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  
    return(
        <div style={{height:"100%"}}>
    <div className="container"style={{marginBottom:"100px"}}>
      <div className="product-grid">
        {allProdData.map((product) => (
          <ProductCard products={product} key={product.id}  />
        ))}
      </div>
    </div>
        </div>
    );
}