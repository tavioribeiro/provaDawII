/* MÓDULOS REACT */
import React from 'react';

import {
  Box,
  Flex,
  Button,
  Image,
  Text,
} from 'rebass'



function Navbar()
{
  return(
    <Box 
        width="100%"
        height="100px"
        backgroundColor="white"
    >
      <Flex alignItems="center">
        <Image
            src="./logo/laffelogo.png"
            marginTop="10px"
            marginLeft="10px"
            paddingBottom="10px"
            height="100px"
          />
      </Flex>
    </Box> 
  );
}

export default Navbar;
