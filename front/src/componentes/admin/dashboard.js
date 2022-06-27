/* MÓDULOS REACT */

import React, { useState, useEffect } from 'react';

import {
  Box,
  Flex,
  Button,
  Image,
  Text,
} from 'rebass'

import Produtos from './produtos';
import Pedidos from './pedidos';
import Atendentes from './atendentes';

import axios from 'axios';



import { Label, Input, Textarea } from '@rebass/forms'
import * as Animation from '../../generalFunctions/animations.js';
//var server = "http://localhost:3001";



function DashBoard(props)
{
  var server = props.server;
  var[component, setComponent] = useState("menuDashboard");

  useEffect(() =>
  {
    //document.getElementById("menuDashboard").style.display = "block";
  }, []);

  function changeComponent(from, to, mudarComponente)
	{
		Animation.fadeFromTo(from,to);

		setTimeout(function()
		{
			mudarComponente(to);
		}, 1000);
	}

  async function logout()
  {
    axios.get(server + '/api/admin/logout',
    {
      headers:
      {
        'authorization': localStorage.getItem('token'),
      }
    })
    .then(function (response)
    {
        console.log(response.data);
        localStorage.clear();
        window.location.reload();
    })
    .catch(function (error)
    {
        console.log(error);
        document.getElementById("avisoProduto").textContent = "❗️ Não foi possível entrar no sistema, por favor, tente novamente!";
        Animation.fadeInFadeOut('avisoProduto');
    });
  }

  return(
    <>
    
    {
      component === "produtosAdmin" 
      ?
        <Produtos server={props.server} setComponent={setComponent}></Produtos>
      :
        <></>  
    }

    {
      component === "pedidosAdmin" 
      ?
        <Pedidos server={props.server} setComponent={setComponent}></Pedidos>
      :
        <></>  
    }

    {
      component === "atendentesAdmin" 
      ?
        <Atendentes server={props.server} setComponent={setComponent}></Atendentes>
      :
        <></> 
    }
    

    {
      component === "menuDashboard" 
      ?
      <Box display="none" id='menuDashboard'>
        <Flex
            flexDirection='column' 
            alignItems='center' 
            justifyContent='center' 
            width='100%' 
            marginBottom='50px'
        >
          <Flex
          backgroundColor="#EEEEEE"
          flexDirection="column"
          padding="40px"
          width={[ "95%", "80%", "40%" ]}
          >
            <Text
              fontSize={[ "22px", "26px", "30px" ]}
              fontWeight='bold'
              color='black'
            >
              Menu
            </Text>
            <Flex
              justifyContent="start"
              paddingTop="10px"
              width="100%"
              color='black'
              flexWrap="wrap"
            >
              <Button backgroundColor="#4CFF88" margin="5px" color="black" fontWeight="bold" mr={2} onClick={()=>{changeComponent("menuDashboard", "pedidosAdmin", setComponent)}}>Pedidos</Button>
              <Button backgroundColor="#4CFF88" margin="5px" color="black" fontWeight="bold" mr={2} onClick={()=>{changeComponent("menuDashboard", "produtosAdmin", setComponent)}}>Produtos</Button>
              <Button backgroundColor="#4CFF88" margin="5px" color="black" fontWeight="bold" mr={2} onClick={()=>{changeComponent("menuDashboard", "atendentesAdmin", setComponent)}}>Atendentes</Button>
              <Button backgroundColor="#FF544C" margin="5px" color="black" fontWeight="bold" mr={2} onClick={()=>{logout()}}>Sair</Button>
            </Flex>
          </Flex>
            
          </Flex>
      </Box>
      :
      <></>  
    }
    </>
  );
}

export default DashBoard;
