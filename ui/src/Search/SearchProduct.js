import React from 'react';
import * as Constants from '../common/Constants'
const Hostname = Constants.Hostname;

function SearchProduct(query) {
    console.log(query);
    let queryString = (Hostname + 'api/items?q=' + query);
    console.log(queryString);
    /*fetch(queryString).then((res) => {
        console.log(res.data);

    }).catch((res) => {
        console.log(res.data);

    }).finaly((res) => {
        console.log(res.data);

    });*/
}

export default SearchProduct;