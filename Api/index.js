const express = require("express");
var app = express();
var router = express.Router();

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

router.get('/user/:id', function (req, res, next) {

    if (req.params.id == 0) next('route');
  else next(); 
}, function (req, res, next) {
  res.render('regular');
});

router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

router.get(function (req, res, next) {
  res.render('Hola mundo');
});

app.use('/', router);

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
 });