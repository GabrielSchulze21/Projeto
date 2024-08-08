const EntradaSaida = require('../models/EntradaSaida');

// Criar uma nova entrada ou saída
exports.criarEntradaSaida = async (req, res) => {
  try {
    const { tipo, produto, quantidade, data } = req.body;

    const novaEntradaSaida = new EntradaSaida({
      tipo, // 'entrada' ou 'saida'
      produto,
      quantidade,
      data
    });

    const entradaSaidaSalva = await novaEntradaSaida.save();
    res.json(entradaSaidaSalva);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

// Listar todas as entradas e saídas
exports.listarEntradasSaidas = async (req, res) => {
  try {
    const entradasSaidas = await EntradaSaida.find().populate('produto', 'nome');
    res.json(entradasSaidas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

// Atualizar entrada ou saída por ID
exports.atualizarEntradaSaida = async (req, res) => {
  try {
    const { tipo, produto, quantidade, data } = req.body;

    let entradaSaida = await EntradaSaida.findById(req.params.id);

    if (!entradaSaida) {
      return res.status(404).json({ msg: 'Entrada ou saída não encontrada' });
    }

    entradaSaida = await EntradaSaida.findByIdAndUpdate(
      req.params.id,
      { $set: { tipo, produto, quantidade, data } },
      { new: true }
    );

    res.json(entradaSaida);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

// Deletar entrada ou saída por ID
exports.deletarEntradaSaida = async (req, res) => {
  try {
    const entradaSaida = await EntradaSaida.findById(req.params.id);

    if (!entradaSaida) {
      return res.status(404).json({ msg: 'Entrada ou saída não encontrada' });
    }

    await EntradaSaida.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Entrada ou saída removida com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};