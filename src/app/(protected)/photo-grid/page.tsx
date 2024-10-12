import FancyboxWrapper from '@/components/FancyBoxWrapper';

import Layout from '@/components/ui/Layout';

const PhotoGrid = () => {
  return (
    <Layout>
      <FancyboxWrapper
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        <a data-fancybox='gallery' href='https://lipsum.app/id/60/1600x1200'>
          <img src='https://lipsum.app/id/60/200x150' width='200' height='150' />
        </a>
        <a data-fancybox='gallery' href='https://lipsum.app/id/61/1600x1200'>
          <img src='https://lipsum.app/id/61/200x150' width='200' height='150' />
        </a>
        <a data-fancybox='gallery' href='https://lipsum.app/id/62/1600x1200'>
          <img src='https://lipsum.app/id/62/200x150' width='200' height='150' />
        </a>
        <a data-fancybox='gallery' href='https://lipsum.app/id/63/1600x1200'>
          <img src='https://lipsum.app/id/63/200x150' width='200' height='150' />
        </a>
        <a data-fancybox='gallery' href='https://lipsum.app/id/64/1600x1200'>
          <img src='https://lipsum.app/id/64/200x150' width='200' height='150' />
        </a>
      </FancyboxWrapper>
    </Layout>
  );
};

export default PhotoGrid;
