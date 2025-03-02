import React from 'react';
import { List, Card, Typography, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './BasketPage.css';

const { Title, Text } = Typography;

const BasketPage = ({ basketItems, onRemoveItem }) => {
  const totalPrice = basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="basket-page">
      <Title level={2}>Ваша корзина</Title>
      {basketItems.length === 0 ? (
        <Text type="secondary">Корзина пуста</Text>
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={basketItems}
            renderItem={(item) => (
              <List.Item>
                <Card
                  actions={[
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => onRemoveItem(item.id)}
                      danger
                    >
                      Удалить
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<img src={item.image} alt={item.name} style={{ width: 100 }} />}
                    title={item.name}
                    description={
                      <>
                        <Text>Цвет: {item.colorName}</Text>
                        <br />
                        <Text>Размер: {item.size}</Text>
                        <br />
                        <Text>Количество: {item.quantity}</Text>
                        <br />
                        <Text strong>Цена: {item.price * item.quantity} ₽</Text>
                      </>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
          <div className="basket-summary">
            <Title level={4}>Итого: {totalPrice} ₽</Title>
          </div>
        </>
      )}
    </div>
  );
};

export default BasketPage;