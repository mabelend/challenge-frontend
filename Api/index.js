const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors')

app.use(cors)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api', (req,res) => {
  res.send(`<div>
               <h3>Welcome to Api<h3>
            <div>`)
})

app.get('/api/items', (req,res) => {
  const query = req.query.q;
  if(query){
    axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + query)
    .then(function (response) {
        let items = []
        
        for (let i = 0; i<4; i++){
            let el = response.data.results[i]
            let condition = el.attributes.find((x) => {
                if (x.name == 'Condición del ítem'){
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
                    decimals: response.data.price - Math.floor(response.data.price),
                    picture:  el.thumbnail, 
                    condition: condition,
                    free_shipping: el.shipping.free_shipping
                }
            }
            items.push(item)
        }
        let categories = response.data.filters.map((x) => {
            if (x.name == 'Categorías'){
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
        res.status(200)
        res.json(list)
    })
    .catch(function (error) {
      res.status(400).send('Ha ocurrido un error a la hora de buscar productos. Intente mas tarde. Error: ' + error);
      return;
    })
    .finally(function () {
     console.log('Response sent: ' + res.statusCode)
    }); 
  }else{
    res.status(404).send(res.json({}));
    return;
  }
});


app.get('/api/items/:id', (req, res) => {
  const id = req.params.id

  if(id){
    axios.get('https://api.mercadolibre.com/items/' + id)
    .then(function (response) {
        let body = {
              author: {
                name: 'Marcelo',
                lastname: 'Gallardo' 
              },
              item: {
              id: response.data.id, 
              title: response.data.title, 
              price: {
                currency: response.data.currency_id, 
                amount: response.data.price,
                decimals: response.data.price - Math.floor(response.data.price),
              },
              picture: response.data.pictures[0], 
                condition: response.data.condition, 
                free_shipping: response.data.shipping.free_shipping, 
                sold_quantity: response.data.sold_quantity,
                description: ''
              } 
            };
            
        res.status(200)
        res.json(body)
        

      }).catch((err) => {
        res.status(400).send('Ha ocurrido un error a la hora de buscar detalles del producto. Intente mas tarde. ' + err);
        return
      })
      .finally((res) => {
        res.status(404).send('No se ha encontrado el detalle del producto');
        return;
      })
  }
});

app.listen(8000, () => {
  console.log('El servidor está inicializado en el puerto 8000');
 });