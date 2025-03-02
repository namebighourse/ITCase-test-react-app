import React, { useState, useEffect } from 'react';
import { Card, Button, Select, Space, Image, Typography, message } from 'antd';
import ProductPopUp from '../ProductInfo/ProductPopUp';
import { getSizes } from '../fake-api/api';
import './ProductCard.css';

const { Text, Title } = Typography;

const ProductCards = ({ product, addToBasket }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);


  useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);


  useEffect(() => {
    getSizes()
      .then((data) => {
        setSizes(data);
        if (selectedColor) {
          setAvailableSizes(data.filter(size => selectedColor.sizes.includes(size.id)));
        }
      })
      .catch((error) => console.error('Ошибка загрузки размеров:', error));
  }, [selectedColor]);

  const handleOpenPopup = () => {
    if (!product || !selectedColor) {
      message.error('Ошибка: данные не загружены');
      return;
    }
    setIsOpen(true);
  };

  const handleClosePopup = () => setIsOpen(false);

  const handleAddToBasket = () => {
    if (!selectedSize) {
      message.error('Пожалуйста, выберите размер');
      return;
    }
    if (typeof addToBasket === 'function' && product && selectedColor) {
      addToBasket(product, selectedColor, selectedSize);
      message.success('Товар добавлен в корзину!');
    }
  };

  if (!product || !selectedColor) {
    return null; 
  }

  return (
    <Card
      hoverable
      className="product-card"
      cover={
        <Image
          alt={product.name}
          src={selectedColor.images[0]}
          height={200}
          style={{ objectFit: 'contain' }}
          className="product-image"
        />
      }
      actions={[
        <Button 
          type="primary" 
          disabled={!selectedSize}
          onClick={handleAddToBasket}
          className="add-to-basket-btn"
        >
          В корзину
        </Button>,
        <Button onClick={handleOpenPopup} className="details-btn">
          Подробнее
        </Button>
      ]}
    >
      <Card.Meta
        title={<Title level={4} className="product-title">{product.name}</Title>}
        description={
          <Space direction="vertical" className="product-info">
            <Text strong className="product-price">Цена: {selectedColor.price} ₽</Text>
            
            <Space className="color-selector">
              {product.colors.map((color) => (
                <Button
                  key={color.id}
                  shape="circle"
                  onClick={() => setSelectedColor(color)}
                  className={`color-button ${color.name === selectedColor.name ? 'active' : ''}`}
                />
              ))}
            </Space>

            <Select
              placeholder="Выберите размер"
              value={selectedSize}
              onChange={setSelectedSize}
              className="size-selector"
              disabled={availableSizes.length === 0}
            >
              {availableSizes.map((size) => (
                <Select.Option key={size.id} value={size.id}>
                  {size.label} ({size.number})
                </Select.Option>
              ))}
            </Select>

            {availableSizes.length === 0 && (
              <Text type="secondary" style={{ marginTop: 8 }}>
                Нет доступных размеров для выбранного цвета.
              </Text>
            )}
          </Space>
        }
      />
      
      {isOpen && (
        <ProductPopUp
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          onClose={handleClosePopup}
          addToBasket={addToBasket}
          visible={isOpen}
          sizes={sizes}
        />
      )}
    </Card>
  );
};

export default ProductCards;