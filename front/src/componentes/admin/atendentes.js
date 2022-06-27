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
    Button,
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



//var server = "http://localhost:3001";
//var server = "http://192.168.0.107:3001";



function Atendentes(props)
{
    var server = props.server;

    
    function changeComponent(from, to)
	{
		Animation.fadeFromTo(from,to);

		setTimeout(function()
		{
			props.setComponent(to);
		}, 1010);
	}
    
    async function criarAtendente()
    {
        //console.log("criarAtendente");
        //setEstaCarregando(true);
        axios.post(server + '/api/admin/atendente',
        {
            nome: document.getElementById('nomeC').value,
            senha: document.getElementById('senhaC').value,
            telefone: document.getElementById('telefoneC').value,
            descricao: document.getElementById('descricaoC').value,
        },
        {
            headers:
            {
                'authorization': localStorage.getItem('token'),
            }
        })
        .then(function (response)
        {
            console.log(response);
            document.getElementById("aviso2").textContent = response.data.info;
            Animation.clearInputs(["nomeC", "senhaC", "telefoneC", "descricaoC"]);
            Animation.fadeInFadeOut('aviso2');
        })
        .catch(function (error)
        {
            console.log(error);
            document.getElementById("aviso2").textContent = "❗️ Não foi possível cadastrar o atendente no sistema, por favor, tente novamente!";
            Animation.fadeInFadeOut('aviso2');
        });
    }

    var [estaCarregando, setEstaCarregando] = useState(false);

    return(
        <>
        <Box display="none" id='atendentesAdmin'>
            <Flex 
                justifyContent='center'
                alignItems='center'
                margin="20px"
                flexDirection="column"
            >
                <Box width="100%" paddingBottom="20px">
                    <Flex flexDirection="row"  alignItems="center" onClick={()=>{changeComponent("atendentesAdmin","menuDashboard")}}>
                        <MdOutlineArrowBackIosNew ></MdOutlineArrowBackIosNew>
                        <Text paddingLeft="5px">Voltar</Text>
                    </Flex>
                </Box>
                <Flex
                    backgroundColor="#EEEEEE"
                    justifyContent="center"
                    padding="40px"
                    width={[ "95%", "80%", "40%" ]}
                    color='black'
                    flexDirection="column"
                    >
                    <Text
                    fontSize={[ "22px", "26px", "30px" ]}
                    fontWeight='bold'
                    color='black'
                    >
                    Adicionar Atendente
                    </Text>
                    <br/>
                    <Box>
                        <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='nomeC'>Nome (Primeiro Nome Apenas)</Label>
                        <Input
                            id='nomeC'
                            name='nomeC'
                            placeholder='Fernanda'
                            sx={{borderRadius: "30px",}}
                                fontFamily="'Quicksand', sans-serif"
                        />
                
                        <br/>
                
                        <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='senhaC'>Senha</Label>
                        <Input
                            id='senhaC'
                            name='senhaC'
                            type="password"
                            placeholder='********'
                            sx={{borderRadius: "30px",}}
                                fontFamily="'Quicksand', sans-serif"
                        />  

                        <br/>

                        <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='telefoneC'>Telefone</Label>
                        <Input
                            id='telefoneC'
                            name='telefoneC'
                            type='tel'
                            placeholder='(34) 99999-9999'
                            sx={{borderRadius: "30px",}}
                                fontFamily="'Quicksand', sans-serif"
                        /> 

                        <br/>

                        <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='descricaoC'>Descrição</Label>
                        <Input
                            id='descricaoC'
                            name='descricaoC'
                            type="text"
                            placeholder='Responsável por...'
                            sx={{borderRadius: "30px",}}
                                fontFamily="'Quicksand', sans-serif"
                        />   
                    
                
                        <br/>
                
                        <Flex justifyContent="center" flexDirection="column">
                            
                            <ChakraProvider>
                                <Button isLoading = {estaCarregando} loadingText='Cadastrando...' spinnerPlacement='end' onClick={()=>criarAtendente()} borderRadius="30px" variant='solid' marginLeft="10px"  backgroundColor="#4CFF89"   _focus={{outline:"0", border:"0px solid #4CFF89",}}><Text fontSize="14px" fontWeight="bold" fontFamily="'Quicksand', sans-serif">Cadastrar Atendente</Text></Button>
                            </ChakraProvider>
                            <br/>
                            <Text id='aviso2' fontSize="13px" display="block" color="black" className='simpleText aviso2' textAlign="left"></Text>
                    </Flex>
                    </Box>
                </Flex>
            </Flex>
        </Box>
        </>
    );
}

export default Atendentes;

