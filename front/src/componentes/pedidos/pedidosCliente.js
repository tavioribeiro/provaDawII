
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
  import RemoverPedido from './removerPedido';
  import FinalizarPedido from './finalizarPedido';

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

function PedidosCliente(props)
{
    var server = props.server;
    const [listaProdutos, setListaProdutos] = useState([]);
    const [listaProdutosFiltro, setListaProdutosFiltro] = useState([]);

    var [pedidos, setPedidos] = useState([]);
    var [totalPedido, setTotalPedido] = useState(0);

    var[component, setComponent] = useState("pedidosClienteBody");
    var[pedidoFeito, setPedidoFeito] = useState({});

    function aplicarFiltro(filtro)
    {
        console.log(filtro);
        let tempListaProdutosFiltro = [];

        setListaProdutosFiltro([]);

        listaProdutos.map(function(produto)
        {
            if(filtro != "Todas")
            {
                if(produto.tipo == filtro)
                {
                    tempListaProdutosFiltro.push(produto);
                }
            }
            else
            {
                tempListaProdutosFiltro.push(produto);
            }
        });
        setListaProdutosFiltro(tempListaProdutosFiltro);
    }

    useEffect(() =>
    {
        getProduto();
        document.getElementById("pedidosClienteBody").style.display = "block";
    }, []);

    useEffect(() =>
    {
        baixarListaDeImagens();
    }, [listaProdutosFiltro]);



    function attPedidoTotal()
    {
        console.log(pedidos);
        let somaTotal = 0;

        pedidos.forEach(function(pedido)
        {
            somaTotal = somaTotal + parseFloat(pedido.total);
        });

        setTotalPedido(somaTotal.toFixed(2));
        console.log(somaTotal); 
    }




    


    function removePedido(id)
    {
        for(let i = 0; i < pedidos.length; i++)
        {
            if(pedidos[i].id == id)
            {   
                pedidos.splice(i, 1);
                setPedidos(pedidos);
                attPedidoTotal();
                break;
            }
        }
    }


    useEffect(() =>
    {
        baixarListaDeImagens();
        setListaProdutosFiltro(listaProdutos);

        document.getElementById("produtosClienteBoxCards").classList.add('animate__animated', 'animate__fadeIn');
        setTimeout(function()
        {
            document.getElementById("produtosClienteBoxCards").classList.remove('animate__animated', 'animate__fadeIn');
        }, 1000);
    }, [listaProdutos]);




    function changeComponent(from, to)
	{
        //realizarPedido();
        //setIsEnviando(true);
        onClose();
        setTimeout(() =>
        {
            Animation.fadeFromTo(from,to);

            setTimeout(function()
            {
                setComponent(to);
            }, 1010);
        }, 150); 
		
	}

    function changeComponentBack(from, to)
	{
    
		Animation.fadeFromTo(from,to);

		setTimeout(function()
		{
			props.setComponent(to);
		}, 1000);
	}
    

    async function getProduto()
    {
        axios.get(server + '/api/produto',
        {
            headers:
            {
                'authorization': localStorage.getItem('token'),
            }
        })
        .then(function (response)
        {
            setListaProdutos(response.data);
            //O THEN TA NO USEEFFECT    
        })
        .catch(function (error)
        {
            console.log(error);
            document.getElementById("avisoProduto").textContent = "❗️ Não foi possível entrar no sistema, por favor, tente novamente!";
            Animation.fadeInFadeOut('avisoProduto');
        });
    }

    function baixarListaDeImagens()
    {
        console.log(listaProdutos.length);

        for(var i = 0; i < listaProdutos.length; i++)
        {
            console.log(listaProdutos[i].imagem);
            getImagem(listaProdutos[i].imagem); 
        }
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
            var image = document.getElementById(imagemName);
            image.src = fileURL;
        })
        .catch(function (error)
        {
            console.log(error);
            //document.getElementById("avisoProduto").textContent = "❗️ Não foi possível entrar no sistema, por favor, tente novamente!";
            Animation.fadeInFadeOut('avisoProduto');
        });
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef();

    //var { isEnviando, setIsEnviando } = useState(true);

    
    
    async function realizarPedido()
    {
        setEstaCarregando(true);
        axios.post(server + '/api/admin/pedido/realizarPedido',
        {
            pedido: pedidos,
            totalPedido: totalPedido,
            opcaoDeEntrega: document.getElementById('opcaoDeEntrega').value,
            tipoPagamento: document.getElementById('tipoPagamento').value,
            observacaoPedido: document.getElementById('observacaoPedido').value,
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
            setPedidoFeito(response.data.pedidoFeito);
            changeComponent("pedidosClienteBody", "finalizarPedido");
            //setIsEnviando(false);
            /* document.getElementById("aviso2").textContent = response.data.info;
            Animation.clearInputs(["nomeC", "senhaC", "telefoneC", "descricaoC"]);
            Animation.fadeInFadeOut('aviso2'); */
        })
        .catch(function (error)
        {
            console.log(error);
            setEstaCarregando(false);
            /* document.getElementById("aviso2").textContent = "❗️ Não foi possível cadastrar o atendente no sistema, por favor, tente novamente!";
            Animation.fadeInFadeOut('aviso2'); */
        });
    }


    var [estaCarregando, setEstaCarregando] = useState(false);
    
    return(
        <>
        <Box
            display="none" id='pedidosCliente'
            width="100%"
        > 

        {
            component == "finalizarPedido"
            ?
                <FinalizarPedido pedidoFeito={pedidoFeito}></FinalizarPedido>
            :
                <></>
        }


        {
            component == "pedidosClienteBody"
            ?
            <>
            <Box
                display="none" id='pedidosClienteBody'
                width="100%"
            > 
                <Flex padding="20px" paddingRight="50px" justifyContent="space-between" flexDirection="row" alignItems="center" >
                    <Flex flexDirection="row" justifyContent="center" alignItems="center" onClick={()=>{changeComponentBack("pedidosCliente", "body")}}>
                        <MdOutlineArrowBackIosNew ></MdOutlineArrowBackIosNew>
                        <Text paddingLeft="5px">Voltar</Text>
                    </Flex>
                    <Flex flexDirection="row" justifyContent="center" alignItems="center">

                        <ChakraProvider>
                            <Button borderRadius="30px" position="fixed" top="5" right="5" leftIcon={<BsCart />} variant='solid' ref={btnRef} backgroundColor="#4CFF89" onClick={onOpen}  _focus={{outline:"0", border:"0px solid #4CFF89",}}><Text fontSize="14px" fontFamily="'Quicksand', sans-serif">VER O CARRINHO</Text></Button>
                        </ChakraProvider>
                        {/* <Text paddingRight="5px">Ver o Carrinho</Text>
                        <BsCart ></BsCart> */}
                    </Flex>
                </Flex>

            

                <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >            
                    <Flex
                        sx={{borderRadius: "30px",}}
                        backgroundColor="#F6F6F6"
                        justifyContent="center"
                        padding="0px"
                        width={["80%", "90%", "96%"]}
                        color='black'
                        flexDirection="column"
                        marginBottom="50px"
                
                        >
                        <Text
                        fontSize={[ "26px", "28px", "30px" ]}
                        /* fontWeight='bold' */
                        color='black'
                        fontFamily="'Arapey', serif"
                        margin={["15px", "20px", "30px"]}
                        >
                        Produtos Disponíveis
                        </Text>

                        

                        <Flex justifyContent="center"  flexDirection="column" >

                            <Box paddingLeft="30px" width="300px">
                                <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='filtroTipoProduto'>Tipo</Label>
                                <Select
                                    
                                    id='filtroTipoProduto'
                                    name='filtroTipoProduto'
                                    defaultValue='Todas'
                                    sx={{borderRadius: "30px",}}
                                    fontFamily="'Quicksand', sans-serif"
                                    onChange={(e) => aplicarFiltro(e.target.value) }
                                >
                                    <option value="Todas">Todas</option>
                                    <option value="Bebidas não Alcoólicas">Bebidas não Alcoólicas</option>
                                    <option value="Bebidas Alcoólicas">Bebidas Alcoólicas</option>
                                    <option value="Alimentos Salgados">Alimentos Salgados</option>
                                    <option value="Alimentos Doces">Alimentos Doces</option>
                                    <option value="Doces">Doces</option>
                                </Select>
                            </Box>
                        </Flex>

                        <br></br>

                        <Flex
                        flexWrap="wrap"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            '@media screen and (min-width: 0px) and (max-width: 400px)':
                            {
                                flexWrap: 'wrap',
                            },
            
                            '@media screen and (min-width: 401px) and (max-width: 900px)':
                            {
                                flexWrap: 'wrap',
                            }
                        }}
                        >
                            <Flex flexWrap="wrap"  flexDirection="row" justifyContent="center" alignItems="center" width="100%"   id="produtosClienteBoxCards">
                            {
                                listaProdutosFiltro.map(function(produto)
                                {
                                    return(
                                        <CardsProdutos attPedidoTotal={attPedidoTotal} pedidos={pedidos} setPedidos={setPedidos} key={produto.id} objeto={produto}></CardsProdutos>
                                    )
                                })
                            }  
                            </Flex>

                            <ChakraProvider>

                            <Drawer
                                isOpen={isOpen}
                                placement='right'
                                onClose={onClose}
                                finalFocusRef={btnRef}
                                size={"lg"}
                            >
                                <DrawerOverlay />
                                <DrawerContent>
                                <DrawerCloseButton _focus={{outline:"0", border:"3px solid #4CFF89",}} />
                                <DrawerHeader>
                                    <Text
                                    fontSize={[ "22px", "26px", "30px" ]}
                                    fontWeight='400' 
                                    color='black'
                                    fontFamily="'Arapey', serif"
                                    >Seu Carrinho</Text>
                                </DrawerHeader>

                                <DrawerBody >
                                    <Flex justifyContent="space-between">
                                        <Box width="100%">
                                        <ChakraProvider>
                                            <TableContainer>
                                                <Table  size='sm' width="100%">
                                                    <TableCaption>Produtos Adicionados</TableCaption>
                                                    <Thead>
                                                    <Tr>
                                                        <Th fontWeight='800' color='#5D912B' fontFamily="'Quicksand', sans-serif">Nome</Th>
                                                        <Th fontWeight='800' color='#5D912B' fontFamily="'Quicksand', sans-serif">Variação</Th>
                                                        <Th fontWeight='800' color='#5D912B' fontFamily="'Quicksand', sans-serif">Quantidade</Th>
                                                        <Th fontWeight='800' color='#5D912B' fontFamily="'Quicksand', sans-serif">Preço</Th>
                                                        <Th fontWeight='800' color='#5D912B' fontFamily="'Quicksand', sans-serif"><Flex justifyContent="center">Remover</Flex></Th>
                                                    </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                    {
                                                        pedidos.map(function(pedidos)
                                                        {
                                                            return(
                                                                <Tr key={pedidos.id}>
                                                                    <Td fontWeight="500" fontFamily="'Quicksand', sans-serif">{pedidos.nome}</Td>
                                                                    <Td fontWeight="500" fontFamily="'Quicksand', sans-serif">{pedidos.variacao}</Td>
                                                                    <Td fontWeight="500" fontFamily="'Quicksand', sans-serif">{pedidos.quantidade}</Td>
                                                                    <Td fontWeight="500" fontFamily="'Quicksand', sans-serif">{pedidos.total}</Td>
                                                                    <Td><RemoverPedido removePedido={removePedido} id={pedidos.id}></RemoverPedido></Td>
                                                                </Tr>
                                                            )
                                                        })
                                                    }  
                                                    </Tbody>
                                                </Table>
                                            </TableContainer>
                                        </ChakraProvider>
                                        </Box>
                                    </Flex>
                                </DrawerBody>

                                <DrawerFooter>

                                    <Flex flexDirection="column" width="100%" >
                                    <Heading as='h5' size='sm' fontFamily="'Quicksand', sans-serif">
                                        Total do pedido: R${totalPedido}
                                    </Heading>
                                    <br></br>

                                        <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor='observacaoPedido'>Alguma observação extra?</Label>
                                        <Input
                                            id='observacaoPedido'
                                            name='observacaoPedido'
                                            type='text'
                                            placeholder='Ex: Sem canudos.'
                                            sx={{borderRadius: "30px",}}
                                            fontFamily="'Quicksand', sans-serif"
                                        />

                                        <br></br>

                                        <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor="opcaoDeEntrega">Você vai consumir no local ou vai levar?</Label>
                                        <Select _focus={{outline:"0", border:"1px solid #4CFF89",}}
                                        id="opcaoDeEntrega"
                                        name="opcaoDeEntrega"
                                        defaultValue='Vou comer no Local'
                                        sx={{borderRadius: "30px",}}
                                        fontFamily="'Quicksand', sans-serif"
                                        >
                                        <option value="Vou comer no Local">Vou comer no Local</option>
                                        <option value="Vou levar">Vou levar</option>
                                        
                                        </Select>

                                        <br></br>
                                        
                                        <Label fontWeight="500" fontFamily="'Quicksand', sans-serif" htmlFor="tipoPagamento">Método de pagamento</Label>
                                        <Select _focus={{outline:"0", border:"1px solid #4CFF89",}}
                                        id="tipoPagamento"
                                        name="tipoPagamento"
                                        defaultValue='Dinheiro'
                                        sx={{borderRadius: "30px",}}
                                        fontFamily="'Quicksand', sans-serif"
                                        >
                                        <option value="Dinheiro">Dinheiro</option>
                                        <option value="Cartão de Crédito">Cartão de Crédito</option>
                                        <option value="Cartão de Débito">Cartão de Débito</option>
                                        <option value="Pix">Pix</option>
                                        
                                        </Select>
                                        
                                        <br></br>
                                        
                                        <Flex flexDirection="row" justifyContent="center" alignItems="center">
                
                                            <Button isLoading = {estaCarregando} borderRadius="30px" variant='solid' marginRight="10px" ref={btnRef}  onClick={onClose}  _focus={{outline:"0", border:"0px solid #4CFF89",}}><Text fontSize="14px" fontWeight="bold" fontFamily="'Quicksand', sans-serif">CANCELAR COMPRA</Text></Button>
                                        
                                            <Button isLoading = {estaCarregando} loadingText='Finalizando...' spinnerPlacement='end' onClick={()=>realizarPedido() } borderRadius="30px" variant='solid' marginLeft="10px" ref={btnRef} backgroundColor="#4CFF89"   _focus={{outline:"0", border:"0px solid #4CFF89",}}><Text fontSize="14px" fontWeight="bold" fontFamily="'Quicksand', sans-serif">FINALIZAR COMPRA</Text></Button>
                                    
                                        </Flex>
                                    </Flex>
                                    
                                    
                                </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
                            </ChakraProvider>
                        </Flex>
                        
                    </Flex>
                </Flex>
            </Box>
            </>
            :
            <></>
        }
            
        </Box>


       
        </>
    );
  };

  export default PedidosCliente;