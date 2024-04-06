import React, { useEffect, useRef } from 'react';
import { Form, Dropdown, FormLabel } from 'react-bootstrap';
import styled from '@emotion/styled';
import useFetch from '../hooks/useFetch';
import { useStore } from '../context/StoreContext';
import ErrorModal from './ErrorModal';
import { Brand } from '../models/product';

const StyledDropdownMenu = styled(Dropdown.Menu)`
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
`;
const StyledDropdownToggle = styled(Dropdown.Toggle)`
  background: #BE7333;

  &:hover, &:visited {
    background: #B2877E;
  }

  &:focus {
    background: #BE7333;
  }
`;

const ProductFilter: React.FC = () => {
  const { data, isLoading, error } = useFetch<Brand[]>(`v1/breeds`);
  const { brand, setBrand, setProducts } = useStore();
  const selectBrand = ({ id, name }: Brand) => setBrand({ id, name });
  const prevBrandRef = useRef<Brand | undefined>();

  const handleErrorModalClose = () : void => window.location.reload();

  useEffect(() => {
    if (prevBrandRef.current && brand && prevBrandRef.current.id !== brand.id) {
      setProducts([]);
    }
    prevBrandRef.current = brand;
  }, [brand, setProducts]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return (
    <ErrorModal
          show={!!error}
          errorMessage={'Apologies but we could not load new cats for you at this time! Miau!'}
          onHide={handleErrorModalClose}
        />
  );

  return (
    <Form>
      <FormLabel>Breed: <br/></FormLabel>
      <Dropdown>
        <StyledDropdownToggle>
          {brand?.name ?? 'Select Cat Breed'}
        </StyledDropdownToggle>

        <StyledDropdownMenu>
          {data &&
            data.map((item) => (
              <Dropdown.Item onClick={() => selectBrand(item)} key={item.id} href="#">
                {item.name}
              </Dropdown.Item>
            ))}
        </StyledDropdownMenu>
      </Dropdown>
    </Form>
  );
};

export default ProductFilter;
