/* MÓDULOS REACT */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Animation from '../../generalFunctions/animations.js';

import EditarProduto from './editarProduto';

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
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,Button

  } from '@chakra-ui/react'

  import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'

import { Label, Input, Select } from '@rebass/forms'
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

//var server = "http://localhost:3001";
//var server = "http://192.168.0.107:3001";



function Produtos(props)
{
    var server = props.server;

    const [listaProdutos, setListaProdutos] = useState([]);
    var [tipoProduto, setTipoProduto] = useState("");
    
    useEffect(() =>
    {
        getProduto();
    }, []);

    
    var server = props.server;
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() =>
    {
        document.getElementById('nomeProduto').style.display = "block";
    }, [tipoProduto]);
    
    function changeComponent(from, to)
	{
		Animation.fadeFromTo(from,to);

		setTimeout(function()
		{
			props.setComponent(to);
		}, 1010);
	}
    

    async function getProduto()
    {
        axios.get(server + '/api/admin/produto',
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
            setEstaCarregando(false);
        })
        .catch(function (error)
        {
            console.log(error);
            document.getElementById("avisoProduto").textContent = "❗️ Não foi possível entrar no sistema, por favor, tente novamente!";
            Animation.fadeInFadeOut('avisoProduto');
            setEstaCarregando(false);
        });
    }

    

 
    async function getImagem(imagemName)
    {

        axios.post(server + '/api/admin/produto/produtoImagem',
        {
            imagemName: imagemName
        },
        {
            responseType: 'blob',
            headers:
            {
                'Content-Type': 'application/json',
                //'Accept': 'image/jpeg',
                'authorization': localStorage.getItem('token'),
            },
        })
        .then((response) =>
        {
            var file = new Blob([response.data], {type: 'image/jpeg'});
            var fileURL = URL.createObjectURL(file);
            var image = document.getElementById('image');
            image.src = fileURL;
        })
        .catch(function (error)
        {
            console.log(error);
            document.getElementById("avisoProduto").textContent = "❗️ Não foi possível entrar no sistema, por favor, tente novamente!";
            Animation.fadeInFadeOut('avisoProduto');
            setEstaCarregando(false);
        });
    }

    

    async function criarProduto()
    {
        let bodyFormData = new FormData();

        if(document.getElementById('tipoProduto').value == "Bebidas Alcoólicas")
        {
            bodyFormData.append('precoUnidade', 0);
            bodyFormData.append('preco100ml', document.getElementById('preco100mlProduto').value);
            bodyFormData.append('preco210ml', document.getElementById('preco210mlProduto').value);
            bodyFormData.append('preco400ml', document.getElementById('preco400mlProduto').value);
        }
        else
        {
            bodyFormData.append('precoUnidade', document.getElementById('precoUnidade').value);
            bodyFormData.append('preco100ml', 0);
            bodyFormData.append('preco210ml', 0);
            bodyFormData.append('preco400ml', 0);
        }

        bodyFormData.append('nome', document.getElementById('nomeProduto').value);
        bodyFormData.append('descricao', document.getElementById('descricaoProduto').value);  
        bodyFormData.append('quantidadeDisponivel', document.getElementById('quantidadeProduto').value);
        bodyFormData.append('ingredientes', document.getElementById('ingredientesProduto').value);
        bodyFormData.append('tipo', document.getElementById('tipoProduto').value);
        bodyFormData.append('file', document.getElementById('imagemProduto').files[0]);

        axios.post(server + '/api/admin/produto/criarProduto',
        bodyFormData,
        {
            headers:
            {
                'authorization': localStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
            }
        })
        .then(function (response)
        {
            console.log(response);
            document.getElementById("avisoProduto").textContent = response.data.info;
            //Animation.clearInputs(["nomeProduto", "descricaoProduto", "precoProduto", "quantidadeProduto", "ingredientesProduto", "imagemProduto"]);
            Animation.fadeInFadeOut('avisoProduto');
            getImagem(response.data.imagemName);
            //Animation.clearInputs(["nomeProduto", "descricaoProduto", "precoUnidade", "preco100mlProduto", "preco210mlProduto", "preco400mlProduto", "quantidadeProduto", "ingredientesProduto", "imagemProduto"]);
            getProduto();
        })
        .catch(function (error)
        {
            console.log(error);
            document.getElementById("avisoProduto").textContent = "❗️ Não foi possível cadastrar o atendente no sistema, por favor, tente novamente!";
            Animation.fadeInFadeOut('avisoProduto');
            setEstaCarregando(false);
        }); 
    }



    function validarCampos(inputArray, image)
    {
        setEstaCarregando(true);

            console.log(inputArray);
            let valido = true;


            if(document.getElementById('tipoProduto').value == "Bebidas Alcoólicas")
            {
                var inputArrayTipo = ["preco100mlProduto", "preco210mlProduto", "preco400mlProduto"];
                for(let i = 0; i < inputArray.length; i++)
                {
                    if(document.getElementById(inputArray[i]).value == "" || document.getElementById(inputArray[i]).value == null)
                    {
                        valido = false;
                        break;
                    }
                }
            }
            else
            {
                if(document.getElementById("precoUnidade").value == "" || document.getElementById("precoUnidade").value == null)
                {
                    valido = false;
                }
            }


            for(let i = 0; i < inputArray.length; i++)
            {
                if(document.getElementById(inputArray[i]).value == "" || document.getElementById(inputArray[i]).value == null)
                {
                    valido = false;
                    break;
                }
            }
        
            if(document.getElementById(image).value === "")
            {
                valido = false;
            }

            if(valido)
            {
                criarProduto();
            }
            else
            {
                document.getElementById("avisoProduto").textContent = "❗️ Por favor, preencha todos os campos!";
                Animation.fadeInFadeOut('avisoProduto');
                setEstaCarregando(false);
            }
    }

    var [estaCarregando, setEstaCarregando] = useState(false);

    return(
        <>
        <Box display="none" id='produtosAdmin'>
            <Flex 
                justifyContent='center'
                alignItems='center'
                margin="20px"
                flexDirection="column"
            >
                <Box width="100%" paddingBottom="20px">
                    <Flex flexDirection="row"  alignItems="center" onClick={()=>{changeComponent("produtosAdmin","menuDashboard")}}>
                        <MdOutlineArrowBackIosNew ></MdOutlineArrowBackIosNew>
                        <Text paddingLeft="5px">Voltar</Text>
                    </Flex>
                </Box>
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
                    Produto Cadastrados
                    </Text>
                    <ChakraProvider>
                        <TableContainer>
                            <Table  size='sm'>
                                <TableCaption>Produtos Cadastrados</TableCaption>
                                <Thead>
                                <Tr>
                                    <Th fontWeight='800' color='#5D912B' fontFamily="'Quicksand', sans-serif">ID</Th>
                                    <Th fontWeight='800' color='#5D912B' fontFamily="'Quicksand', sans-serif">Nome</Th>
                                    <Th fontWeight='800' color='#5D912B' fontFamily="'Quicksand', sans-serif">Quantidade</Th>
                                    <Th fontWeight='800' color='#5D912B' fontFamily="'Quicksand', sans-serif">Preço</Th>
                                    <Th fontWeight='800' color='#5D912B' fontFamily="'Quicksand', sans-serif">Ingredientes</Th>
                                    <Th fontWeight='800' color='#5D912B' fontFamily="'Quicksand', sans-serif">Tipo</Th>
                                    <Th fontWeight='800' color='#5D912B' fontFamily="'Quicksand', sans-serif">Opções</Th>
                                </Tr>
                                </Thead>
                                <Tbody>
                                {
                                    listaProdutos.map(function(produto)
                                    {
                                        return(
                                            <Tr key={produto.id}>
                                                <Td fontWeight="500" fontFamily="'Quicksand', sans-serif">{produto.id}</Td>
                                                <Td fontWeight="500" fontFamily="'Quicksand', sans-serif">{produto.nome}</Td>
                                                <Td fontWeight="500" fontFamily="'Quicksand', sans-serif">{produto.quantidadeDisponivel}</Td>
                                                <Td fontWeight="500" fontFamily="'Quicksand', sans-serif">
                                                {
                                                    produto.tipo === "Bebidas Alcoólicas" 
                                                    ?
                                                        produto.preco100ml + "/" + produto.preco210ml + "/" + produto.preco400ml
                                                    :
                                                        produto.precoUnidade
                                                }
                                                </Td>
                                                <Td fontWeight="500" fontFamily="'Quicksand', sans-serif">{produto.ingredientes}</Td>
                                                <Td fontWeight="500" fontFamily="'Quicksand', sans-serif">{produto.tipo}</Td>
                                                <Td><EditarProduto getProduto={getProduto} server={server} id={produto}></EditarProduto></Td>
                                            </Tr>
                                        )
                                    })
                                }  
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ChakraProvider>
                </Flex>
            </Flex>
            <br></br>

            <Flex 
                justifyContent='center'
                margin="20px"
            >
            <Flex
                backgroundColor="#EEEEEE"
                justifyContent="center"
                padding="20px"
                width={[ "95%", "80%", "40%" ]}
                color='black'
                flexDirection="column"
                >
                <Text
                fontSize={[ "22px", "26px", "30px" ]}
                fontWeight='bold'
                color='black'
                >
                Adicionar Produto
                </Text>
                <br/>
                <Box>
                    <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='nomeProduto'>Nome</Label>
                    <Input
                        id='nomeProduto'
                        name='nomeProduto'
                        placeholder='Coca-Cola 350ml'
                        sx={{borderRadius: "30px",}}
                        fontFamily="'Quicksand', sans-serif"
                    />
            
                    <br/>

                    <Flex display="flex" flexDirection="row">
                        <Box width="100%" >
                            <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='tipoProduto'>Tipo</Label>
                            <Select
                                id='tipoProduto'
                                name='tipoProduto'
                                defaultValue='Bebidas não Alcoólicas'
                                sx={{borderRadius: "30px",}}
                                fontFamily="'Quicksand', sans-serif"
                                onChange={(e)=>{setTipoProduto(e.target.value)}}
                            >
                                <option>Bebidas não Alcoólicas</option>
                                <option>Bebidas Alcoólicas</option>
                                <option>Alimentos Salgados</option>
                                <option>Alimentos Doces</option>
                                <option>Doces</option>
                            </Select>
                        </Box>
                    </Flex>
                    <br/>
            
                    <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='descricaoProduto'>Descrição</Label>
                    <Input
                        id='descricaoProduto'
                        name='descricaoProduto'
                        type="text"
                        placeholder='Refrigerante carbonado.'
                        sx={{borderRadius: "30px",}}
                        fontFamily="'Quicksand', sans-serif"
                    />  

                    <br/>

                    
                    {
                    tipoProduto === "Bebidas Alcoólicas"
                    ?
                    <>
                        <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='preco100mlProduto'>Preço por 100ml</Label>
                        <Input
                            id='preco100mlProduto'
                            name='preco100mlProduto'
                            type='number'
                            placeholder='3.50'
                            sx={{borderRadius: "30px",}}
                            fontFamily="'Quicksand', sans-serif"
                        /> 
                        <br/>
                        <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='preco210mlProduto'>Preço por 210ml</Label>
                        <Input
                            id='preco210mlProduto'
                            name='preco210mlProduto'
                            type='number'
                            placeholder='10.90'
                            sx={{borderRadius: "30px",}}
                            fontFamily="'Quicksand', sans-serif"
                        /> 
                        <br/>
                        <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='preco400mlProduto'>Preço por 400ml</Label>
                        <Input
                            id='preco400mlProduto'  
                            name='preco400mlProduto'
                            type='number'
                            placeholder='14,90'
                            sx={{borderRadius: "30px",}}
                            fontFamily="'Quicksand', sans-serif"
                        />
                    </>
                    :
                    <>
                        <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='precoUnidade'>Preço por unidade</Label>
                        <Input
                            id='precoUnidade'
                            name='precoUnidade'
                            type='number'
                            placeholder='2,50'
                            sx={{borderRadius: "30px",}}
                            fontFamily="'Quicksand', sans-serif"
                        />
                    </>  
                    }

                    <br/>

                    <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='quantidadeProduto'>Quantidade</Label>
                    <Input
                        id='quantidadeProduto'
                        name='quantidadeProduto'
                        type="number"
                        placeholder='35'
                        sx={{borderRadius: "30px",}}
                        fontFamily="'Quicksand', sans-serif"
                    /> 
                      
                    <br/>

                    <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='ingredientesProduto'>Ingredientes</Label>
                    <Input
                        id='ingredientesProduto'
                        name='ingredientesProduto'
                        type='text'
                        placeholder='Agua gaseificada, açúcar, extrato de noz de cola, cafeína, corante caramelo IV, acidulante ácido fosfórico e aroma natural.'
                        sx={{borderRadius: "30px",}}
                        fontFamily="'Quicksand', sans-serif"
                    /> 

                    <br/>

                   
                    <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='imagemProduto'>Imagem</Label>
                    <Input
                        id='imagemProduto'
                        name='imagemProduto'
                        type='file'
                        placeholder='Imagem'
                        fontFamily="'Quicksand', sans-serif"
                    />
                   
                    <br/>

                    <br/>
            
                    <Flex justifyContent="center" flexDirection="column">
                        <ChakraProvider>
                            <Button isLoading = {estaCarregando} loadingText='Cadastrando...' spinnerPlacement='end' onClick={()=>validarCampos(["nomeProduto", "descricaoProduto", 'quantidadeProduto', 'ingredientesProduto', 'tipoProduto' ], 'imagemProduto')} borderRadius="30px" variant='solid' marginLeft="10px"  backgroundColor="#4CFF89"   _focus={{outline:"0", border:"0px solid #4CFF89",}}><Text fontSize="14px" fontWeight="bold" fontFamily="'Quicksand', sans-serif">Cadastrar Produto</Text></Button>
                        </ChakraProvider>
                        <br/>
                        <Text  id='avisoProduto' fontSize="13px" display="block" color="black" className='simpleText avisoProduto' textAlign="left"></Text>
                    </Flex>
                </Box>

                <img id="image"/>
            </Flex>
            </Flex>
        </Box>
        </>
    );
}

export default Produtos;

