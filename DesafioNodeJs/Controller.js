const express = require("express");
const cors = require("cors");

const { Sequelize } = require("./models");
const models = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itemPedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;
let compra = models.Compra;
let produto = models.Produto;
let itemCompra = models.ItemCompra;

// ----Requisições dos Clientes----

app.post("/cliente", async (req, res) => {
  await cliente
    .create(req.body)
    .then(function () {
      return res.json({
        error: false,
        message: "Cliente criado com sucesso!",
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Foi impossível se conectar.",
      });
    });
});

app.get("/cliente/:id", async (req, res) => {
  await cliente
    .findByPk(req.params.id, { include: [{ all: true }] })
    .then(function (cliente) {
      return res.json({ cliente });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Não foi possível encontar o cliente.",
      });
    });
});

app.get("/cliente/:id/pedidos", async (req, res) => {
  await pedido
    .findAll({
      where: { ClienteId: req.params.id },
    })
    .then((pedidos) => {
      return res.json({
        error: false,
        pedidos,
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Erro: não foi possível alterar.",
      });
    });
});

app.get("/cliente/:id/compras", async (req, res) => {
  await compra
    .findAll({
      where: { ClienteId: req.params.id },
    })
    .then((compras) => {
      return res.json({
        error: false,
        compras,
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Erro: não foi possível alterar.",
      });
    });
});

app.get("/listaclientes", async (req, res) => {
  await cliente
    .findAll()
    .then((clientes) => {
      return res.json({
        error: false,
        clientes,
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Erro: Não foi possível encontrar os clientes.",
      });
    });
});

app.put("/atualizacliente/:id", async (req, res) => {
  await cliente
    .update(req.body, {
      where: { id: req.body.id },
    })
    .then(function () {
      return res.json({
        error: false,
        message: "Cliente alterado com sucesso!",
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Não foi possível alterar dos dados",
      });
    });
});

app.get("/excluircliente/:id", async (req, res) => {
  await cliente
    .destroy({
      where: { id: req.params.id },
    })
    .then(function () {
      return res.json({
        error: false,
        message: "Cliente excluído com sucesso.",
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Erro: impossível excluir cliente.",
      });
    });
});

// ---Requisições dos Pedidos---

app.post("/pedido", async (req, res) => {
  await pedido
    .create(req.body)
    .then(function () {
      return res.json({
        erro: false,
        message: "Pedido criado com sucesso!",
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Foi impossível se conectar.",
      });
    });
});

app.get("/pedido/:id", async (req, res) => {
  pedido
    .findByPk(req.params.id)
    .then((pedido) => {
      return res.json({
        error: false,
        pedido,
      });
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: "Erro: não foi possível acessar a API!",
      });
    });
});

app.get("/listapedidos", async (req, res) => {
  await pedido
    .findAll({
      raw: true,
    })
    .then(function (pedidos) {
      return res.json({ pedidos });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Foi impossível se conectar.",
      });
    });
});

app.put("/atualizapedido/:id", async (req, res) => {
  const ped = {
    id: req.params.id,
    ClienteId: req.body.ClienteId,
    dataPedido: req.body.dataPedido,
  };

  if (!(await cliente.findByPk(req.body.ClienteId))) {
    return res.status(400).json({
      error: true,
      message: "Cliente não existe.",
    });
  }

  await pedido
    .update(ped, {
      where: Sequelize.and(
        { ClienteId: req.body.ClienteId },
        { id: req.params.id }
      ),
    })
    .then((pedidos) => {
      return res.json({
        error: false,
        message: "Pedido foi alterado com sucesso.",
        pedidos,
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Erro: não foi possível alterar.",
      });
    });
});

app.get("/excluirpedido/:id", async (req, res) => {
  await pedido
    .destroy({
      where: { id: req.params.id },
    })
    .then(function () {
      return res.json({
        error: false,
        message: "Pedido excluído com sucesso.",
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Erro: Impossível excluir o pedido.",
      });
    });
});

// ---Requisições de Serviços---

app.post("/servico", async (req, res) => {
  await servico
    .create(req.body)
    .then(function () {
      return res.json({
        error: false,
        message: "Serviço criado com sucesso!",
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Foi impossível se conectar.",
      });
    });
});

app.get("/servico/:id", async (req, res) => {
  servico
    .findByPk(req.params.id)
    .then((servico) => {
      return res.json({
        error: false,
        servico,
      });
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: "Erro: não foi possível acessar a API!",
      });
    });
});

app.get("/servico/:id/pedidos", async (req, res) => {
  await itemPedido
    .findAll({
      where: { ServicoId: req.params.id },
    })
    .then((item) => {
      return res.json({
        error: false,
        item,
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Não foi possível encontrar o serviço e o pedido;",
      });
    });
});

app.get("/listaservicos", async (req, res) => {
  await servico
    .findAll({
      raw: true,
    })
    .then(function (servicos) {
      return res.json({ servicos });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Não foi possível carregar os serviços;",
      });
    });
});

app.put("/atualizaservico/:id", async (req, res) => {
  await servico
    .update(req.body, {
      where: { id: req.body.id },
    })
    .then(function () {
      return res.json({
        error: false,
        message: "Serviço alterado com sucesso!",
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Não foi possível alterar dos dados",
      });
    });
});

app.get("/excluirservico/:id", async (req, res) => {
  await servico
    .destroy({
      where: { id: req.params.id },
    })
    .then(function () {
      return res.json({
        error: false,
        message: "Serviço excluído com sucesso.",
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Erro: Impossível excluir o serviço.",
      });
    });
});

//---Requisições de Itempedido---

app.post("/itempedido", async (req, res) => {
  await itemPedido
    .create(req.body)
    .then(function () {
      return res.json({
        erro: false,
        message: "item criado com sucesso!",
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Foi impossível se conectar.",
      });
    });
});

app.get("/itempedido/pedido/:id", async (req, res) => {
  await pedido
    .findByPk(req.params.id, { include: ["item_pedidos"]})
    .then((pedidos) => {
      return res.json({ pedidos });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Não foi possível encontrar o pedido.",
      });
    });
});

app.get("/listaitempedidos", async (req, res) => {
  await itemPedido
    .findAll({
      raw: true,
    })
    .then(function (itens) {
      return res.json({ itens });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Foi impossível se conectar.",
      });
    });
});

app.put("/editaritem/pedido/:id", async (req, res) => {
  const item = {
    quantidade: req.body.quantidade,
    valor: req.body.valor,
  };

  if (!(await pedido.findByPk(req.params.id))) {
    return res.status(400).json({
      error: true,
      message: "Pedido não encontrado.",
    });
  }
  if (!(await servico.findByPk(req.body.ServicoId))) {
    return res.status(400).json({
      error: true,
      message: "Serviço não encontrado.",
    });
  }

  await itemPedido
    .update(item, {
      where: Sequelize.and(
        { ServicoId: req.body.ServicoId },
        { PedidoId: req.params.id }
      ),
    })
    .then((itens) => {
      return res.json({
        error: false,
        message: "Dados alterados com sucesso.",
        itens,
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Erro: Não foi possível alterar.",
      });
    });
});

app.get("/excluiritem/pedido/:id", async (req, res) => {
  if (!(await pedido.findByPk(req.params.id))) {
    return res.status(400).json({
      error: true,
      message: "Pedido não encontrado.",
    });
  }
  await itemPedido
    .destroy({
      where: { PedidoId: req.params.id },
    })
    .then((itens) => {
      return res.json({
        error: false,
        message: "Dados excluídos com sucesso.",
        itens,
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Erro: Não foi possível alterar.",
      });
    });
});

//---Requisições de Compras---

app.post("/compra", async (req, res) => {
  await compra
    .create(req.body)
    .then(function () {
      return res.json({
        erro: false,
        message: "Compra criada com sucesso!",
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Foi impossível se conectar.",
      });
    });
});

app.get("/compra/:id", async (req, res) => {
  compra
    .findByPk(req.params.id)
    .then((compra) => {
      return res.json({
        error: false,
        compra,
      });
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: "Erro: não foi possível acessar a API!",
      });
    });
});

app.get("/listacompras", async (req, res) => {
  await compra
    .findAll({
      raw: true,
    })
    .then(function (compras) {
      return res.json({ compras });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Foi impossível se conectar.",
      });
    });
});

app.put("/atualizacompra/:id", async (req, res) => {
  const comp = {
    id: req.params.id,
    ClienteId: req.body.ClienteId,
    data: req.body.data,
  };

  if (!(await cliente.findByPk(req.body.ClienteId))) {
    return res.status(400).json({
      error: true,
      message: "Cliente não existe.",
    });
  }

  await compra
    .update(comp, {
      where: Sequelize.and(
        { ClienteId: req.body.ClienteId },
        { id: req.params.id }
      ),
    })
    .then((compras) => {
      return res.json({
        error: false,
        message: "Compra alterada com sucesso.",
        compras,
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Erro: não foi possível alterar.",
      });
    });
});

app.get("/excluircompra/:id", async (req, res) => {
  await compra
    .destroy({
      where: { id: req.params.id },
    })
    .then(function () {
      return res.json({
        error: false,
        message: "Compra excluída com sucesso.",
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Erro: Impossível excluir a compra.",
      });
    });
});

//---Requisições de Produtos---

app.post("/produto", async (req, res) => {
  await produto
    .create(req.body)
    .then(function () {
      return res.json({
        error: false,
        message: "Produto criado com sucesso!",
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Foi impossível se conectar.",
      });
    });
});

app.get("/produto/:id", async (req, res) => {
  await produto
    .findByPk(req.params.id)
    .then((produto) => {
      return res.json({
        erro: false,
        produto
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Não foi possível encontrar o produto;",
      });
    });
});

app.get("/produto/:id/compras", async (req, res) => {
  await itemCompra
    .findAll({
      where: { ProdutoId: req.params.id },
    })
    .then((item) => {
      return res.json({
        error: false,
        item,
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Não foi possível encontrar o serviço e o pedido;",
      });
    });
});

app.get("/listaprodutos", async (req, res) => {
  await produto
    .findAll({
      raw: true,
    })
    .then(function (produtos) {
      return res.json({ produtos });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Não foi possível carregar os Produtos;",
      });
    });
});

app.put("/atualizaproduto/:id", async (req, res) => {
  await produto
    .update(req.body, {
      where: { id: req.body.id },
    })
    .then(function () {
      return res.json({
        error: false,
        message: "Produto alterado com sucesso!",
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Não foi possível alterar dos dados",
      });
    });
});

app.get("/excluirproduto/:id", async (req, res) => {
  await produto
    .destroy({
      where: { id: req.params.id },
    })
    .then(function () {
      return res.json({
        error: false,
        message: "Produto excluído com sucesso.",
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Erro: Impossível excluir o Produto.",
      });
    });
});

//---Requisições de Itemcompras---

app.post("/itemcompra", async (req, res) => {
  await itemCompra
    .create(req.body)
    .then(function () {
      return res.json({
        erro: false,
        message: "Item criado com sucesso!",
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Foi impossível se conectar.",
      });
    });
});

app.get("/itemcompra/compra/:id", async (req, res) => {
  await compra
    .findByPk(req.params.id, { include: ["item_compras"] })
    .then((compras) => {
      return res.json({ compras });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Não foi possível encontrar o compra.",
      });
    });
});

app.get("/listaitemcompras", async (req, res) => {
  await itemCompra
    .findAll({
      raw: true,
    })
    .then(function (itens) {
      return res.json({ itens });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Foi impossível se conectar.",
      });
    });
});

app.put("/editaritem/compra/:id", async (req, res) => {
  const item = {
    quantidade: req.body.quantidade,
    valor: req.body.valor,
  };

  if (!(await compra.findByPk(req.params.id))) {
    return res.status(400).json({
      error: true,
      message: "Compra não encontrado.",
    });
  }
  if (!(await produto.findByPk(req.body.ProdutoId))) {
    return res.status(400).json({
      error: true,
      message: "Serviço não encontrado.",
    });
  }

  await itemCompra
    .update(item, {
      where: Sequelize.and(
        { ProdutoId: req.body.ProdutoId },
        { CompraId: req.params.id }
      ),
    })
    .then((itens) => {
      return res.json({
        error: false,
        message: "Dados alterados com sucesso.",
        itens,
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Erro: Não foi possível alterar.",
      });
    });
});

app.get("/excluiritem/compra/:id", async (req, res) => {
  if (!(await compra.findByPk(req.params.id))) {
    return res.status(400).json({
      error: true,
      message: "Compra não encontrado.",
    });
  }
  await itemCompra
    .destroy({
      where: { CompraId: req.params.id },
    })
    .then((itens) => {
      return res.json({
        error: false,
        message: "Dados excluídos com sucesso.",
        itens,
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: "Erro: Não foi possível alterar.",
      });
    });
});

let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
  console.log("API Started: http://localhost:3001");
});