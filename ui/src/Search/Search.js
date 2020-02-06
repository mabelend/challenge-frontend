import React from 'react';
import './Search.scss'
import logo from './../assets/Logo_ML.png'

function Search() {
    return (
        <div>
            <div class="searchBar">
                <img src={logo} class="meliLogo" />
            </div>
        </div>
    );
}

export default Search;