import { Switch, Route } from "react-router";
import { ToastContainer } from "react-toastify";

import PaymentBreakdown from "./components/PaymentBreakdown";
import PaymentOption from "./components/PaymentOption";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        // pauseOnHover
      />
      {/* Same as */}
      <Switch>
        <Route exact path="/">
          <PaymentOption />
        </Route>
        <Route exact path="/breakdown">
          <PaymentBreakdown />
        </Route>
      </Switch>
    </>
  );
};

export default App;
