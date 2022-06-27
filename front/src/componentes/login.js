/* MÓDULOS REACT */

import React, { useState, useEffect } from 'react';

import {
  Box,
  Flex,

  Image,
  Text,
} from 'rebass'

import axios from 'axios';

import * as Animation from '../generalFunctions/animations.js';

import { Label, Input, Textarea } from '@rebass/forms'
import DashBoard from './admin/dashboard.js';

import {Button,ChakraProvider } from "@chakra-ui/react";

//var ip = require('ip');
//import ip from './admin/dashboard.js';
//var server = "http://localhost:3001";
//var server = "http://192.168.0.107:3001";



function Login(props)
{
    var server = props.server;
    var[component, setComponent] = useState("loading");

    useEffect(() =>
    {
        document.getElementById("loading").style.display = "block";
        verificarAutenticao();
    }, []);

    function changeComponent(from, to)
	{
		Animation.fadeFromTo(from,to);

		setTimeout(function()
		{
			setComponent(to);
		}, 1000);
	}


    async function verificarAutenticao()
    {
        axios.get(server + '/api/admin/verificarAutenticao',
        {
            headers:
            {
                'authorization': localStorage.getItem('token'),
            }
        })
        .then(function (response)
        {
            if(response.data.auth == true)
            {
                changeComponent("loading", "menuDashboard");
            }
            else
            {
                changeComponent("loading", "login");
            }
        })
        .catch(function (error)
        {
            console.log(error);
            document.getElementById("avisoProduto").textContent = "❗️ Não foi possível entrar no sistema, por favor, tente novamente!";
            Animation.fadeInFadeOut('avisoProduto');
        });
    }

    

    async function fazerLogin()
    {
        setEstaCarregando(true);
        axios.post(server + '/api/admin/login',
        {
            nome: document.getElementById('nome').value,
            senha: document.getElementById('senha').value,
        })
        .then(function (response)
        {
            console.log(response);
            localStorage.setItem("token", response.data.token);
            document.getElementById("aviso").textContent = response.data.info;
            Animation.clearInputs(["nome", "senha"]);
            Animation.fadeInFadeOut('aviso');
            
            if(response.data.auth == true)
            {
                //abrirDashboard();
                changeComponent("login", "menuDashboard");
            }
            else
            {
                setEstaCarregando(false);
            }
            
            
        })
        .catch(function (error)
        {
            setEstaCarregando(false);
            console.log(error);
            document.getElementById("aviso").textContent = "❗️ Não foi possível entrar no sistema, por favor, tente novamente!";
            Animation.clearInputs(["nome", "senha"]);
            Animation.fadeInFadeOut('aviso');
        });
    }

    var [estaCarregando, setEstaCarregando] = useState(false);

  return(
        <>
        {
            component === "menuDashboard"
        ?
            <DashBoard server={props.server}></DashBoard>
        :
            <></>  
        }


        {
            component === "loading"
        ?
            <Box height="50vh" display="block" id="loading"
            >
                <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100%"
                >
                    <Image
					src="./accets/loading.gif"
					marginTop="10px"
					sx={{
						width: [ '180px','190px',"200px" ],
						borderRadius: 8,
					}}
				/>
                </Flex>
            </Box>
        :
            <></>  
        }

                 

        {
            component === "login"
        ?
            <Box display="none" id='login'>
            <Flex
                flexDirection='column' 
                alignItems='center' 
                justifyContent='center' 
                width='100%' 
                marginBottom='50px'
            >
            {/* LOGIN============================================================ */}
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
            Fazer Login
            </Text>
            <br/>
            <Box>
                <Label htmlFor='nome'>Nome</Label>
                <Input
                    id='nome'
                    name='nome'
                    placeholder='Fernanda'
                />
        
                <br/>
        
                <Label htmlFor='senha'>Senha</Label>
                <Input
                    id='senha'
                    name='senha'
                    type="password"
                    placeholder='********'
                />    
                
        
                <br/>
        
                <Flex justifyContent="center" flexDirection="column">
                    
                    <ChakraProvider>
                        <Button isLoading = {estaCarregando} loadingText='Fazendo Login...' spinnerPlacement='end' onClick={()=>fazerLogin()} borderRadius="30px" variant='solid' marginLeft="10px"  backgroundColor="#4CFF89"   _focus={{outline:"0", border:"0px solid #4CFF89",}}><Text fontSize="14px" fontWeight="bold" fontFamily="'Quicksand', sans-serif">Fazer Login</Text></Button>
                    </ChakraProvider>
                    <br/>
                    <Text id='aviso' fontSize="13px" display="block" color="black" className='simpleText aviso2' textAlign="left"></Text>
            </Flex>
            </Box>
        </Flex>

        <br/>
        <br/>
        <br/>
        <br/>

        {/* CREATE============================================================ */}

        
        </Flex>
        </Box>
        :
            <></>  
        }

        
        </>
    );
}

export default Login;
