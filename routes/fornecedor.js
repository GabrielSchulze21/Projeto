const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');

// Rotas para fornecedores
router.post('/', fornecedorController.criarFornecedor);
router.get('/', fornecedorController.listarFornecedores);
router.put('/:id', fornecedorController.atualizarFornecedor);
router.delete('/:id', fornecedorController.deletarFornecedor);

module.exports = router;