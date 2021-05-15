import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from "./components/pages/Home";
import ViewCustomer from "./components/pages/ViewCustomers";
import TransferMoney from "./components/pages/TransferMoney";
import ViewCust from './components/pages/ViewCust';
import ViewTransations from './components/pages/ViewTransactions';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/view_customers" exact component={ViewCustomer} />
          <Route path="/transfer_money" exact component={TransferMoney} />
          <Route path="/view_transactions" exact component={ViewTransations} />
        </Switch>
        <Switch>
          <Route path="/view_cust/:cust_id" exact component={ViewCust} />
        </Switch>
      </Router>
    </>
  );  
}

export default App;
