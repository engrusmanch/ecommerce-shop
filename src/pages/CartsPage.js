import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { baseUrl, cartKey } from "../constants/ApiEndPoints";

export function CartPage({ cartId }){
  const [allCartData,setAllCartData]=useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${baseUrl}${cartKey}/1`)
      .then(response => {
        setAllCartData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  
  useEffect(() => {
    console.log(allCartData);
  }, [allCartData]);

  if (isLoading) {
    return <p>Loading cart data...</p>;
  }

  return (
    <Container className="my-5" style={{height:"73vh"}}>
      <h1>Cart #{allCartData.id}</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            {/* <th>Price</th> */}
            {/* <th>Total</th> */}
          </tr>
        </thead>
        <tbody>
          {allCartData.products.map((product) => (
            <tr key={product.productId}>
              <td>{product.title}</td>
              <td>{product.quantity}</td>
              {/* <td>${product.price.toFixed(2)}</td> */}
              {/* <td>${(product.price * product.quantity).toFixed(2)}</td> */}
            </tr>
          ))}
          <tr>
            <td colSpan="3" className="text-right">
              <strong>Total:</strong>
            </td>
            <td>
              <strong>
                $
                {allCartData.products.reduce(
                  (total, product) =>
                    total + product.price * product.quantity,
                  0
                ).toFixed(2)}
              </strong>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
