import React from 'react';
import './Home.css';
import {NavLink} from 'react-router-dom';
import * as Service from '../../service/Authentication' ;



const Header = ({props}) => {
    console.log(props);

        return(
            <div className="header-div">
                <nav>
                    <NavLink to="/" className="brand-name">
                        <h4>Student Forum</h4>
                    </NavLink>
                    <div className="app-navbar">
                        <ul className="app-nav-links">
                        <li  className="app-nav-item">
                            {Service.isAuthenticated() ? 
                            <NavLink className="app-nav-link" to='/forum' title='Forum'>
                                    Forum
                                </NavLink>:
                                <></>
                        }
                        </li>
                        { Service.isAuthenticated() ?
                            <li  className="app-nav-item">
                                <button className="btn btn-primary" onClick={()=>{
                                    Service.logout()
                                }}>
                                        Logout
                                </button>
                            </li>
                        :
                            <li  className="app-nav-item">
                                <NavLink className="app-nav-link" to='/signup' title="Sign up to the Forum">
                                    Sign up
                                </NavLink>
                            </li> 
                        }
                        </ul>
                    </div>
                </nav>
            </div>
        );
};

export default Header;
