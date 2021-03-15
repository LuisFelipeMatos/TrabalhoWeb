const express = require('express');
const router = express.Router();
const controller = require('../controller/usuario');

router.get('/:id?', (req, res) =>{
  
  const usuarios = controller.getUsuarios();

  res.send(usuarios);

});

router.post('/', (req, res) =>{
  res.send({});


});
router.put('/:id?', (req, res) =>{
  res.send({});


});

router.delete('/:id?', (req, res) => {
  res.send({});
   })

module.exports = router;