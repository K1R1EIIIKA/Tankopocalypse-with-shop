import React from 'react';
import Header from '../../Header/Header.tsx';
import Footer from '../../Footer/Footer.tsx';
import './Layout.css';

export const Layout = ({children}: { children: React.ReactNode }) => {
	return (
		<>
			<Header/>
			<div className="wrapper">
				<main className={'container m-fixed'}>{children}</main>
			</div>
			<Footer/>
		</>
	);
};