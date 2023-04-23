import { useState } from 'react';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import backgroundImage from '@/assets/background-faqs.jpg';

function CallToAction() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
      <section
          id="get-started-today"
          className="relative overflow-hidden bg-blue-600 py-32"
      >
        <img
            className={`absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            src={backgroundImage}
            alt=""
            width={2347}
            height={1244}
            onLoad={handleImageLoad}
        />
        <Container className="relative">
          <div className="mx-auto max-w-sm text-center">
            <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
              开始使用
            </h2>
            <p className="mt-4 text-lg tracking-tight text-white">
              立即使用海量的 ChatGPT 锦囊，或在几秒钟内创建属于自己的锦囊。
            </p>
            <Button href="/app/new" color="white" className="mt-10">
              创建锦囊
            </Button>
          </div>
        </Container>
      </section>
  );
}

export default CallToAction;
