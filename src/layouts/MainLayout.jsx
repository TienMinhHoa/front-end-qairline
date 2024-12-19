import Header from './Header';
import Footer from './Footer';
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from "react-router";

const headerStyle = {
    textAlign: 'center',
    height: 64,
    paddingInline: 48,
    backgroundColor: '#001529',
    color: '#fff',
};
const contentStyle = {
    flex: 1,
    textAlign: 'center',
    padding: '0',
    backgroundColor: '#f0f2f5',
};
const footerStyle = {
    textAlign: 'center',
    padding: '0',
    color: '#fff',
};
const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    minHeight: '100vh', // Toàn chiều cao màn hình
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
        </Layout>
    );
}

export default MainLayout;
