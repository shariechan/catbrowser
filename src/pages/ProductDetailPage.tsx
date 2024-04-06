import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ProductDetails } from '../models/product';
import styled from '@emotion/styled';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ErrorModal from '../components/ErrorModal';
import Loader from '../components/Loader';
interface RouteParams {
  [key: string]: string | undefined;
  id: string;
}

const StyledCardImg = styled(Card.Img)`
  width: 100%; 
  height: auto;
  object-fit: cover;
`;


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const {data, isLoading, error} = useFetch<ProductDetails>(`v1/images/${id}`);

  let navigate = useNavigate();
  const handleBack = () : void =>  navigate(-1);
  const handleErrorModalClose = () : void => window.location.reload();

  if (isLoading) return <div><Loader isLoading/></div>;
  if (error) return (
    <ErrorModal
          show={!!error}
          errorMessage={'Apologies but we could not load new cats for you at this time! Miau!'}
          onHide={handleErrorModalClose}
        />
  );

  return (
    <>
      <Container className="mt-5">
      <Row className="mb-4">
      <Col md={10} className="offset-md-1">
          <Button variant="secondary" onClick={handleBack}>Back</Button>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={10} className="offset-md-1">
          <Card>
            <StyledCardImg variant="top" src={data?.url} />
          </Card>
        </Col>
        </Row>
        <Row className="mb-4">
        <Col md={10} className="offset-md-1">
          <Card>
            <Card.Body>
            <Card.Title as="h2">{data?.breeds[0].name}</Card.Title>
              <Card.Text as="h4">
                Origin:  {' '}
                {data?.breeds[0].origin}
              </Card.Text>
              <Card.Text>
                <strong>{data?.breeds[0].temperament}</strong>
              </Card.Text>
              <Card.Text>
                {data?.breeds[0].description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default ProductDetailPage;
