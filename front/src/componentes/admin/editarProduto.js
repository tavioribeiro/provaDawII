
import { chakra, Box, Flex, useColorModeValue, HStack, ChakraProvider } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Animation from '../../generalFunctions/animations.js';

import
{
    Text,
    Image, 
   // Button,
  } from 'rebass'

  import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure
  } from '@chakra-ui/react'

  import {

    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,Heading
  } from '@chakra-ui/react'



  import { Label, Input, Select } from '@rebass/forms'

  import { MdOutlineArrowBackIosNew } from 'react-icons/md';
  import { BsCart } from 'react-icons/bs';
  

  import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    ButtonGroup
  } from '@chakra-ui/react'

function EditarProduto(props)
{
    var [popover, setPopover] = useState(false);


    useEffect(() =>
    {   
        if(props.id.tipo === "Bebidas Alcoólicas")
        {
            document.getElementById('editarQuantidadeProduto' + props.id.id).value = props.id.quantidadeDisponivel;
        
            document.getElementById('editarPreco100mlProduto' + props.id.id).value = props.id.preco100ml;
            document.getElementById('editarPreco210mlProduto' + props.id.id).value = props.id.preco210ml;
            document.getElementById('editarPreco400mlProduto' + props.id.id).value = props.id.preco400ml;
        }
        else
        {
            document.getElementById('editarQuantidadeProduto' + props.id.id).value = props.id.quantidadeDisponivel;
            document.getElementById('editarPrecoUnidadeProduto' + props.id.id).value = props.id.precoUnidade;
        }
    }, []);


    async function editarPedido()
    {
        setEstaCarregando(true);
        var bodi = {};


        if(props.id.tipo === "Bebidas Alcoólicas")
        {
            bodi = {
                id: props.id.id,
                quantidadeDisponivel:document.getElementById('editarQuantidadeProduto' + props.id.id).value,
                precoUnidade:0,
                preco100ml:document.getElementById('editarPreco100mlProduto' + props.id.id).value,
                preco210ml:document.getElementById('editarPreco210mlProduto' + props.id.id).value,
                preco400ml:document.getElementById('editarPreco400mlProduto' + props.id.id).value,
            }
        }
        else
        {
            bodi = {
                id: props.id.id,
                quantidadeDisponivel:document.getElementById("editarQuantidadeProduto" + props.id.id).value,
                precoUnidade:document.getElementById("editarPrecoUnidadeProduto" + props.id.id).value,
                preco100ml:0,
                preco210ml:0,
                preco400ml:0,
            }
        }


        axios.put(props.server + '/api/admin/produto',
        bodi,
        {
            headers:
            {
                'authorization': localStorage.getItem('token'),
            }
        })
        .then(function (response)
        {
            console.log(response);
            
            setPopover(false);
            
            props.getProduto();
            setEstaCarregando(false);
        })
        .catch(function (error)
        {
            console.log(error);
            setEstaCarregando(false);
        });
    }


    async function deletarProduto()
    {
        console.log(props.id.id);
        axios.delete(props.server + '/api/admin/produto',
        
        {
            headers:
            {
                'authorization': localStorage.getItem('token'),
            },
            data:
            {
                id:props.id.id
            }
        })
        .then(function (response)
        {
            console.log(response);
            
            setPopover(false);
            
            props.getProduto();
            setEstaCarregando(false);
        })
        .catch(function (error)
        {
            console.log(error);
        });
    }


    var [estaCarregando, setEstaCarregando] = useState(false);

    return(
        <ChakraProvider>
            <Popover isOpen={popover}>
            <PopoverTrigger>
                <Flex onClick={()=>setPopover(true)} justifyContent="center">🛠</Flex>
            </PopoverTrigger>
            <PopoverContent _focus={{outline:"0", border:"3px solid #4CFF89",}}>
                <PopoverArrow />
                <PopoverCloseButton onClick={()=>setPopover(false)} _focus={{outline:"0", border:"3px solid #4CFF89",}} />
                <PopoverHeader fontWeight="600" fontFamily="'Quicksand', sans-serif">Editar {props.id.nome}</PopoverHeader>
                <PopoverBody>
                    <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor={'editarQuantidadeProduto' + props.id.id}>Quantidade Disponível</Label>
                    <Input
                        id={'editarQuantidadeProduto' + props.id.id}
                        name={'editarQuantidadeProduto' + props.id.id}
                        type='number'
                        placeholder='11'
                        sx={{borderRadius: "30px",}}
                        fontFamily="'Quicksand', sans-serif"
                    /> 
                    <br></br>

                    {
                        props.id.tipo === "Bebidas Alcoólicas" 
                        ?
                            <>
                            <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor={'editarPreco100mlProduto' + props.id.id}>Preço por 100ml</Label>
                            <Input
                                id={'editarPreco100mlProduto' + props.id.id}
                                name={'editarPreco100mlProduto' + props.id.id}
                                type='number'
                                placeholder='3.50'
                                sx={{borderRadius: "30px",}}
                                fontFamily="'Quicksand', sans-serif"
                            /> 
                            <br/>
                            <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor={'editarPreco210mlProduto' + props.id.id}>Preço por 210ml</Label>
                            <Input
                                id={'editarPreco210mlProduto' + props.id.id}
                                name={'editarPreco210mlProduto' + props.id.id}
                                type='number'
                                placeholder='10.90'
                                sx={{borderRadius: "30px",}}
                                fontFamily="'Quicksand', sans-serif"
                            /> 
                            <br/>
                            <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor={'editarPreco400mlProduto' + props.id.id}>Preço por 400ml</Label>
                            <Input
                                id={'editarPreco400mlProduto' + props.id.id}
                                name={'editarPreco400mlProduto' + props.id.id}
                                type='number'
                                placeholder='14,90'
                                sx={{borderRadius: "30px",}}
                                fontFamily="'Quicksand', sans-serif"
                            />
                        </>
                        :
                            <>
                            <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor={'editarPrecoUnidadeProduto' + props.id.id}>Preço por Unidade</Label>
                            <Input
                                id={'editarPrecoUnidadeProduto' + props.id.id}
                                name={'editarPrecoUnidadeProduto' + props.id.id}
                                type='number'
                                placeholder='2.70'
                                sx={{borderRadius: "30px",}}
                                fontFamily="'Quicksand', sans-serif"
                            /> 
                            </>
                    }

                    
                    <br></br>
                    <Flex flexDirection="row" justifyContent="center" alignItems="center">
                        <Button isLoading = {estaCarregando} loadingText='Alterando...' borderRadius="30px" variant='solid' marginRight="10px"  onClick={()=>editarPedido()} backgroundColor="#4CFF89" _focus={{outline:"0", border:"0px solid #4CFF89",}}><Text fontSize="14px" fontWeight="bold" fontFamily="'Quicksand', sans-serif">Salvar Alteração</Text></Button>
                        <Button isLoading = {estaCarregando} loadingText='Exluindo...' spinnerPlacement='end'  borderRadius="30px" variant='solid' onClick={()=>deletarProduto()} marginLeft="10px"  backgroundColor="#FF544C"   _focus={{outline:"0", border:"0px solid #4CFF89",}}><Text fontSize="14px" fontWeight="bold" fontFamily="'Quicksand', sans-serif">Excluir Produto</Text></Button>        
                    </Flex>
                </PopoverBody>
            </PopoverContent>
            </Popover>
        </ChakraProvider>
    );
}

export default EditarProduto;
