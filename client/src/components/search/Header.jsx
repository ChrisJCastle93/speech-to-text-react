import { Link } from 'react-router-dom';
import { Divider } from '@chakra-ui/react';
import React from 'react';


export default function Header() {


    return (
        <>
    <Link to={`/`}>
                <img className="logo" src="https://res.cloudinary.com/cboese/image/upload/v1653068998/Lamps_4_zw0xqj.png" alt="logo" />

                </Link>
      
            <Divider orientation='horizontal' />
        </>
    )
}