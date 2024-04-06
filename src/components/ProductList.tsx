import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import useFetch from '../hooks/useFetch';
import ProductCard from './ProductCard';
import { ProductListItem } from '../models/product';
import {Row, Col, Container, Button} from 'react-bootstrap';
import Loader from './Loader';
import ErrorModal from './ErrorModal';


const ProductList : React.FC = () => {

  const { brand , products, setProducts, page, setPage, hasMore, setHasMore  } = useStore();
  const [fetchUrl, setFetchUrl] = useState<string | null>(null);
  const { data, isLoading, error } = useFetch<ProductListItem[]>(fetchUrl ?? undefined);

  const handleLoadMore = () : void => setPage(prevPage => prevPage + 1);
  const handleErrorModalClose = () : void => window.location.reload();
  
   // Set Initial Behaviors
  useEffect(() => {
    setHasMore(false);
    setProducts([]);
  }, []);

  // Call only if has selected brand
  useEffect(() => {
    if (brand && brand.id) {
      setFetchUrl(`v1/images/search?page=${page}&limit=10&breed_id=${brand.id}`);
    } else {
      setFetchUrl(null);
    }
  }, [brand, page]);

  useEffect(() => {
    if (data) {
      // Only push new image IDs
      setProducts(prevProducts => {
        const prevLength = prevProducts.length;
        const currentProducts = prevProducts;
          data.forEach((newItem) => {
            if (!currentProducts.find((item) => item.id === newItem.id)) {
              currentProducts.push(newItem);
            }
          });

        // Check if should show load more button or not
        setHasMore(!(prevLength === currentProducts.length));
        return [...currentProducts];
      });


    }
  }, [data, setProducts, setHasMore]);


  if (!products.length && isLoading) return <div> <Loader isLoading/></div>;
  if (error) return (
    <ErrorModal
          show={!!error}
          errorMessage={'Apologies but we could not load new cats for you at this time! Miau!'}
          onHide={handleErrorModalClose}
        />
  );

    return (
      <>
      <Container>
        <Row className="mb-4">
          <Col md={12}>
              <h3 className="text-center"> {`${brand?.name ?? 'No Cats Selected'}`} ({`${products?.length ?? 0 }`}) </h3>
          </Col>
        </Row>
        <Row className="mb-4">
        {products.map(product => (
            <Col xs={12} sm={6} md={4} lg={3} className="" key={product.id}>
              <ProductCard item={product} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
          {hasMore && products && 
              <Button 
              variant="secondary" 
              onClick={handleLoadMore} 
              disabled={isLoading}
              className="mt-3"
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </Button>
            }
          </Col>
        </Row>
      </Container>
      </>
      );

}


export default ProductList;