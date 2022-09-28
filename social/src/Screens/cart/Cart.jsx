import React, { useEffect, useState } from "react";

const Cart = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/allproduct", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProduct(result.products);
      });
  }, []);

  const addCart = (id) => {
    fetch("/addcart", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },

      body: JSON.stringify({
        productId: id,
      }),
    })
      .then((res) => res.json())

      .then((result) => {
        const newData = product.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setProduct(newData);
        console.log(product);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const removeCart = (id) => {
    fetch("/removecart", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        productId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = product.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setProduct(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {product.map((item) => {
        return (
          <>
            <div class="row">
              <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                  <div class="card-content white-text">
                    <span class="card-title">{item.name}</span>
                    <p>Rs: {item.price}</p>
                  </div>
                  <div class="card-action">
                    <i
                      style={{ cursor: "pointer" }}
                      class="material-icons"
                      onClick={() => {
                        addCart(item._id);
                      }}
                    >
                      add
                    </i>
                    <h6>Add to cart</h6>
                    {/* <i
                      style={{ cursor: "pointer", marginLeft: "30px" }}
                      class="material-icons"
                      onClick={() => {
                        removeCart(item._id);
                      }}
                    >
                      remove
                    </i> */}
                    {/* <h6>{item.cart.length} Items in Cart</h6> */}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Cart;
