import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import "./PlansScreen.css";
import { loadStripe } from "@stripe/stripe-js";
import { isSubscribed } from "../actions";

function PlanScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  // const sub = useSelector((state) => state.sub);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_end
              .seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });

        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    setLoading(true);

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51IV2KdCTY4prWm4yo4xyITDr3g5DS8UGXneD4vDke4EXc8SLpyOYqGw0A5F0py6C3f35HYNPBK3S4hi32zVmR4V100pIXRi6yU"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  useEffect(() => {
    if (subscription !== null) dispatch(isSubscribed());
  }, [subscription, dispatch]);

  return (
    <div className="plansScreen">
      {loading && (
        <div className="planScreenloader">
          <div className="loader"></div>
        </div>
      )}
      {subscription && (
        <p>
          Renewal date:
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plansScreen__plan--disabled"
            } planScreen__plan`}
          >
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              style={{ pointerEvents: loading && "none" }}
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;
