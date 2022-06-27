import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

import DocumentMeta from 'react-document-meta';

import {
  Box,
  Card,
  Image,
  Heading,
  Text,
  Flex,
  Button,
} from 'rebass'


import Navbar from './componentes/navbar';
import Body from './componentes/body';
import Footer from './componentes/footer';
import Login from './componentes/login';
import PedidosCliente from './componentes/pedidos/pedidosCliente.js';




const meta = {
  title: 'Laffê Cantinho de Minas',
  description: 'Laffê Cantinho de Minas',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags, Laffê, Cantinho, de Minas, Laffê Cantinho de Minas, Araxá, shopping, drinks',
    }
  }
};



function App()
{
  //var[server, setServer] = useState("https://laffenode.herokuapp.com");
  var[server, setServer] = useState("http://192.168.1.5:3001");
  
  var[component, setComponent] = useState("body");

  useEffect(() =>
  {
    document.getElementById("body").style.display = "block";
  }, []);

  return(
    <DocumentMeta {...meta}>
      <Box 
        className='body'
        overflowX="hidden"
        display="flex" 
        flexDirection="column" 
        backgroundColor="white" 
        height="100vh" 
        width="100%" 
        //maxWidth="100%"
      >
        {/* NAVBAR--------------------------------- */}
        <Box >
          <Navbar></Navbar>
        </Box> 

        {/* BODY----------------------------------- */}
        <Box width="100vw">
        {
        component === "body"
        ?
          <Body setComponent={setComponent}></Body>
        :
          <></>  
        }

        {
        component === "pedidosCliente"
        ?
          <PedidosCliente server={server} setComponent={setComponent}></PedidosCliente>
        :
          <></>  
        }
        
        {
        component === "login"
        ?
          <Login server={server}></Login>
        :
          <></>  
        }
        </Box>
        
        {/* LINHA BRANCA--------------------------- */}
        <Box marginTop="auto" minHeight="1px" backgroundColor="white" ></Box>

        {/* FOOTER--------------------------------- */}
        <Box marginTop="auto" minHeight="50px" backgroundColor="black" >
          <Footer setComponent={setComponent}></Footer>
        </Box> 
      </Box>
    </DocumentMeta>
  );
}

export default App;
