

/* MÓDULOS REACT */
//import { Button } from "@chakra-ui/react"

/* COMPONENTES */


import React, { useState, useEffect } from 'react';




import {
  Box,
  Text,
  Flex,
  Image, 
  Button
} from 'rebass'

import * as Animation from '../generalFunctions/animations.js';

function Body(props) 
{
  useEffect(() =>
  {
    console.log("Body");  
    document.getElementById("filogin").style.display = "block";
    //document.getElementById("body").classList.add('animate__animated', 'animate__fadeIn');
  }, []);

  function changeComponent(from, to)
	{
    document.getElementById("filogin").style.display = "none";
    
		Animation.fadeFromTo(from,to);

		setTimeout(function()
		{
			props.setComponent(to);
		}, 1000);
	}

  return (
    <>
    <Box
      display="none"
        id='body'
        className='body'
        backgroundColor="white"
        width="100%"
        paddingTop="10px"
      >
        <Flex 
            backgroundColor="white"
            padding="35px"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            >
            <Text fontFamily="'Arapey', serif" fontSize="55px" textAlign="center" color="black">Bem vindo ao Laffê Cantinho de Minas</Text>
         
            <br/>
            <Text fontFamily="'Quicksand', sans-serif" fontSize="25px" textAlign="center" color="#484848">Faça seu pedido no botao abaixo.</Text>
            <br/>
            <br/>
            <br/>
            <Button  backgroundColor="#4CFF88" color="black" fontWeight="bold"  mr={2}  onClick={()=>{changeComponent("body", "pedidosCliente")}}><Text fontFamily="'Quicksand', sans-serif">FAZER O PEDIDO</Text></Button>
            
        </Flex>
    </Box>
    </>
  );
}

export default Body;