import React from 'react';
import './Search.scss'
import logo from './../assets/Logo_ML.png'
import searchProduct from './SearchProduct.js'

const ownSearchProduct = () => {
    const id = document.getElementById("searchInput").value;
    searchProduct(id);
}

function Search() {
    return (
        <div>
            <div className="searchBar">
                <div className="row">
                    <div className="col-md-6">
                        <img src={logo} className="meliLogo" />
                    </div>
                    <div className="col-md-6">
                        <div className="seachContainer">
                            <input type="text" id="searchInput" placeholder="Nunca dejes de buscar" onChange={ownSearchProduct} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;