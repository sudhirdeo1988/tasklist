import React from "react";
import './Header.scss';

const Header = (props) =>{
    return(
        <div className="c-header">
            <h1 className="pageTitle">Header</h1>
            <button className="c-btn">Add New List</button>
        </div>
    );
}

export default Header;