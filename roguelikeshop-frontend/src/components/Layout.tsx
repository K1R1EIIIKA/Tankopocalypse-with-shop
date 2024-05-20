import React from 'react';
import Header from './Header';
import Footer from './Footer';

export const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <Header/>
            <main className={'container'}>{children}</main>
            <Footer/>
        </>
    );
};