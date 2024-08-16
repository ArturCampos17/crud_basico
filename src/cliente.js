const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const Usuario = require('../models/Usuario');


/// validações

// Função para formatar CPF
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}


// CRUD para Cliente
// router.post('/', async (req, res) => {
//   const { nome, email, cpf } = req.body;

//   if (!nome || !email || !cpf) {
//     return res.status(400).json({ error: 'Nome, email e CPF são obrigatórios.' });
//   }

//   const cpfFormatado = formatarCPF(cpf);

//   try {
//     const novoCliente = await Cliente.create(req.body);
//     res.status(201).json(novoCliente);
//     // Formatar cpf antes de salvar
//     const cpfFormatado = formatarCPF(cpf)

//     // Cria ou encontra o usuário
//     let usuario = await Usuario.findOne({ where: { email } });
//     if (!usuario) {
//       usuario = await Usuario.create({ email });
//     }

//     // Cria o cliente
//     const cliente = await Cliente.create({ nome, email, cpf: cpfFormatado});

//     res.status(201).json(cliente);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.post('/', async (req, res) => {
    const { nome, email, cpf } = req.body;
  
    if (!nome || !email || !cpf) {
      return res.status(400).json({ error: 'Nome, email e CPF são obrigatórios.' });
    }
   
    const cpfFormatado = formatarCPF(cpf);
  
    try {
      // Verifica se o usuário já existe
      let usuario = await Usuario.findOne({ where: { email } });
  
      // Se o usuário não existir, cria um novo usuário
      if (!usuario) {
        usuario = await Usuario.create({ email });
      }
  
      // Cria o cliente
      const cliente = await Cliente.create({
        nome,
        email,
        cpf: cpfFormatado
      });
  
      res.status(201).json(cliente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf } = req.body;

  if (!nome || !email || !cpf) {
    return res.status(400).json({ error: 'Nome, email e CPF são obrigatórios.' });
  }

  const cpfFormatado = formatarCPF(cpf);

  try {
    const cliente = await Cliente.findByPk(id);
    if (cliente) {
      // Verifica se o email existe na tabela Usuario
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(400).json({ error: 'O email fornecido não existe na tabela de Usuário.' });
      }

      cliente.nome = nome;
      cliente.email = email;
      cliente.cpf = cpfFormatado; // formatar cpf antes de salcar
      await cliente.save();
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await Cliente.findByPk(id);
    if (cliente) {
      await cliente.destroy();
      res.status(200).json({ message: 'Cliente excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
