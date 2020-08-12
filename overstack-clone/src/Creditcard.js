import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { useStateValue } from "./StateProvider";

const Creditcard = ({ total = 1, history }) => {
    const [{cart}, dispatch] = useStateValue()
    const onSuccess = (payment) => {
        dispatch({
          type: 'CLEAR_CART'
      })
    history.push('/')
  };

  const onCancel = (data) => {
    console.log("The payment was cancelled!", data);
  };

  const onError = (err) => {
    console.log("Error!", err);
  };

  let env = "sandbox";
  let currency = "USD";
  const client = {
    sandbox:
      "AeZu2w0kwdhVt9UNHjgrGykrGxOq1Y_zKYw_jK_gzLS3T--S41_DsImHFG0D814vjlD_e7ZJYf7QSeu8",
    // production: "YOUR-PRODUCTION-APP-ID",
  };

  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={total}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
      style={{
          color: "blue",
          height: 25
      }}
    />
  );
};
export default Creditcard;
