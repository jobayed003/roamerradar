import Product from './_components/Product';

const ProductPage = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;

  return <Product />;
};

export default ProductPage;
