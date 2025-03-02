import React from 'react';
import { Row, Col } from 'antd';
import ProductCards from '../ProductCard/ProductCards.jsx';
import { products } from '../fake-api/api.js';
import './ProductList.css'

const ProductList = ({ addToBasket }) => {
  if (!products || products.length === 0) {
    return <div>Товары не найдены</div>;
  }

  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => {
        if (!product.colors || product.colors.length === 0) {
          return null; 
        }

        return (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <ProductCards product={product} addToBasket={addToBasket} />
          </Col>
        );
      })}
    </Row>
  );
};

export default ProductList;