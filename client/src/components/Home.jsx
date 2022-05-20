
import { Link } from 'react-router-dom';
import React from 'react';
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import PromoContainer from './PromoContainer';
import '../css/Home.css';


function Home(props) {
  return (
<div className='home'>
      <h2>{props.loggedInUser ? `Welcome ${props.loggedInUser.username}` : ""}</h2>


      <section className="header">
     <h1 className="text">Paris Lamps</h1>
      </section>

      <section id="promoSection">

        <Link to={`/search/:?`}>
          <PromoContainer />
        </Link>

      </section>


  <Container as="footer" role="contentinfo">
    <Stack
      spacing="70"
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      py={{ base: '2', md: '160' }}
    >
      <Stack spacing={{ base: '6', md: '8' }} align="start">
        <Text fontWeight="bold" color="muted">Find beautiful Lamps remarkably easy.</Text>
      </Stack>
      <Stack
        direction={{ base: 'column-reverse', md: 'column', lg: 'row' }}
        spacing={{ base: '2', md: '10' }}
      >
        <Stack direction="row" spacing="8">
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Product
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button variant="link">How it works</Button>
              <Button variant="link">Pricing</Button>
              <Button variant="link">Designers</Button>
            </Stack>
          </Stack>
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Legal
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button variant="link">Privacy</Button>
              <Button variant="link">Terms</Button>
              <Button variant="link">License</Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
    <Divider />
    <Stack
      pt="8"
      pb="12"
      justify="space-between"
      direction={{ base: 'column-reverse', md: 'row' }}
      align="center"
    >
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} Paris Lamps, Inc. All rights reserved.
      </Text>
      <ButtonGroup variant="ghost">
        <IconButton
          as="a"
          href="#"
          aria-label="LinkedIn"
          icon={<FaLinkedin fontSize="1.25rem" />}
        />
        <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
        <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter fontSize="1.25rem" />} />
      </ButtonGroup>
    </Stack>
  </Container>
)

  
      </div>
  );
}

export default Home;
