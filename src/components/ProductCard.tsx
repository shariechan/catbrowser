import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { ProductListItem } from '../models/product';
import styled from '@emotion/styled';

interface ProductCardType {
  item: ProductListItem;
}

const StyledCard = styled(Card)`
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .card-img-top {
    height: 60%;
    object-fit: cover;
    width: 100%;
  }
`;

const CardBody = styled(Card.Body)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
`;

const ProductCard: React.FC<ProductCardType> = ({ item }) => {
  return (
    <StyledCard className="mb-4">
      <Card.Img variant="top" src={item.url} />
      <CardBody>
        <Card.Text>🐱 ID: {item.id}</Card.Text>
        <Link to={`/products/${item.id}`} className="btn btn-primary">
          View Details
        </Link>
      </CardBody>
    </StyledCard>
  );
};

export default ProductCard;
