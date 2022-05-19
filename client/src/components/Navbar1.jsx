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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  // AddIcon,
  // RepeatIcon,
  // ExternalLinkIcon,
  // EditIcon
} from '@chakra-ui/react'
import * as React from 'react'
import { FiMenu } from 'react-icons/fi'
// import { Logo } from './Logo'
import SearchContainer from './search/SearchContainer'
import {Link} from 'react-router-dom';
import { useState } from "react";



 const Navbar = (props) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  // const { notDroppedDown, isDroppedDown } = useState(true);
  const [isDropDown, setIsDropDown] = useState(true);

  const openDropDown = () => {
    setIsDropDown(true)
  };

  const closeDropDown = () => {
    setIsDropDown(false)
  };


  return (
    <Box as="section" pb={{ base: '12', md: '24' }}>
      <Box as="nav" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')}>
        <Container py={{ base: '4', lg: '5' }}>
        {/* <HStack spacing="10" justify="space-between"> */}
        <HStack spacing="5px" justify="space-evenly">
            <SearchContainer  handleSearchResults={props.handleSearchResults}/>
            {
                isDesktop ?
                (
                <Flex justify="space-between" flex="1">

                    {/* <HStack spacing="3"> */}
                    <HStack spacing="3px">
                        <Link to="/" activeclassname="active" className="auth-btn">Home</Link>
                        {
                        !props.loggedInUser ?
                        <>
                            <Link to="/signup" variant="primary" activeclassname="active" className="auth-btn">Signup</Link>
                            <Link to="/login" variant="ghost" activeclassname="active" className="auth-btn">Login</Link>

                        </>
                        :   
                        <>
                            <Link to="/profile" variant="ghost" activeclassname="active" className="auth-btn">Profile</Link>
                            <Button onClick={props.logoutHandler} variant="ghost" className="danger auth-btn">Log out</Button>              
                        </>
                        }
                    </HStack>
                </Flex>

            )
            :
            ( 
                <>
                {/* <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
                onClick={openDropDown} 
                /> */}
                      <Menu>
                      {/* <IconButton
                        variant="ghost"
                        icon={<FiMenu fontSize="1.25rem" />}
                        aria-label="Open Menu"
                        // onClick={closeDropDown} 
                        /> */}
                        <MenuButton
    as={IconButton}
    aria-label='Options'
    icon={<FiMenu fontSize="1.25rem" />}
    variant='outline'
  />
                        <MenuList>
                        {
                    !props.loggedInUser ?
                        <>
                          {/* <MenuItem icon={<AddIcon />} command='⌘T'> */}
                            <Link to="/signup" variant="primary" activeclassname="active" className="auth-btn">
                          <MenuItem >
                            Signup
                          </MenuItem>
                            </Link>

                          {/* <MenuItem icon={<ExternalLinkIcon />} command='⌘N'> */}
                            <Link to="/login" variant="ghost" activeclassname="active" className="auth-btn">
                          <MenuItem >
                            Login
                          </MenuItem>
                            </Link>
                        </>
                        :
                        <>
                          {/* <MenuItem icon={<RepeatIcon />} command='⌘⇧N'> */}
                            <Link to="/profile" variant="ghost" activeclassname="active" className="auth-btn">
                          <MenuItem >
                            Profile
                          </MenuItem>
                            </Link>    

                           <Button onClick={props.logoutHandler} variant="ghost" className="danger auth-btn">
                          <MenuItem >
                          {/*  <MenuItem icon={<EditIcon />} command='⌘O'> */}
                           Log out
                          </MenuItem>
                           </Button>              
                        </> 
                        }
                        </MenuList>
                      </Menu>
                
            
            </>
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}
export default Navbar;