import { useEffect, useState } from 'react';
import { BRAND, PRODUCTS, formatPrice, type Product } from '../data/products';
import { WechatCopyButton } from './WechatCopyButton';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (id: string) => void;
}

export function ProductDetail({
  product,
  onBack,
  onSelectProduct,
}: ProductDetailProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [product.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (product.images.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === 0 ? product.images.length - 1 : prev - 1,
        );
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === product.images.length - 1 ? 0 : prev + 1,
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product.images.length]);

  const currentImage = product.images[activeIndex] ?? product.images[0];
  const hasMultiple = product.images.length > 1;

  const relatedProducts = PRODUCTS.filter((item) => item.id !== product.id)
    .sort((a, b) => {
      if (a.category === product.category && b.category !== product.category) {
        return -1;
      }
      if (a.category !== product.category && b.category === product.category) {
        return 1;
      }
      return Number(a.id) - Number(b.id);
    })
    .slice(0, 4);

  return (
    <main className="detail-page">
      <div className="container">
        <div className="back-bar">
          <button
            id="detail-back-button"
            type="button"
            className="back-button"
            onClick={onBack}
          >
            <span aria-hidden="true">←</span>
            返回全部商品
          </button>
        </div>

        <div className="detail-layout">
          <section className="gallery" aria-label="商品图片展示">
            <div className="gallery-main">
              <img
                src={currentImage}
                alt={`${product.name} - 展示图 ${activeIndex + 1}`}
              />
              {hasMultiple && (
                <>
                  <button
                    id="gallery-prev"
                    type="button"
                    className="gallery-arrow gallery-arrow--prev"
                    aria-label="上一张图片"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === 0 ? product.images.length - 1 : prev - 1,
                      )
                    }
                  >
                    ‹
                  </button>
                  <button
                    id="gallery-next"
                    type="button"
                    className="gallery-arrow gallery-arrow--next"
                    aria-label="下一张图片"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === product.images.length - 1 ? 0 : prev + 1,
                      )
                    }
                  >
                    ›
                  </button>
                  <span className="gallery-counter">
                    {activeIndex + 1} / {product.images.length}
                  </span>
                </>
              )}
            </div>

            {hasMultiple && (
              <div className="gallery-thumbs" role="list" aria-label="切换细节图">
                {product.images.map((imgSrc, idx) => (
                  <button
                    key={imgSrc}
                    type="button"
                    className={`gallery-thumb ${
                      idx === activeIndex ? 'gallery-thumb--active' : ''
                    }`}
                    aria-label={`查看第 ${idx + 1} 张图片`}
                    aria-current={idx === activeIndex ? 'true' : undefined}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <img src={imgSrc} alt={`${product.name} 缩略图 ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="detail-info" aria-label="商品信息与购买入口">
            <span
              className={`detail-category ${
                product.category === '周边' ? 'detail-category--accessory' : ''
              }`}
            >
              {product.category}
            </span>

            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-brand-note">{BRAND.name}</p>

            <p className="detail-price">{formatPrice(product.price)}</p>

            <div className="detail-divider" />

            <p className="detail-section-label">前往官方店铺购买</p>
            <div className="detail-buy-buttons">
              <a
                id="detail-taobao-link"
                href={BRAND.taobaoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--taobao"
              >
                前往淘宝店铺
              </a>
              <a
                id="detail-xhs-link"
                href={BRAND.xiaohongshuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--xhs"
              >
                前往小红书
              </a>
            </div>
            <p className="detail-buy-hint">
              点击后将打开 PETZLIFE 对应平台的店铺主页完成选购与下单。
            </p>

            <div className="wechat-box">
              <div>
                <p className="wechat-box-label">尺码或搭配疑问？添加微信咨询</p>
                <p className="wechat-box-id">{BRAND.wechatId}</p>
              </div>
              <WechatCopyButton id="detail-copy-wechat" />
            </div>
          </section>
        </div>

        <section className="related-section" aria-label="继续浏览其他款式">
          <div className="section-header">
            <div className="section-title-wrap">
              <h2 className="section-title">继续浏览</h2>
              <span className="section-count">MORE</span>
            </div>
          </div>
          <div className="product-grid">
            {relatedProducts.map((item) => (
              <a
                key={item.id}
                href={`#/product/${item.id}`}
                className="product-card"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectProduct(item.id);
                }}
              >
                <div className="product-card-media">
                  <img src={item.images[0]} alt={item.name} loading="lazy" />
                </div>
                <div className="product-card-body">
                  <h3 className="product-card-name">{item.name}</h3>
                  <p className="product-card-price">{formatPrice(item.price)}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
