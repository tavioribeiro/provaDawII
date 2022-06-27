/* MÓDULOS REACT */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Animation from '../../generalFunctions/animations.js';



import {
  Box,
  Flex,
  Button,
  Image,
  Text,
} from 'rebass'


import {
    ChakraProvider,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

import { Label, Input, Select } from '@rebass/forms'
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { IoReload } from 'react-icons/io5';

import CardsPedidos from './cardPedidos';

//var server = "http://localhost:3001";
//var server = "http://192.168.0.107:3001";



function Pedidos(props)
{
    var server = props.server;

    const [listaPedidos, setListaPedidos] = useState([]);

    
    useEffect(() =>
    {
        getPedido();
    }, []);

    function reload()
    {
        setListaPedidos([]);
        getPedido();
    }
    
    var server = props.server;


    
    
    function changeComponent(from, to)
	{
		Animation.fadeFromTo(from,to);

		setTimeout(function()
		{
			props.setComponent(to);
		}, 1010);
	}
    
    

    async function getPedido()
    {
        console.log("getPedido");
        axios.get(server + '/api/admin/pedidosAbertos',
        {
            headers:
            {
                'authorization': localStorage.getItem('token'),
            }
        })
        .then(function(response)
        {
            console.log(response.data);
            setListaPedidos(response.data.arraypedidoEmAberto);
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
        <Box display="none" id='pedidosAdmin'>
            <Flex 
                justifyContent='center'
                alignItems='center'
                margin="20px"
                flexDirection="column"
            >
                <Flex width="100%" paddingBottom="20px" justifyContent="space-between">
                    <Flex flexDirection="row"  alignItems="center" onClick={()=>{changeComponent("pedidosAdmin","menuDashboard")}}>
                        <MdOutlineArrowBackIosNew ></MdOutlineArrowBackIosNew>
                        <Text paddingLeft="5px">Voltar</Text>
                    </Flex>
                    <Flex flexDirection="row"  alignItems="center" onClick={()=>{reload()}}>
                        <Text paddingRight="5px">Recarregar</Text>
                        <IoReload ></IoReload>
                    </Flex>
                </Flex>
                <Flex
                    backgroundColor="#EEEEEE"
                    justifyContent="center"
                    padding="20px"
                    width="95%"
                    color='black'
                    flexDirection="column"
                    >
                    <Text
                    fontSize={[ "22px", "26px", "30px" ]}
                    fontWeight='bold'
                    color='black'
                    >
                    Pedidos em Aberto
                    </Text>
                    <Flex width="100%" justifyContent="center" flexWrap="wrap">
                        {listaPedidos.map(function(pedido)
                        {
                            return(
                                <CardsPedidos objeto={pedido} getPedido={getPedido} server={server}></CardsPedidos>
                            )
                        })}
                    </Flex>
                </Flex>
            </Flex>
        </Box>
        </>
    );
}

export default Pedidos;

