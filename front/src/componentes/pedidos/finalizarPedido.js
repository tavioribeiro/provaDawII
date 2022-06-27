
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


  import CardsProdutos from './cardProdutos';

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

function FinalizarPedido(props)
{
    var [popover, setPopover] = useState(false);

    useEffect(() =>
    {
      //document.getElementById("finalizarPedido").classList.add('animate__animated', 'animate__fadeIn');
      //document.getElementById("finalizarPedido").style.display = "block";
    }, []);

    var [timeToReload, setTimeToReload] = useState(15);

    useEffect(() =>
    {
      var interval = setInterval(() =>
      {
        if(timeToReload > 0)
        {
          setTimeToReload(timeToReload - 1);
        } 
      }, 1000);

      if(timeToReload == 0)
      {
        window.location.reload();
      }

      return () => clearInterval(interval);
    }, [timeToReload]);

    return (
        <Box
            display="none"
            id='finalizarPedido'
            backgroundColor="white"
            width="100%"
            paddingTop="10px"
            height="auto"
        >
            <Flex 
                backgroundColor="white"
                padding="35px"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-between"
                >
                <Text fontFamily="'Quicksand', sans-serif" fontSize="25px" textAlign="center" color="#484848">Prontinho, o seu pedido já foi enviado para os nossos atendentes.</Text>
            
                <br/>
                <Text fontFamily="'Quicksand', sans-serif" fontSize="25px" textAlign="center" color="#484848">O código do seu pedido é: <Text fontFamily="'Quicksand', sans-serif" fontSize="30px" textAlign="center" fontWeight="bold" color="#484848">{props.pedidoFeito.pedido.codigo}</Text></Text>
                <br/>
                <br/>
                <br/>
                <br/>
                <Text fontFamily="'Sacramento', cursive" fontSize="32px" textAlign="center" color="#484848">Obrigada pela preferência, Fê!</Text>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Text fontFamily="'Quicksand', sans-serif" fontSize="15px" textAlign="center" color="#484848">Voltando ao inicio em {timeToReload} </Text>
            </Flex>
        </Box>
    );
}

export default FinalizarPedido;
