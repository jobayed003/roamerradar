import Product from './_components/Product';

const CarProductPage = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;

  return <Product />;
};

export default CarProductPage;
