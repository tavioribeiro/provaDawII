/* MÓDULOS REACT */
import React, { useState, useEffect } from 'react';
import { FiInstagram, FiLogIn } from "react-icons/fi";

import 'animate.css';

import {
  Box,
  Image,
  Text,
  Flex,
  Link,
} from 'rebass'

import * as Animation from '../generalFunctions/animations.js';





function Footer(props)
{
	function changeComponent(from, to)
	{
		document.getElementById("filogin").style.display = "none";

		Animation.fadeFromTo(from,to);

		setTimeout(function()
		{
			props.setComponent(to);
		}, 1000);

	}



  	return(
    <Flex 
      justifyContent="space-between" 
      backgroundColor="#0F0F0F"
      alignItems="center"
		
      sx={{
        '@media screen and (min-width: 0px) and (max-width: 400px)':
        {
            flexDirection: 'column',
        },

        '@media screen and (min-width: 401px) and (max-width: 900px)':
        {
            flexDirection: 'column',
        }
      }}
    >
			<Box
				p={3}
				flex="1"
				color='white'
				bg='primary'
				sx={{
					'@media screen and (min-width: 0px) and (max-width: 400px)':
					{
						p:"2",
					},

					'@media screen and (min-width: 401px) and (max-width: 900px)':
					{
						p:"2",
					}
				}}
			>
				<Image
					src="./logo/laffelogo-footer.png"
					marginTop="10px"
					sx={{
						width: [ '30px','40px',"50px" ],
						borderRadius: 8,
					}}
				/>
			</Box>

			<Flex
				p={3}
				flex="5"
				color='white'
				bg='secondary'
                flexDirection="column"
				justifyContent="center"
				alignItems="center"
				sx={{
					'@media screen and (min-width: 0px) and (max-width: 400px)':
					{
						p:"2",
					},

					'@media screen and (min-width: 401px) and (max-width: 900px)':
					{
						p:"2",
					}
				}}
			>
                <Text fontSize="13px" fontFamily="'Quicksand', sans-serif" textAlign="center">Copyright© 2022, Laffê Cantinho de Minas. Todos os direitos reservados.</Text>
                <br/>
                {/* <Text fontSize="13px" className='simpleTextFormal' textAlign="center">Desenvolvido por @tavioaraujo</Text> */}

				<Flex flexDirection="row">
					<Text fontSize="11px"  fontWeight="600" fontStyle="italic" fontFamily="'Montserrat', sans-serif" textAlign="center">Desenvolvido por </Text>
					<Box width="85px">
						<Text textAlign="center" fontSize="11px"  fontWeight="600" fontStyle="italic" fontFamily="'Montserrat', sans-serif" style={{
							//gradiente horizontal
							background: 'linear-gradient(to right, #4FCCFF 0%, #FFB550 50%, #FFB550 100%)',
							webkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}>@tavioaraujo</Text>
					</Box>
				</Flex>
				
				
            </Flex>

			<Box
				p={3}
				flex="1"
				color='white'
				bg='transparent'
				sx={{
					'@media screen and (min-width: 0px) and (max-width: 400px)':
					{
						p:"2",
					},

					'@media screen and (min-width: 401px) and (max-width: 900px)':
					{
						p:"2",
					}
				}}
			>
				<Flex mx={-2} justifyContent="space-between">
					<Flex justifyContent="center" alignItems="center">
						<FiInstagram/>
                        <Text paddingLeft="5px" fontSize="14px" fontWeight="500" fontFamily="'Quicksand', sans-serif" textAlign="center">@cantinholaffe</Text>
					</Flex>
					<Flex justifyContent="center" alignItems="center">
						<FiLogIn id='filogin' color="#4CFF88" onClick={()=>{changeComponent("body", "login")}}/>
					</Flex>
				</Flex>
			</Box>
    </Flex>
  );
}

export default Footer;


