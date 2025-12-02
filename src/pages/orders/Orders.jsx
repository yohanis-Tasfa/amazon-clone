import React, { useContext, useState, useEffect } from "react";
import Layout from "../../components/LayOut/Layout";
import { db } from "../../utility/firebase"; // Make sure this exports getFirestore()
import { DataContext } from "../../components/dataprovider/DataProvider";
import classes from "./orders.module.css";
import ProductCard from "../../components/product/ProductCard";

// Import these from Firebase v9+
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // Create a reference to the user's orders subcollection
      const userOrdersRef = collection(db, "users", user.uid, "orders");
      const q = query(userOrdersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]); // You can add `user` to dependency array if needed

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.order_container}>
          <h2>Your Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div>
              {orders.map((eachOrder, i) => (
                <div key={eachOrder.id || i}>
                  <hr />
                  <p>
                    <strong>Order ID:</strong> {eachOrder.id}
                  </p>
                  <div className={classes.orders_list}>
                    {eachOrder.data.basket?.map((item) => (
                      <ProductCard
                        key={item.id}
                        product={item}
                        flex={true}
                        renderAdd={false} // optional: hide "Add to cart" button in orders
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
