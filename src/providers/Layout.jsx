import { Link, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Header, Content, Footer, Sider } = Layout;

export const CustomLayout = () => {
  const menuItems = [
    { label: <Link to="/">Home</Link>, key: "1" },
    { label: <Link to="/contact">Contact</Link>, key: "2" },
    { label: <Link to="/products">Products</Link>, key: "3" },
    { label: <Link to="/cart">Cart</Link>, key: "4" },
    { label: <Link to="/news">News</Link>, key: "5" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ background: "#fff" }}>
        <Menu items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}></Header>
        <Content>
          <Outlet />
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};
