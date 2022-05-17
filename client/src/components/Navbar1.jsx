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


 const Navbar = (props) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  return (
    <Box as="section" pb={{ base: '12', md: '24' }}>
      <Box as="nav" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')}>
        <Container py={{ base: '4', lg: '5' }}>
          <HStack spacing="10" justify="space-between">
            {/* <Logo /> */}
            <SearchContainer  handleSearchResults={props.handleSearchResults}/>
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                {/* <ButtonGroup variant="link" spacing="8">
                  {['Product', 'Pricing', 'Resources', 'Support'].map((item) => (
                    <Button key={item}>{item}</Button>
                  ))}
                </ButtonGroup> */}
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
                  {/* <Navlink variant="ghost" to="/signup">Sign in</Navlink>
                  <Navlink variant="ghost" to="/login">Log in</Navlink>
                  <Navlink variant="ghost" to="/profile">Profile</Navlink>
                  <Button variant="primary">Sign up</Button> */}
                </HStack>
              </Flex>
            ) : (
              <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}
export default Navbar;