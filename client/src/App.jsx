import React from 'react';
import {
  Switch, Route, BrowserRouter
} from 'react-router-dom';
import Pizzas from './components/Pizzas';
import Drinks from './components/Drinks';
import Login from './components/Login';
import Delivery from './components/Delivery';
import PickUp from './components/PickUp';
import Cart from './components/Cart';
import PizzaDetail from './components/PizzaDetail';
import Ticket from './components/Ticket';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/pizzas" component={Pizzas} />
          <Route exact path="/pizzas/:pizzaId" component={PizzaDetail} />
          <Route path="/drinks" component={Drinks} />
          <Route path="/delivery" component={Delivery} />
          <Route path="/pickup" component={PickUp} />
          <Route path="/cart" component={Cart} />
          <Route path="/ticket" component={Ticket} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
