
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

function RemoverPedido(props)
{
    var [popover, setPopover] = useState(false);

    return(
        <ChakraProvider>
            <Popover isOpen={popover}>
            <PopoverTrigger>
                <Flex onClick={()=>setPopover(true)} justifyContent="center">❌</Flex>
            </PopoverTrigger>
            <PopoverContent _focus={{outline:"0", border:"3px solid #4CFF89",}}>
                <PopoverArrow />
                <PopoverCloseButton onClick={()=>setPopover(false)} _focus={{outline:"0", border:"3px solid #4CFF89",}} />
                <PopoverHeader>Voce deseja remover este item?</PopoverHeader>
                <PopoverBody>
                    <ButtonGroup padding="10px" size='sm' isAttached variant='outline' _focus={{outline:"0", border:"3px solid #4CFF89",}}>
                        <Button _focus={{outline:"0", border:"3px solid #4CFF89",}} backgroundColor="#4CFF88" color="black" fontWeight="bold"  mr={2}  onClick={()=>{props.removePedido(props.id); setPopover(false);}}><Text fontFamily="'Quicksand', sans-serif">Sim</Text></Button>
                        <Button _focus={{outline:"0", border:"3px solid #4CFF89",}} backgroundColor="#4CFF88" color="black" fontWeight="bold"  mr={2}  onClick={()=>setPopover(false)}><Text fontFamily="'Quicksand', sans-serif">Nao</Text></Button>
                    </ButtonGroup>    
                </PopoverBody>
            </PopoverContent>
            </Popover>
        </ChakraProvider>
    );
}

export default RemoverPedido;
