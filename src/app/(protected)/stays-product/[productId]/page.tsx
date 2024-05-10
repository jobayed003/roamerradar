import Product from './_components/Product';

const StayProducts = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;

  return <Product />;
};

export default StayProducts;
