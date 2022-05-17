import {
  Box,
  Button,
//   ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { FiMenu } from 'react-icons/fi'
// import { Logo } from './Logo'
import SearchContainer from './search/SearchContainer'
import {NavLink} from 'react-router-dom';
import { useState } from "react";



 const Navbar = (props) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const { dropDown, isDroppedDown } = useState(true);

    



  return (
    <Box as="section" pb={{ base: '12', md: '24' }}>
      <Box as="nav" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')}>
        <Container py={{ base: '4', lg: '5' }}>
          <HStack spacing="10" justify="space-between">
            <SearchContainer  handleSearchResults={props.handleSearchResults}/>
            {
                isDesktop ?
                (
                <Flex justify="space-between" flex="1">

                    <HStack spacing="3">
                        <NavLink to="/" activeclassname="active" className="auth-btn">Home</NavLink>
                        {
                        !props.loggedInUser ?
                        <>
                            <NavLink to="/signup" variant="primary" activeclassname="active" className="auth-btn">Signup</NavLink>
                            <NavLink to="/login" variant="ghost" activeclassname="active" className="auth-btn">Login</NavLink>

                        </>
                        :   
                        <>
                            <NavLink to="/profile" variant="ghost" activeclassname="active" className="auth-btn">Profile</NavLink>
                            <Button onClick={props.logoutHandler} variant="ghost" className="danger auth-btn">Log out</Button>              
                        </>
                        }
                    </HStack>
                </Flex>


            )
            :
            ( 
                <>
                <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
                onClick={isDroppedDown} 
                />
                {
                    dropDown && (
                    <Box as="section">
                    {
                    !props.loggedInUser ?
                        <>
                            <NavLink to="/signup" variant="primary" activeclassname="active" className="auth-btn">Signup</NavLink>
                            <NavLink to="/login" variant="ghost" activeclassname="active" className="auth-btn">Login</NavLink>

                        </>
                        :
                        <>
                            <NavLink to="/profile" variant="ghost" activeclassname="active" className="auth-btn">Profile</NavLink>    
                            <Button onClick={props.logoutHandler} variant="ghost" className="danger auth-btn">Log out</Button>              
                        </>
                    } 
                    </Box>
                )}
                </>
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}
export default Navbar;