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
} from "@chakra-ui/react";
import * as React from "react";
import { FiMenu } from "react-icons/fi";
// import { Logo } from './Logo'
import SearchContainer from "./search/SearchContainer";
import { Link } from "react-router-dom";
// import { useState } from "react";

const Navbar = (props) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  // const { notDroppedDown, isDroppedDown } = useState(true);
  // const [isDropDown, setIsDropDown] = useState(true);

  // const openDropDown = () => {
  //   setIsDropDown(true)
  // };

  // const closeDropDown = () => {
  //   setIsDropDown(false)
  // };

  return (
    <Box as="section" pb={{ base: "12", md: "24" }} style={{ zIndex: 1 }}>
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow={useColorModeValue("sm", "sm-dark")}
      >
        <Container py={{ base: "4", lg: "5" }}>
          {/* <HStack spacing="10" justify="space-between"> */}
          <HStack spacing="5px" justify="space-evenly">
            <SearchContainer handleSearchResults={props.handleSearchResults} />
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                {/* <HStack spacing="3"> */}
                <HStack spacing="3px">
                  <Link to="/" activeclassname="active" className="auth-btn">
                    Home
                  </Link>
                  {!props.loggedInUser ? (
                    <>
                      <Link
                        to="/signup"
                        variant="primary"
                        activeclassname="active"
                        className="auth-btn"
                      >
                        Signup
                      </Link>
                      <Link
                        to="/login"
                        variant="ghost"
                        activeclassname="active"
                        className="auth-btn"
                      >
                        Login
                      </Link>
                      <Link
                        to="/cart"
                        variant="ghost"
                        activeclassname="active"
                        className="auth-btn"
                      >
                        Cart
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/profile"
                        variant="ghost"
                        activeclassname="active"
                        className="auth-btn"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/cart"
                        variant="ghost"
                        activeclassname="active"
                        className="auth-btn"
                      >
                        Cart
                      </Link>
                      <Button
                        onClick={props.logoutHandler}
                        variant="ghost"
                        className="danger auth-btn"
                      >
                        Log out
                      </Button> 
                   
                    </>
                  )}
                </HStack>
              </Flex>
            ) : (
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
                    aria-label="Options"
                    icon={<FiMenu fontSize="1.25rem" />}
                    variant="outline"
                  />
                  <MenuList>
                    <Link to="/" activeclassname="active" className="auth-btn">
                      <MenuItem>Home</MenuItem>
                    </Link>

                    {!props.loggedInUser ? (
                      <>
                        <Link
                          to="/signup"
                          variant="primary"
                          activeclassname="active"
                          className="auth-btn"
                        >
                          <MenuItem>Signup</MenuItem>
                        </Link>

                        <Link
                          to="/login"
                          variant="ghost"
                          activeclassname="active"
                          className="auth-btn"
                        >
                          <MenuItem>Login</MenuItem>
                        </Link>

                        <Link
                          to="/cart"
                          variant="ghost"
                          activeclassname="active"
                          className="auth-btn"
                        >
                          <MenuItem>View cart</MenuItem>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          variant="ghost"
                          activeclassname="active"
                          className="auth-btn"
                        >
                          <MenuItem>Profile</MenuItem>
                        </Link>

                        <Link
                          to="/cart"
                          variant="ghost"
                          activeclassname="active"
                          className="auth-btn"
                        >
                          <MenuItem>View cart</MenuItem>
                        </Link>

                        <Button
                          onClick={props.logoutHandler}
                          variant="ghost"
                          className="danger auth-btn"
                        >
                          <MenuItem>Log out</MenuItem>
                        </Button>
                      </>
                    )}
                  </MenuList>
                </Menu>
              </>
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
    
  );
};
export default Navbar;

// position: static;
// color: black;
// font-family: "Gill Sans", sans-serif;
// text-align: end;
//   letter-spacing: .15rem;
// font-size: 18px;
// padding: 5px 180px;
// z-index: 1;
