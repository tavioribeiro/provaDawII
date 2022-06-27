
import React, { useState, useEffect } from 'react';
//import { chakra, Box, Flex, useColorModeValue, HStack } from "@chakra-ui/react";
//import { StarIcon } from "@chakra-ui/icons";

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
  ChakraProvider,
  ButtonGroup,
  IconButton,Divider,
  Button,

} from '@chakra-ui/react'

import { Label, Input } from '@rebass/forms'

import { Select } from '@chakra-ui/react'
import * as Animation from '../../generalFunctions/animations.js';

import { StarIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";
import
{
  Text,
  Image, 

  Flex,
  Box
} from 'rebass'


function CardsProdutos(props)
{
  var [quantidade, setQuantidade] = useState(1);
  var [precoUnidade, setPrecoUnidade] = useState(0);
  var [total, setTotal] = useState(0);
  var [variacao, setVariacao] = useState("Unidade");
  var [observacao, setObservacao] = useState("");

  var [popover, setPopover] = useState(false);


  useEffect(() =>
  {
    console.log(props.objeto);
    Animation.fadeIn("box" + props.objeto.id)
  }, []);



  useEffect(() =>
  {
    if(props.objeto.tipo === "Bebidas Alcoólicas")
    {
      setPrecoUnidade(props.objeto.preco100ml);
      setVariacao("100ml");
    }
    else
    {
      setPrecoUnidade(props.objeto.precoUnidade);
    }
  }, []);






  useEffect(() =>
  {
    setTotal((quantidade * precoUnidade).toFixed(2));
  }, [quantidade, precoUnidade]);

  

  

  function removeProduto()
  {
    if(quantidade === props.objeto.quantidadeDisponivel )
    {
      //nada
    }
    else
    {
      setQuantidade(quantidade + 1);     
    }
  }

  function addProduto()
  {
    setPopover(true);
    if(quantidade === 1)
    {
      //nada
    }
    else
    {
      setQuantidade(quantidade - 1);     
    }
  }

  let esteItem = 
  {
    id: props.objeto.id,
    nome: props.objeto.nome,
    observacao: observacao,
    quantidade: quantidade,
    variacao: variacao, 
    total: total,
  }

  function changeVariacao(value)
  {

    if(value === "100ml")
    {
      setPrecoUnidade(props.objeto.preco100ml);
      setVariacao("100ml");
    }
    if(value === "210ml")
    {
      setPrecoUnidade(props.objeto.preco210ml);
      setVariacao("210ml");
    }
    if(value === "400ml")
    {
      setPrecoUnidade(props.objeto.preco400ml);
      setVariacao("400ml");
    }

  }


  function addProdutoNoPedido()
  {
    let tempPedidos = props.pedidos;
    tempPedidos.push(esteItem);

    props.setPedidos(tempPedidos);  

    setPopover(false);

    props.attPedidoTotal();
  }
  
  
    return(
      <>
      <Box id={"box"+ props.objeto.id} width="49%" margin="5px" 
      backgroundColor="white"
      height="100%"
      
  
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
        <Flex>
            <Box minWidth={"180px"} >
              <Image
                id={props.objeto.imagem}
                sx={{
                  boxShadow:"inset -350px 0 100px 0 #FFF;",
                  boxSizing:"border-box",
                  borderRadius: "30px 0px 0px 30px"
                }}

                height="100%"
                />
            </Box>

            <Box width="100%">
              <Flex paddingTop="10px" paddingLeft="10px"  flexDirection="column" height="280px" justifyContent="space-between">
                <Box>
                  <Text fontFamily="'Arapey', serif" fontWeight="600"  fontStyle="italic" textAlign="center" color="#484848" fontSize="19px">{props.objeto.nome}</Text>
                  <Box paddingTop="5px" paddingRight="20px" paddingLeft="10px"><hr className="rounded"></hr></Box>
                </Box>
              
                <Text fontFamily="'Quicksand', sans-serif" fontWeight="500" color="#484848" fontSize="14px">➔ {props.objeto.descricao}</Text>
                <Text fontFamily="'Quicksand', sans-serif" fontWeight="500" color="#484848" fontSize="14px">➔ {props.objeto.ingredientes}</Text>
                
                {
                    props.objeto.tipo === "Bebidas Alcoólicas"
                  ?
                  <Text fontFamily="'Quicksand', sans-serif" fontWeight="500" color="#484848" fontSize="14px">➔ A partir de R${props.objeto.preco100ml.toFixed(2)}</Text>
                  :
                  <Text fontFamily="'Quicksand', sans-serif" fontWeight="500" color="#484848" fontSize="14px">➔ R${props.objeto.precoUnidade.toFixed(2)} por unidade</Text>
                }
                
                <Flex  justifyContent="end">
                  <ChakraProvider>
                  <Popover
                    isOpen={popover}
                  >
                    <PopoverTrigger>
                      <Button 
                        sx={{
                          borderRadius: "0px 0px 30px 0px",
                        }}
                        backgroundColor="#4CFF88" color="black" fontWeight="bold" _focus={{outline:"0", border:"3px solid #4CFF89",}}   onClick={()=>{addProduto(props.objeto.id)}}>
                          +
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent outline="none" boxShadow="opx" _focus={{outline:"0", border:"3px solid #4CFF89",}}
                    sx={{
                      borderRadius: "10px 10px 10px 10px",
                      border:"3px solid #4CFF88",
                    }}
                    >
                      <PopoverArrow />
                      <PopoverCloseButton onClick={()=>{setPopover(false)}} />
                      <PopoverHeader>Opções para o {props.objeto.nome}</PopoverHeader>
                      <PopoverBody>

                      {
                        props.objeto.tipo === "Bebidas Alcoólicas"
                      ?
                      <>
                        <Flex flexDirection="column" >

                        <Label htmlFor={'tamanhoPedido' + props.objeto.id}>Tamanho</Label>
                        <Select _focus={{outline:"0", border:"1px solid #4CFF89",}}
                          id={'tamanhoPedido' + props.objeto.id}
                          name={'tamanhoPedido' + props.objeto.id}
                          defaultValue='100ml'
                          onChange={(e) => changeVariacao(e.target.value)}
                          >
                          <option value="100ml">100ml</option>
                          <option value="210ml">210ml</option>
                          <option value="400ml">400ml</option>
                          
                        </Select>

                      
                        
                        <Label htmlFor={'observacaoPedido' + props.objeto.id}>Observação</Label>
                        <Select _focus={{outline:"0", border:"1px solid #4CFF89",}}
                          id={'observacaoPedido' + props.objeto.id}
                          name={'observacaoPedido' + props.objeto.id}
                          defaultValue='Nenhuma Observação'
                          onChange={(e) => setObservacao(e.target.value)}
                          >
                          <option value='Nenhuma Observação'>Nenhuma Observação</option>
                          <option value='Sem açúcar'>Sem açúcar</option>
                          <option value='Com adoçante'>Com adoçante</option>
                        </Select>

                        <ButtonGroup padding="10px" size='sm' isAttached variant='outline' _focus={{outline:"0", border:"3px solid #4CFF89",}}>
                          <IconButton onClick={()=>addProduto()} _focus={{outline:"0", border:"3px solid #4CFF89",}} aria-label='Add to friends' icon={<MinusIcon />} />
                          <IconButton onClick={()=>removeProduto()} _focus={{outline:"0", border:"3px solid #4CFF89",}} aria-label='Add to friends' icon={<AddIcon />} />
                        </ButtonGroup>

                        <Text>Quantidade: {quantidade}</Text>
                        <Text>Total: R${total}</Text>

                        <br></br>
                        <ChakraProvider>
                          <Button borderRadius="30px" backgroundColor="#4CFF89" variant='solid' marginRight="10px"  onClick={()=>{addProdutoNoPedido()}}  _focus={{outline:"0", border:"0px solid #4CFF89",}}><Text fontSize="14px" fontWeight="bold" fontFamily="'Quicksand', sans-serif">Adicionar ao Pedido</Text></Button>
                        </ChakraProvider>
                                               
                      </Flex>
                        </>
                        :
                        <></>  
                      }
                      
                      {
                        props.objeto.tipo === "Bebidas não Alcoólicas"
                      ?
                      	<>
                      	<Flex flexDirection="column">
                          <Label htmlFor={'observacaoPedido' + props.objeto.id}>Observação</Label>
                          <Select _focus={{outline:"0", border:"1px solid #4CFF89",}}
                            id={'observacaoPedido' + props.objeto.id}
                            name={'observacaoPedido' + props.objeto.id}
                            defaultValue='Nenhuma Observação'
                            >
                            <option value='Nenhuma Observação'>Nenhuma Observação</option>
                            <option value='Sem açúcar'>Sem açúcar</option>
                            <option value='Com adoçante'>Com adoçante</option>
                          </Select>

                          <ButtonGroup padding="10px" size='sm' isAttached variant='outline' _focus={{outline:"0", border:"3px solid #4CFF89",}}>
                            <IconButton onClick={()=>addProduto()} _focus={{outline:"0", border:"3px solid #4CFF89",}} aria-label='Add to friends' icon={<MinusIcon />} />
                            <IconButton onClick={()=>removeProduto()} _focus={{outline:"0", border:"3px solid #4CFF89",}} aria-label='Add to friends' icon={<AddIcon />} />
                          </ButtonGroup>

                          <Text>Quantidade: {quantidade}</Text>
                          <Text>Total: R${total}</Text>

                          <br></br>
                          <ChakraProvider>
                            <Button borderRadius="30px" backgroundColor="#4CFF89" variant='solid' marginRight="10px"  onClick={()=>{addProdutoNoPedido()}}  _focus={{outline:"0", border:"0px solid #4CFF89",}}><Text fontSize="14px" fontWeight="bold" fontFamily="'Quicksand', sans-serif">Adicionar ao Pedido</Text></Button>
                          </ChakraProvider>        
                        </Flex>
                      	</>
                      : 
                      	<></>
                      }


                      {
                        props.objeto.tipo === "Alimentos Salgados" || props.objeto.tipo === "Alimentos Doces" || props.objeto.tipo === "Doces"
                      ?
                      	<>
                      	<Flex flexDirection="column">
                      	

                        <ButtonGroup padding="10px" size='sm' isAttached variant='outline' _focus={{outline:"0", border:"3px solid #4CFF89",}}>
                          <IconButton onClick={()=>addProduto()} _focus={{outline:"0", border:"3px solid #4CFF89",}} aria-label='Add to friends' icon={<MinusIcon />} />
                          <IconButton onClick={()=>removeProduto()} _focus={{outline:"0", border:"3px solid #4CFF89",}} aria-label='Add to friends' icon={<AddIcon />} />
                        </ButtonGroup>

                        <Text>Quantidade: {quantidade}</Text>
                        <Text>Total: R${total}</Text>

                        <br></br>




                      
                        <ChakraProvider>
                          <Button borderRadius="30px" backgroundColor="#4CFF89" variant='solid' marginRight="10px"  onClick={()=>{addProdutoNoPedido()}}  _focus={{outline:"0", border:"0px solid #4CFF89",}}><Text fontSize="14px" fontWeight="bold" fontFamily="'Quicksand', sans-serif">Adicionar ao Pedido</Text></Button>
                        </ChakraProvider>
                      </Flex>
                      	</>
                      : 
                      	<></>
                      }
                      
                      
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  </ChakraProvider>

                </Flex>
              </Flex>
            </Box>
          </Flex>
      </Box>
      </>
    );
  };

  export default CardsProdutos;