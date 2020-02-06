import React from 'react';
import * as Constants from '../common/Constants'
const HOSTNAME = Constants.Hostname;

function SearchProduct(query) {
    console.log(query);
    let queryString = (HOSTNAME + '/api/items?q=' + query);
    console.log(queryString);
    fetch(queryString).then(res => console.log(res))
}

export default SearchProduct;