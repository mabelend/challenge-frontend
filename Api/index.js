const express = require("express");
const app = express();
const axios = require('axios');


app.get('/api', (req,res) => {
  console.log("Welcome to Api")
  res.send("Welcome to Api O")
})

app.get("/api/items", (req,res) => {
  const query = req.query.q;
  if(query){
    // Make a request for a user with a given ID
    axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + query)
    .then(function (response) {
        let items = []
        
        for (let i = 0; i<4; i++){
            let el = response.data.results[i]
            let condition = el.attributes.find((x) => {
                if (x.name == "Condición del ítem"){
                    return x.value_name
                }
            })
            let item = 
            {
                id: el.id, 
                title: el.title,
                address: el.address.city_name,
                price: {
                    currency: el.currency_id,
                    amount: el.price,
                    decimals: Number, //que son??,
                    picture:  el.thumbnail, 
                    condition: condition,
                    free_shipping: el.shipping.free_shipping
                }
            }
            items.push(item)
        }
        let categories = response.data.filters.map((x) => {
            if (x.name == "Categorías"){
                return x.values.name
            }
        })
        let list = {
            author: {
                name: String,
                lastname: String 
            },
            categories: categories,
            items : items,
        }
        res.statusCode(200)
        res.json(list)
    })
    .catch(function (error) {
      res.status(400).send("Ha ocurrido un error a la hora de buscar productos. Intente mas tarde");
      return;
    })
    .finally(function () {
     console.log("Response sent: " + res.statusCode)
    }); 
  }else{
    res.status(404).send(res.json({}));
    return;
  }
});


app.get('/api/items/:id', (req, res) => {
  const id = req.params.id

  if(id){
    axios.get('https://api.mercadolibre.com/api/items/' + id)
    .then(function (response) {
        body += {
          author: {
            name: "Pepe",
            lastname: "Mujica" 
          },
          item: {
           id: response.data.id, 
           title: response.data.title, 
           price: {
            currency: response.data.currency_id, 
            amount: response.data.price,
            decimals: response.data.price - Math.floor(data.price),
          },
          picture: response.data.pictures[0], 
            condition: response.data.condition, 
            free_shipping: response.data.shipping.free_shipping, 
            sold_quantity: response.data.sold_quantity,
            description: ''
          } 
        };
      }).catch((err) => {
        res.status(400).send("Ha ocurrido un error a la hora de buscar detalles del producto. Intente mas tarde");
        return
      })
      .finally((res) => {
        console.log("Response sent: " + res.statusCode)
      })
  }
});

app.listen(8000, () => {
  console.log("El servidor está inicializado en el puerto 8000");
 });