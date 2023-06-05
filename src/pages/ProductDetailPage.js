import { useContext, useEffect, useState } from "react";
import { useParams,useLocation } from "react-router-dom";
import axios from "axios";
import { allProductsKey, baseUrl } from "../constants/ApiEndPoints";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { MyContext } from "../App";

export function ProductDetailPage() {
    const location = useLocation();
    const productId = location.pathname.split("/").pop();
  console.log(productId); // log the id parameter

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}${allProductsKey}/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      console.log(product);
  }, [productId]);

  return (
    <Container style={{ marginTop: "20px", paddingBottom: "20px" ,height:"100%"}}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Product Details</h1>
      <Row>
        <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ maxWidth: "400px", width: "100%", height: "auto" }}>
            <Card.Img
              variant="top"
              src={product?.image}
              alt={product?.title}
              style={{ objectFit: "contain", height: "100%" }}
            />
          </Card>
        </Col>
        <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ maxWidth: "400px", width: "100%", height: "auto" }}>
            <Card.Body>
              <Card.Title style={{ fontWeight: "bold", marginBottom: "10px" }}>{product?.title}</Card.Title>
              <Card.Text className="price" style={{ fontSize: "20px", marginBottom: "10px" }}>{`$${product?.price?.toFixed(
                2
              )}`}</Card.Text>
              <Card.Text className="rating" style={{ fontSize: "18px", marginBottom: "10px" }}>{`${product?.rating?.rate} (${product?.rating?.count} reviews)`}</Card.Text>
              <Card.Text style={{ fontSize: "16px", marginBottom: "10px" }}>{product?.description}</Card.Text>
              <Button variant="dark" style={{ marginTop: "10px" }}>
                Add To Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
