import { useEffect, useReducer, useState } from "react";
import productReducer from "../../reducers/productreducer";
import Showproducts from "./showproduct";
import getSortedData from "../../utils/getSortedData";
import getFilteredData from "../../utils/getFilteredData";
import axios from "axios";

export default function ProductListing() {
  const [product, setproducts] = useState([]);

  useEffect(() => {
    (async () => {
      const { products: productdata } = await axios
        .get("https://homedecors.herokuapp.com/product")
        .then((response) => {
          return response.data;
        });
      setproducts(productdata);
    })();
  }, []);

  const [
    { sortBy, showFastDeliveryOnly, showInventoryAll },
    productdispatch
  ] = useReducer(productReducer, {
    sortBy: null,
    showFastDeliveryOnly: false,
    showInventoryAll: true
  });

  const sortedData = getSortedData(product, sortBy);
  const filteredData = getFilteredData(
    sortedData,
    showFastDeliveryOnly,
    showInventoryAll
  );
  return (
    <div className="product-container">
     <div className="filter">
       <legend> Sort By</legend>
      <input
        type="radio"
        onChange={() =>
          productdispatch({ type: "SORT", payload: "HIGH_TO_LOW" })
        }
        name="sort"
        checked={sortBy && sortBy === "HIGH_TO_LOW"}
      />
      Price:High to Low
      <input
        type="radio"
        name="sort"
        onChange={() =>
          productdispatch({ type: "SORT", payload: "LOW_TO_HIGH" })
        }
        checked={sortBy && sortBy === "LOW_TO_HIGH"}
      />
      Price:Low to High
      <legend>Filter By</legend>
      <div>
        <input
          type="checkbox"
          onChange={() => productdispatch({ type: "Toggle_inventory" })}
          name="sort"
          checked={showInventoryAll}
        />
        Include Out of Stock
        <input
          type="checkbox"
          onChange={() => productdispatch({ type: "TOGGLE_DELIVERY" })}
          name="sort"
          checked={showFastDeliveryOnly}
        />
        Show Fast Delivery Only
      </div>
      
      </div>
      <div class="productcard-container">
        {filteredData.map((item) => Showproducts(item))}
      </div>
    </div>
  );
}
