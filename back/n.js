//===== Imports ===============================

const express = require('express');
var ip = require('ip');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var path = require('path');
const fs = require('fs');
const multer  = require('multer');
const sharp = require('sharp');
const { Op } = require("sequelize");
const crypto = require("crypto");
require('dotenv').config();


//===== Outros ===============================

const app = express();
app.use(cors({oringin: '*'}));
app.use(express.static("public"));
app.use(express.json());

const port = 3001;
const SECRET = process.env.SECRET_JWT;
var blackListJWT = [];

//=== Multer ===
var storageProduto = multer.diskStorage(
{
  destination: function (req, file, callback)
  {
    callback(null, 'uploads/images/produtos');
  },
  filename: function (req, file, callback)
  {
    let r = (Math.random() + 1).toString(36).substring(7);
    let nome = r.toString() + file.originalname;
    callback(null, nome);
  }
});
  
var uploadProduto = multer({ storage: storageProduto });



//=== JWT ===
function verifyJWT(req, res, next)
{
  const token = req.headers['authorization'];

  for(let i = 0; i < blackListJWT.length; i++)
  {
    if(blackListJWT[i] === token)
    {
      return res.json({auth: false, token: null, info: "❗️ Faça o login novamente!"});
    }
  }
  
  jwt.verify(token, SECRET, function(err, decoded)
  {
    if(err)
    {
      return res.json({auth: false, token: null, info: "❗️ A autenticação falhou!"});
    }
    else
    {
      next();
    }
  });
}

//=== Password ===
function sha512(senha)
{
  var hash = crypto.createHmac('sha512', process.env.SECRET_ENC); // Algoritmo de cripto sha512
  hash.update(senha);
  var hash = hash.digest('hex');
  return hash;
};

//===== DB ===============================

const db = require('./db/db.js');

//===== MODELS IMPORT ===============================

const Atendente = require('./db/models/atendente.js');
const ItemPedido = require('./db/models/itemPedido.js');
const Pedido = require('./db/models/pedido.js');
const Produto = require('./db/models/produto.js');

//===== RELACIONAMENTOS ===============================

//1
ItemPedido.belongsTo(Produto);
Produto.hasMany(ItemPedido);


//2
Pedido.hasMany(ItemPedido);
ItemPedido.belongsTo(Pedido);


//===== Rotas =======================================================================================================================

//== Gerais ===========================================

app.get('/', (req, res) =>
{
  (async() =>
  {
    try
    {
      await db.authenticate();
      return res.send('Conectado com sucesso 😜🤙🥳🥰😍🤘💪😂');
    } 
    catch (error)
    {
      return res.send('Sem sucesso na conexão:', error);
    }
  })();
});




app.get('/criarADM', (req, res) =>
{
  (async() =>
  {
    try
    {
      const atendente = await Atendente.create({nome:"gustavo", senha:sha512("1234"),telefone:"123456789", descricao:""});
      return res.json({auth: false, token: null, info: "✅ Atendente fe criado com sucesso!"});
    } 
    catch (error)
    {
      return res.send('Erro na criação:' + error);
    }
  })();
});



app.get('/force', (req, res) =>
{
  (async() =>
  {
    try
    {
      //await db.sync();
      //await db.sync({ force: true });
      return res.send("Modelos sincronizados com suceeso 😜🤙🥳🥰😍🤘💪😂");
    }
    catch (error)
    {
      return res.send('Erro na sincronização:', error);
    }
  })();
});




//== Produtos ===========================================

app.get('/api/admin/produto', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      const produtos = await Produto.findAll();
      return res.send(produtos);
    }
    catch (error)
    {
      console.log(error);
      return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
    }
  })();  
});


app.get('/api/produto', (req, res) =>
{
  (async() =>
  {
    try
    {
      const produtos = await Produto.findAll({where: {quantidadeDisponivel: {[Op.gt]: 0}}});
      return res.send(produtos);
    }
    catch (error)
    {
      console.log(error);
      return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
    }
  })();  
});


app.post('/api/admin/produto/produtoImagem', (req,res) =>
{
  (async() =>
  {
    try
    {
      return res.sendFile(path.join(__dirname, '/uploads/images/produtos/', req.body.imagemName));
    }
    catch (error)
    {
      console.log(error);
      return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
    }
  })(); 
});


app.post('/api/admin/produto/criarProduto', verifyJWT, uploadProduto.single("file"), async (req,res) =>
{
  sharp(path.join(__dirname, '/uploads/images/produtos/', req.file.filename))
    .resize(180, 280)
      .toFile(path.join(__dirname, '/uploads/images/produtos/', 'cut' + req.file.filename), (err) =>
      {
        if (err)
        {
          console.log(err);
        }
        else
        {
          fs.unlink(path.join(__dirname, '/uploads/images/produtos/', req.file.filename), (err) =>
          {
            if (err)
            {
              console.error(err);
              return
            }
            //file removed
          })
        }
      });

  let reqProduto =
  {
    nome: req.body.nome,
    descricao: req.body.descricao,
    precoUnidade: req.body.precoUnidade,
    preco100ml: req.body.preco100ml,
    preco210ml: req.body.preco210ml,
    preco400ml: req.body.preco400ml,
    tipo: req.body.tipo,
    categoria: req.body.categoria,
    quantidadeDisponivel: req.body.quantidadeDisponivel,
    ingredientes: req.body.ingredientes,
    imagem: "cut" + req.file.filename
  }

  try
  {
    const produto = await Produto.create(reqProduto);
    return res.json({auth: true, imagemName:produto.imagem, info: "✅ Produto criado com sucesso!"});
  }
  catch (error)
  {
    console.log(error);
    return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
  }
});


app.put('/api/admin/produto', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      const produto = await Produto.update(
      {
        precoUnidade: req.body.precoUnidade,
        preco100ml: req.body.preco100ml,
        preco210ml: req.body.preco210ml,
        preco400ml: req.body.preco400ml,
        quantidadeDisponivel: req.body.quantidadeDisponivel,
      },
      {
        where:
        {
          id: req.body.id
        }
      });
      return res.json({produto: produto, auth: true, info: "✅ Atendente criado com sucesso!"});
    }
    catch (error)
    {
      console.log(error);
      return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
    }
  })();  
});


app.delete('/api/admin/produto', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      const produto = await Produto.destroy({where: {id: req.body.id}});
      return res.json({ auth: true, info: "✅ Produto excluido com sucesso!"});
    }
    catch (error)
    {
      console.log(error);
      return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
    }
  })();  
});



//== Atendentes ===========================================

app.post('/api/admin/atendente', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      let tempAtendente = req.body;
      tempAtendente.senha = sha512(req.body.senha);

      const atendente = Atendente.create(tempAtendente);
      return res.json({auth: true, info: "✅ Atendente criado com sucesso!"});
    }
    catch (error)
    {
      console.log(error);
      return res.json({auth: false, info: "❗️ Não foi possível entrar no sistema, por favor, tente novamente!"});
    }
  })();  
}); 

app.get('/api/admin/atendente', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      const atendentes = await Atendente.findAll({attributes: {exclude: ['senha']}});
      return res.send(atendentes);
    }
    catch (error)
    {
      console.log(error);
      return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
    }
  })();
});


app.put('/api/admin/atendente', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      const atendente = await Atendente.update(
      {
        nome: req.body.novoNome,
        senha: sha512(req.body.novaSenha)
      },
      {
        where:
        {
          nome: req.body.nome
        }
      });
      return res.json({auth: true, info: "✅ Atendente atualizado com sucesso!"});
    }
    catch (error)
    {
      console.log(error);
      return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
    }
  })();
});


app.delete('/api/admin/atendente', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      const atendente = await Atendente.destroy({where: {nome: req.body.nome}});
      return res.json({auth: true, info: "✅ Atendente excluido com sucesso!"});
    }
    catch (error)
    {
      console.log(error);
      return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
    }
  })();
});



//== Pedidos ===========================================

app.post('/api/admin/pedido/realizarPedido', (req, res) =>
{
  (async() =>
  {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    console.log(possible.length);

    for (var i = 0; i < 4; i++)
    {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    try
    {
      console.log(req.body.pedido);
      let varPedido = {
        observacao: req.body.observacaoPedido,
        opcaoDeEntrega: req.body.opcaoDeEntrega,
        status: "Aberta",
        clienteFixo: "Não",
        tipoPagamento: req.body.tipoPagamento,
        valorTotal: req.body.totalPedido,
        valorDesconto: 0,
        valorFinal: 0,
        codigo:text
      }
      
      let pedidoCriado = await Pedido.create(varPedido);

      
      for(let i = 0; i < req.body.pedido.length; i++)
      {
        let produto = await Produto.findOne({where: {id: req.body.pedido[i].id}}); 

        let item = {
          nome: req.body.pedido[i].nome,
          observacao: req.body.pedido[i].observacao,
          quantidade: req.body.pedido[i].quantidade,
          variacao: req.body.pedido[i].variacao,
          total: req.body.pedido[i].total,
        }
        produto.quantidadeDisponivel = produto.quantidadeDisponivel - req.body.pedido[i].quantidade;
        await produto.save();


        let itemzin = await ItemPedido.create(item);
        itemzin.setProduto(produto);
        itemzin.setPedido(pedidoCriado);
      }

      var tempPedido = await Pedido.findOne({where: {id: pedidoCriado.id}, raw: true});
      var tempItem = await ItemPedido.findAll({where: {PedidoId: tempPedido.id},include: [{model: Produto}], raw: true});

      let pedidoFeito =
      {
        pedido: tempPedido,
        itens : tempItem
      }

      return res.json({pedidoFeito:pedidoFeito, auth: false, info: "✅ Pedido feito com sucesso!"});
    }
    catch (error)
    {
      console.log(error);
      return res.json({auth: false, info: "❗️ Não foi possível entrar no sistema, por favor, tente novamente!"});
    }
  })();  
}); 



app.get('/api/admin/pedidosAbertos', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      var arraypedidoEmAberto = [];
      var tempPedidos = await Pedido.findAll({where: {status: "Aberta"}});

      for (let i = 0; i < tempPedidos.length; i++)
      {
        var tempPedido = tempPedidos[i];
        var tempItem = await ItemPedido.findAll({where: {PedidoId: tempPedido.id}, include: Produto});


        let pedidoEmAberto =
        {
          pedido: tempPedido,
          itens : tempItem
        }

        arraypedidoEmAberto.push(pedidoEmAberto);
      }

      return res.json({arraypedidoEmAberto:arraypedidoEmAberto, auth: false, info: "✅ Pedido feito com sucesso!"});
    }
    catch (error)
    {
      console.log(error);
      return res.json({auth: false, info: "❗️ Não foi possível entrar no sistema, por favor, tente novamente!"});
    } 
  })();  
}); 


app.post('/api/admin/pedido/finalizarPedido', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      var pedido = await Pedido.findOne({where: {codigo: req.body.codigo}});

      pedido.status = req.body.status;

      if(req.body.status === "Cancelado")
      {
        for(let i = 0; i < req.body.pedido.length; i++)
        {
          let produto = await Produto.findOne({where: {id: req.body.pedido[i].ProdutoId}});
          produto.quantidadeDisponivel = produto.quantidadeDisponivel + req.body.pedido[i].quantidade;
          await produto.save();
        }
      }

      await pedido.save();

      return res.json({ auth: false, info: "✅ Pedido feito com sucesso!"});
    }
    catch (error)
    {
      console.log(error);
      return res.json({auth: false, info: "❗️ Não foi possível entrar no sistema, por favor, tente novamente!"});
    } 
  })();  
}); 



//== Login ===========================================

app.post('/api/admin/login', (req, res) =>
{
  (async() =>
  {
    try
    { 
      console.log(req.body);
      const atendente = await Atendente.findOne({ where: { nome: req.body.nome, senha:sha512(req.body.senha)}});
      console.log(atendente);

      if(atendente != null)
      {
        const token = jwt.sign({ id: atendente.id }, SECRET, { expiresIn: "1h" });
        return res.json({auth: true, token: token, info: "✅ Login realizado com sucesso!"});
      }
      else
      {
        return res.json({auth: false, token: null, info: "❗️ Não foi possível entrar no sistema, por favor, tente novamente!"});
      }
    }
    catch (error)
    {
      console.log(error);
      return res.json({auth: false, token: null, info: "❗️ Não foi possível entrar no sistema, por favor, tente novamente!"});
    }
  })();  
});


app.get('/api/admin/verificarAutenticao', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      return res.json({auth: true, info: "✅ Você está logado!"});
    }
    catch (error)
    {
      console.log(error);
      return res.json({auth: false, info: "❗️ Você não está logado!"});
    }
  })();  
}); 



app.get('/api/admin/logout', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      blackListJWT.push(req.headers['authorization']);
      console.log(blackListJWT);
      return res.json({auth: false, info: "✅ Você fez o logout!"});
    }
    catch (error)
    {
      console.log(error);
      return res.json({auth: false, info: "❗️ Você não está logado!"});
    }
  })();  
});


//MAIN ===============================================================================================================================

app.listen(port, () =>
{
  console.log('App rodando no ip ' + ip.address() + ' na porta ' + port);
})