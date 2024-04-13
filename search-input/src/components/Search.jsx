import React, { useEffect, useState } from "react";
import axios from "axios";
// import Notfound from "./Notfound";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);

  async function getProducts() {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      if (response?.data.length) {
        setProducts(response.data);
        setFilter(response.data);
        console.log(setProducts, "pro");
      }
    } catch (error) {
      console.log(error);
    }
  }

const handleChange = (e) => {
    setSearch(e.target.value)

    let userWord = e.target.value.toLowerCase();

    const filter = products.filter((product) => {
        return product.title.toLowerCase().includes(userWord);
    })

    setFilter(filter);

    console.log(filter, "filter")
}

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <div style={{marginTop: "50px", textAlign: "center", borderBottom: "2px solid black", width: "40%", margin: "auto", outline: "none",}}>
        <input style={{border: "none", outline: "none", marginTop: "50px"}} type="text" placeholder="search" onChange={handleChange} value={search} />
      </div>
      <div>
        {filter?.length ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              marginTop: "100px",
              marginBottom: "30px",
            }}
          >
            {filter.map((pro) => (
              <div
                style={{
                  width: "23%",
                  height: "400px",
                  marginBottom: "30px",
                  border: "2px solid gray",
                  borderRadius: "20px",
                }}
              >
                <img
                  style={{ width: "80%", height: "50%", padding: "10px 30px" }}
                  src={pro.image}
                />
                <p style={{ textAlign: "center", fontSize: "14px" }}>
                  {pro.title}
                </p>
                <p style={{ textAlign: "center", fontSize: "14px" }}>
                  Price: {pro.price}
                </p>
                <p style={{ textAlign: "center", fontSize: "14px" }}>
                  Category: {pro.category}
                </p>
                <button
                  style={{
                    textAlign: "center",
                    background: "blue",
                    color: "white",
                    borderRadius: "10px",
                    marginLeft: "60px",
                    padding: "5px 20px",
                    border: "none",
                    outline: "none",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
            <p>no result found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
