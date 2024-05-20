import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = ({children}) => {
    return (
        <>
            <Header/>
            <main className={'container'}>{children}</main>
            <Footer/>
        </>
    );
};

export default Layout;
