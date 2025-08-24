import React from 'react';
import GuestNavBar from '../shared/GuestNavBar';
import Footer from '../shared/Footer';

interface IProps {
    children: React.ReactNode;
}

const CommonLayouts = ({ children }: IProps) => {
    return (
        <>
            <GuestNavBar />
            {children}
            <Footer />
        </>
    );
};

export default CommonLayouts;