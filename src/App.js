import { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import AdminPanel from './components/AdminPanel/AdminPanel';
import CheckOut from './components/CheckOut/CheckOut';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import notify from './components/Message/Message';
import NavBar from './components/NavBar/NavBar';
import Orders from './components/Orders/Orders';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { URL } from './components/Utility/Utility';
import data from './products.json';

export const ProductContext = createContext();

function App() {

  const [products, setProducts] = useState([]);
  const [checkOutProducts, setCheckOutProducts] = useState([]);
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    fetch(`${ URL }/product/all`)
    .then(res=>res.json())
    .then(result=>setProducts(result))
    .catch(error=>notify('error', 'Can not Load data.'))

  }, [])

  return (
    <ProductContext.Provider value={[user, setUser]}>
      <Router>
        <NavBar />


        {/* switching is here */}
        <Switch>
          {/* orders */}
          <PrivateRoute path="/orders">
            <ProductContext.Provider value={[user]}>
              <div className="container mt-5">
              <Orders/>
            </div>
            </ProductContext.Provider>
          </PrivateRoute>

          {/* admin panel */}
          <PrivateRoute path="/admin">
            <ProductContext.Provider value={[products, setProducts]}>
              <div className="container mt-5">
                <AdminPanel />
              </div>
            </ProductContext.Provider>

          </PrivateRoute>
          {/* for login  */}
          <Route path="/login">
            <div className="container mt-5">
              <Login />
            </div>
          </Route>

          {/* for check out page */}
          <PrivateRoute path="/product/:id">
            <ProductContext.Provider value={[user, products, checkOutProducts, setCheckOutProducts]}>
              <div className="container mt-5">
                <CheckOut />
              </div>
            </ProductContext.Provider>
          </PrivateRoute>
          {/* for home page */}
          <Route path="/">
            <ProductContext.Provider value={[products]}>
              <div className="container mt-5">
                <Home />
              </div>
            </ProductContext.Provider>
          </Route>

        </Switch>
      </Router>
    </ProductContext.Provider>

  );
}

export default App;
