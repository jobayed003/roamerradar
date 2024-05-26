import Product from './_components/Product';

const ThingsProductPage = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;

  return <Product productId={productId} />;
};

export default ThingsProductPage;
