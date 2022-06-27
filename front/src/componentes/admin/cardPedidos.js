/* MÓDULOS REACT */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Animation from '../../generalFunctions/animations.js';



import {
  Box,
  Flex,
  Image,
  Text,
} from 'rebass'


import {
    ChakraProvider,
    Table,
    Thead,
    Tbody,
    Tfoot,
  Button,

    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

  import {
    Label,
    Input,
    Select,
    Textarea,
    Radio,
    Checkbox,
  } from '@rebass/forms'

import { MdOutlineArrowBackIosNew } from 'react-icons/md';



//var server = "http://localhost:3001";
//var server = "http://192.168.0.107:3001";



function CardsPedidos(props)
{
    var server = props.server;
/* 
    const [listaPedidos, setListaPedidos] = useState([]);

    
    useEffect(() =>
    {
        getPedido();
    }, []);

    
    var server = props.server;


    useEffect(() =>
    {
        //document.getElementById('nomeProduto').style.display = "block";
    }, []);
    
   
    

    async function getPedido()
    {
        axios.get(server + '/api/admin/pedido',
        {
            headers:
            {
                'authorization': localStorage.getItem('token'),
            }
        })
        .then(function (response)
        {
            console.log(response.data);
            setListaProdutos(response.data);
        })
        .catch(function (error)
        {
            console.log(error);
            document.getElementById("avisoProduto").textContent = "❗️ Não foi possível entrar no sistema, por favor, tente novamente!";
            Animation.fadeInFadeOut('avisoProduto');
        });
    }
 */
    
    var [estaCarregando, setEstaCarregando] = useState(false);
 
    useEffect (() =>
    {
        
        console.log("----------------------------------");
        console.log(props.objeto);
        console.log("----------------------------------");
    }, []);
    


    async function finalizarPedido(status)
    {
        setEstaCarregando(true);

        axios.post(server + '/api/admin/pedido/finalizarPedido',
        {
            codigo: props.objeto.pedido.codigo,
            status: status,
            pedido: props.objeto.itens,
        },
        {
            headers:
            {
                'authorization': localStorage.getItem('token'),
            }
        })
        .then(function (response)
        {
            //console.log(response);
            
            
            document.getElementById("boxAdmin" + props.objeto.pedido.id).classList.add('animate__animated', 'animate__bounceOut');

            setTimeout(function()
            {
                document.getElementById("boxAdmin" + props.objeto.pedido.id).style.display = "none";
                //props.getPedido();
            }, 990);

            setEstaCarregando(false);
            

        })
        .catch(function (error)
        {
            console.log(error);
            /* document.getElementById("aviso2").textContent = "❗️ Não foi possível cadastrar o atendente no sistema, por favor, tente novamente!";
            Animation.fadeInFadeOut('aviso2'); */
        });
    }


   

    return(
        <>
        <Box id={"boxAdmin" + props.objeto.pedido.id} width="100%" margin="15px" padding="15px"
            backgroundColor="white"
            borderRadius="10px" 
            
    
            sx={{
                borderRadius: "30px",
                border:"1px solid #484848",
                boxShadow: "7px 7px 7px rgba(72, 72, 72, 0.30)",

                '@media screen and (min-width: 0px) and (max-width: 400px)':
                {
                width:"100%"
                },

                '@media screen and (min-width: 401px) and (max-width: 900px)':
                {
                width:"100%"
                }
            }}
        
        >
            <Flex
                sx={{
                    '@media screen and (min-width: 0px) and (max-width: 400px)':
                    {
                        flexWrap:"wrap"
                    },

                    '@media screen and (min-width: 401px) and (max-width: 900px)':
                    {
                        flexWrap:"wrap"
                    }
                }}
            >
                <Box width={1/3} padding="10px">
                    <Flex flexDirection="column" justifyContent="space-between" height="100%">
                        <Box >  
                            <Box textAlign="center">  
                                <Text fontFamily="'Quicksand', sans-serif" fontWeight="400" color="#484848" fontSize="16px">┏━━━✦❘༻༺❘✦━━━┓</Text>
                                <Text fontFamily="'Quicksand', sans-serif" fontWeight="bold" color="#484848" fontSize="16px"> {props.objeto.pedido.codigo} </Text>
                                <Text fontFamily="'Quicksand', sans-serif" fontWeight="400" color="#484848" fontSize="16px">┗━━━✦❘༻༺❘✦━━━┛</Text>
                            </Box>
                        <br></br>
                        <Text fontFamily="'Quicksand', sans-serif" fontWeight="500" color="#484848" fontSize="16px">➔ {props.objeto.pedido.opcaoDeEntrega}</Text>
                        <br></br>
                        <Text fontFamily="'Quicksand', sans-serif" fontWeight="500" color="#484848" fontSize="16px">➔ {props.objeto.pedido.tipoPagamento}</Text>
                        <br></br>
                        <Text fontFamily="'Quicksand', sans-serif" fontWeight="500" color="#484848" fontSize="16px">➔ Observação: {props.objeto.pedido.observacao}</Text>
                        <br></br>

                        <Text fontFamily="'Quicksand', sans-serif" fontWeight="500" color="#484848" fontSize="16px">➔ R${props.objeto.pedido.valorTotal}</Text>
                        <br></br>
                        </Box>
                        <Flex flexDirection="row" justifyContent="center" alignItems="center">
                            <ChakraProvider>
                                <Button isLoading = {estaCarregando} loadingText='Cancelando...' spinnerPlacement='end' borderRadius="30px" onClick={()=>finalizarPedido("Cancelado")} variant='solid' marginRight="10px"  backgroundColor="#FA9C39" _focus={{outline:"0", border:"0px solid #4CFF89",}}><Text fontSize="14px" fontWeight="bold" fontFamily="'Quicksand', sans-serif">CANCELAR COMPRA</Text></Button>
                                <Button isLoading = {estaCarregando} loadingText='Finalizando...' spinnerPlacement='end' borderRadius="30px" onClick={()=>finalizarPedido("Finalizado com Sucesso")} variant='solid' marginLeft="10px"  backgroundColor="#4CFF89"   _focus={{outline:"0", border:"0px solid #4CFF89",}}><Text fontSize="14px" fontWeight="bold" fontFamily="'Quicksand', sans-serif">FINALIZAR COMPRA</Text></Button>     
                            </ChakraProvider>
                        </Flex>
                    </Flex>
                    


                </Box>

                <div className="vl"></div>

                <Box width={2/3}>
                <Flex paddingTop="10px" paddingLeft="10px" textAlign="center" flexDirection="column"  justifyContent="space-between">
                
                <Text fontFamily="'Quicksand', sans-serif" fontWeight="bold" color="#484848" fontSize="16px"> Lista de Pedidos</Text>
                    <br></br>
                    <ChakraProvider>
                        <TableContainer>
                            <Table  size='sm'>
                                <Thead>
                                <Tr>
                                    <Th>Nome do Produto</Th>
                                    <Th>Variação</Th>
                                    <Th>Quantidade</Th>
                                    
                                </Tr>
                                </Thead>
                                <Tbody>
                                {
                                    props.objeto.itens.map(function(item)
                                    {
                                        return(
                                            <Tr key={item.id}>
                                                <Td>{item.Produto.nome}</Td>
                                                <Td>{item.variacao}</Td>
                                                <Td>{item.quantidade}</Td>
                                            </Tr>
                                        )
                                    })
                                }  
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ChakraProvider>
                </Flex>
                </Box>
            </Flex>
        </Box>

        </>
    );
}

export default CardsPedidos;

