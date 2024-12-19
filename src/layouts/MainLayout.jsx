import Header from './Header'
import Footer from './Footer'
import React from 'react';
import { Flex, Layout } from 'antd';
import {Outlet} from "react-router";

const headerStyle = {
    textAlign: 'center',
    height: 64,
    paddingInline: 48,
};
const contentStyle = {
    marginTop: 128,
    textAlign: 'center',
    minHeight: 120,
};
const footerStyle = {
    textAlign: 'center',
    padding: 0
};
const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
};

const MainLayout = () => {
    return (
        <Layout style={layoutStyle}>
            <Layout.Header style={headerStyle}>
                <Header />
            </Layout.Header>
            <Layout.Content style={contentStyle}>
                <Outlet />
            </Layout.Content>
            <Layout.Footer style={footerStyle}>
                <Footer />
            </Layout.Footer>
        </Layout>
    )
}

export default MainLayout
