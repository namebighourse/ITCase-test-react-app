import React, { useState } from 'react';
import { Layout, Badge, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './component/ProductList/ProductList';
import BasketPage from './component/Basket/BasketPage';
import './App.css';

const { Header, Content } = Layout;

const App = () => {
  const [basketItems, setBasketItems] = useState([]);

  const addToBasket = (product, selectedColor, selectedSize) => {
    const newItem = {
      id: `${product.id}-${selectedColor.id}-${selectedSize}`,
      name: product.name,
      colorName: selectedColor.name,
      size: selectedSize,
      price: parseFloat(selectedColor.price),
      quantity: 1,
      image: selectedColor.images[0],
    };

    setBasketItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, newItem];
    });


    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
      cartIcon.classList.add('bounce');
      setTimeout(() => cartIcon.classList.remove('bounce'), 1000);
    }
  };

  const removeFromBasket = (itemId) => {
    setBasketItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: '0 24px', textAlign: 'right' }}>
          <Badge count={basketItems.length} showZero>
            <Link to="/basket">
              <Button
                type="text"
                icon={<ShoppingCartOutlined className="cart-icon" style={{ fontSize: '24px' }} />}
              />
            </Link>
          </Badge>
        </Header>
        <Content style={{ padding: '24px' }}>
          <Routes>
            <Route
              path="/"
              element={<ProductList addToBasket={addToBasket} />}
            />
            <Route
              path="/basket"
              element={
                <BasketPage basketItems={basketItems} onRemoveItem={removeFromBasket} />
              }
            />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;