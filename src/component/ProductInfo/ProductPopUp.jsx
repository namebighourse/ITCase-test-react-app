import React, { useState, useEffect } from 'react';
import { Modal, Typography, Image, Button, Space, Row, Col, message } from 'antd';
import { getProductColor } from '../fake-api/api';
import './ProductPopUp.css';

const { Title, Text } = Typography;

const ProductPopUp = ({ 
  product, 
  selectedColor, 
  selectedSize, 
  onClose, 
  addToBasket, 
  visible,
  sizes 
}) => {
  const [colorDetails, setColorDetails] = useState(null);

  useEffect(() => {
    if (product && selectedColor) {
      getProductColor(product.id, selectedColor.id)
        .then((data) => setColorDetails(data))
        .catch((error) => console.error('Ошибка загрузки цвета:', error));
    }
  }, [product, selectedColor]);

  const handleAddToBasket = () => {
    if (!selectedSize) {
      message.error('Пожалуйста, выберите размер');
      return;
    }
    if (typeof addToBasket === 'function' && product && selectedColor) {
      addToBasket(product, selectedColor, selectedSize);
      message.success('Товар добавлен в корзину!');
      onClose();
    }
  };

  if (!product || !selectedColor) {
    return null; 
  }

  return (
    <Modal
      title={product.name}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Закрыть
        </Button>,
        <Button
          key="add"
          type="primary"
          disabled={!selectedSize}
          onClick={handleAddToBasket}
        >
          В корзину
        </Button>
      ]}
      width={800}
      className="product-popup"
    >
      {colorDetails && (
        <Row gutter={16}>
          <Col span={12}>
            <Image.PreviewGroup items={colorDetails.images}>
              <Image
                src={colorDetails.images[0]}
                style={{ width: '100%', height: 300, objectFit: 'contain' }}
                className="popup-image"
              />
            </Image.PreviewGroup>
          </Col>
          <Col span={12}>
            <Space direction="vertical">
              <Title level={5}>Описание</Title>
              <Text>{colorDetails.description}</Text>
              
              <Title level={5}>Характеристики</Title>
              <Text>Цена: {colorDetails.price} ₽</Text>
              <Text>Доступные цвета: {product.colors.map(c => c.name).join(', ')}</Text>
              
              {selectedSize && sizes && (
                <Text>Выбранный размер: {sizes.find(s => s.id === selectedSize)?.label}</Text>
              )}
            </Space>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

export default ProductPopUp;