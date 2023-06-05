import { useContext } from "react";
import { favList, MyContext } from "../App";


export function FavouritesPage() {
    const {favList} = useContext(MyContext);

  return (
    <div style={{height:"78vh"}}>
      <h1>Favourites</h1>
      {favList.length > 0 ? (
        <ul>
          {favList.map((product) => (
            <li key={product.id}>
              <p>{product.title}</p>
              <img src={product.image} alt={product.title} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No favourite products added yet!</p>
      )}
    </div>
  );
}
