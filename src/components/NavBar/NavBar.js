import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Dropdown, Icon } from 'rsuite';
import { ProductContext } from '../../App';

const NavBar = () => {
    const history =  useHistory()
    const [user, setUser] = useContext(ProductContext)
    const handelLogOut = ()=>{
        setUser({});
        history.replace('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a href="" className="navbar-brand">Daily Bazar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#shop-nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="shop-nav">
                    <ul className="navbar-nav me-auto mb-2">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/orders" className="nav-link">Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin" className="nav-link">Admin</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/deals" className="nav-link">Deals</Link>
                        </li>
                        
                        <li className="nav-item">
                            {user.loggedIn ?
                                <Dropdown title={<><Icon icon="user"/>{user.name}</>}>
                                    <Dropdown.Item>
                                       <Button color="orange" onClick={()=>handelLogOut()}>LogOut</Button> 
                                    </Dropdown.Item>
                                </Dropdown>
                                
                                :
                                <Link to="/login" className="nav-link btn-primary">Login</Link>
                            }
                        </li>
                       
                    </ul>
                </div>
            </div>

        </nav>
    );
};

export default NavBar;