import React, { useContext, useState } from "react";
import { MdAddShoppingCart, MdCheck, MdFavorite, MdOutlineAddShoppingCart, MdOutlineFavoriteBorder } from "react-icons/md";
import { Card, Button,Alert } from "react-bootstrap";
import { Link } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import { baseUrl, cartKey } from "../constants/ApiEndPoints";
import axios from "axios";
import { MyContext } from "../App";



export function ProductCard({ products }) {
  const [isFavorite, setIsFavorite] = useState(false);
  // const { value, setValue } = useContext(MyContext);


  const handleFavoriteClick = () => {
    const newFavourite = products;
    // setValue([...value, newFavourite]);
    setIsFavorite(!isFavorite);
    setFavAlert(true);
    setTimeout(() => {
      setFavAlert(false);
    }, 2000);


  };

  const [showAlert, setShowAlert] = useState(false);
  const [showFavAlert, setFavAlert] = useState(false);

  const navigate = useNavigate();
  function handleCardClick(){
    navigate(`/product/${products.id}`);
  }
  const handleAddToCart = () => {
    const cartItem = {
      productId: products.id,
      quantity: 1 // hardcoded quantity for now, you can make this dynamic if needed
    };

    axios.post(`${baseUrl}${cartKey}`, {
      products: [cartItem]
    })
      .catch(error => {
        console.log(error);
      });
      setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
  }
  return (
    <Card className="product-card" style={{
      height: "auto", padding: "20px"/* set a fixed height for the card */
    }} >
      <>
        <Card.Img variant="top" src={products.image} alt={products.title}
          style={{ objectFit: "contain" ,cursor:"pointer" }} onClick={handleCardClick}
        />
        <Button variant="dark" style={{ marginTop: "10px",cursor:"pointer"  }} onClick={handleAddToCart}>
          <span style={{marginRight:"10px"}}>Add To Cart</span>
          
          <MdOutlineAddShoppingCart className="icon" size={25} />
        </Button>
        {showAlert && 
        <Alert variant="success"  style={{marginTop:"10px"}}>
          <div>
          <span>Added To Cart!</span>

          <span style={{marginLeft:"50px"}}><MdCheck className="icon" size={20}/></span>          </div>
         
        </Alert>
      }
      </>

      <Card.Body>
        <Card.Title onClick={handleCardClick} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineBreak: "2",cursor:"pointer"  }}>{products.title}</Card.Title>
        {/* <Card.Text>{product.description}</Card.Text> */}
        <Card.Text style={{cursor:"pointer" }} className="price" onClick={handleCardClick}>{`$${products.price.toFixed(2)}`}</Card.Text>
        {/* <Card.Text className="category">{product.category}</Card.Text> */}
        <div className="rating" style={{ marginTop: "20px" }} >
        <span className="rating-text">{`${products.rating.rate} (${products.rating.count} reviews)`}</span>
            <span onClick={handleFavoriteClick} style={{cursor:"pointer" }}>
              {isFavorite ? (
                <MdFavorite className="icon" size={25} color="#ff5733" style={{marginLeft:"10px"}} />
              ) : (
                <MdOutlineFavoriteBorder className="icon" size={25} style={{marginLeft:"10px"}}/>
              )}
            </span>

        </div>
        {showFavAlert && 
        <Alert variant="success"  style={{marginTop:"10px"}}>
          <div>
          <span>Added To Favourites!</span>

          <span style={{marginLeft:"10px"}}><MdCheck className="icon" size={20}/></span>          </div>
         
        </Alert>
      }
        

      </Card.Body>
    </Card>
  );
};

