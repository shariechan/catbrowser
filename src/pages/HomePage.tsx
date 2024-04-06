import ProductList from '../components/ProductList';
import ProductFilter from '../components/ProductFilter';

const Homepage: React.FC = () => {
  return (
    <>
      <ProductFilter/>
      <ProductList/>
    </>
  );
}

export default Homepage;
