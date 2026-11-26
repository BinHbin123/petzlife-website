import { useCallback, useEffect, useState } from 'react';
import { BRAND, PRODUCTS, formatPrice, type Product } from './data/products';
import { Header } from './components/Header';
import { ProductDetail } from './components/ProductDetail';
import { WechatCopyButton } from './components/WechatCopyButton';

function getProductIdFromHash(): string | null {
  const match = window.location.hash.match(/^#\/product\/(\d+)$/);
  return match ? match[1] : null;
}

export function App() {
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    getProductIdFromHash(),
  );

  useEffect(() => {
    const handleHashChange = () => {
      setSelectedId(getProductIdFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const selectedProduct: Product | undefined = selectedId
    ? PRODUCTS.find((p) => p.id === selectedId)
    : undefined;

  useEffect(() => {
    if (selectedProduct) {
      document.title = `${selectedProduct.name} — ${BRAND.name}`;
    } else {
      document.title = `${BRAND.name} — ${BRAND.tagline}`;
    }
  }, [selectedProduct]);

  const openProduct = useCallback((id: string) => {
    window.location.hash = `#/product/${id}`;
    setSelectedId(id);
  }, []);

  const navigateHome = useCallback((sectionId?: string) => {
    if (window.location.hash.startsWith('#/product/')) {
      window.location.hash = '#/';
    }
    setSelectedId(null);

    window.requestAnimationFrame(() => {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, []);

  const clothingProducts = PRODUCTS.filter((p) => p.category === '服装');
  const accessoryProducts = PRODUCTS.filter((p) => p.category === '周边');

  return (
    <>
      <Header onNavigateHome={navigateHome} />

      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={() => navigateHome()}
          onSelectProduct={openProduct}
        />
      ) : (
        <main>
          <section className="hero" aria-label="品牌首屏">
            <div className="container hero-inner">
              <div className="hero-showcase">
                <a
                  href="#/product/01"
                  className="hero-frame hero-frame--side"
                  aria-label="查看 芋泥朵朵毛衣"
                  onClick={(e) => {
                    e.preventDefault();
                    openProduct('01');
                  }}
                >
                  <img
                    src="/assets/products/01/01.webp"
                    alt="PETZLIFE 芋泥朵朵毛衣"
                  />
                </a>
                <a
                  href="#/product/04"
                  className="hero-frame hero-frame--center"
                  aria-label="查看 云朵马甲棉服"
                  onClick={(e) => {
                    e.preventDefault();
                    openProduct('04');
                  }}
                >
                  <img
                    src="/assets/products/04/01.webp"
                    alt="PETZLIFE 云朵马甲棉服"
                  />
                </a>
                <a
                  href="#/product/10"
                  className="hero-frame hero-frame--side"
                  aria-label="查看 户外透气冲锋衣雨衣"
                  onClick={(e) => {
                    e.preventDefault();
                    openProduct('10');
                  }}
                >
                  <img
                    src="/assets/products/10/01.webp"
                    alt="PETZLIFE 户外透气冲锋衣雨衣"
                  />
                </a>
              </div>

              <h1 className="hero-tagline">{BRAND.tagline}</h1>
              <p className="hero-subtitle">
                PETZLIFE 宠物服装与生活周边 · 精选 {PRODUCTS.length} 款全部呈现
              </p>

              <div className="hero-actions">
                <a
                  id="hero-taobao-link"
                  href={BRAND.taobaoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--taobao"
                >
                  前往淘宝店铺
                </a>
                <a
                  id="hero-xhs-link"
                  href={BRAND.xiaohongshuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--xhs"
                >
                  前往小红书
                </a>
              </div>

              <a
                href="#clothing"
                className="hero-scroll-hint"
                onClick={(e) => {
                  e.preventDefault();
                  navigateHome('clothing');
                }}
              >
                向下浏览全部商品 ↓
              </a>
            </div>
          </section>

          <section
            id="clothing"
            className="catalog-section"
            aria-labelledby="clothing-heading"
          >
            <div className="container">
              <div className="section-header">
                <div className="section-title-wrap">
                  <h2 id="clothing-heading" className="section-title">
                    服装
                  </h2>
                  <span className="section-count">
                    {clothingProducts.length} 款
                  </span>
                </div>
                <p className="section-caption">点击任意款式查看多图细节</p>
              </div>

              <div className="product-grid">
                {clothingProducts.map((product) => (
                  <a
                    key={product.id}
                    id={`product-card-${product.id}`}
                    href={`#/product/${product.id}`}
                    className="product-card"
                    onClick={(e) => {
                      e.preventDefault();
                      openProduct(product.id);
                    }}
                  >
                    <div className="product-card-media">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="product-card-body">
                      <h3 className="product-card-name">{product.name}</h3>
                      <p className="product-card-price">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section
            id="accessories"
            className="catalog-section"
            aria-labelledby="accessories-heading"
          >
            <div className="container">
              <div className="section-header">
                <div className="section-title-wrap">
                  <h2 id="accessories-heading" className="section-title">
                    周边
                  </h2>
                  <span className="section-count">
                    {accessoryProducts.length} 款
                  </span>
                </div>
                <p className="section-caption">居家睡眠与日常陪伴好物</p>
              </div>

              <div className="product-grid product-grid--accessories">
                {accessoryProducts.map((product) => (
                  <a
                    key={product.id}
                    id={`product-card-${product.id}`}
                    href={`#/product/${product.id}`}
                    className="product-card"
                    onClick={(e) => {
                      e.preventDefault();
                      openProduct(product.id);
                    }}
                  >
                    <div className="product-card-media">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="product-card-body">
                      <h3 className="product-card-name">{product.name}</h3>
                      <p className="product-card-price">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      <footer id="wechat" className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img
                src={BRAND.logo}
                alt="PETZLIFE"
                className="footer-logo"
              />
              <p className="footer-tagline">{BRAND.tagline}</p>
            </div>

            <div className="footer-contact-card">
              <h2 className="footer-contact-title">微信咨询与官方店铺</h2>
              <p className="footer-contact-desc">
                想咨询尺码、款式搭配或其他问题，可添加 PETZLIFE 官方微信号：
              </p>

              <div className="footer-wechat-row">
                <span id="footer-wechat-id" className="footer-wechat-id">
                  {BRAND.wechatId}
                </span>
                <WechatCopyButton id="footer-copy-wechat" />
              </div>

              <div className="footer-store-links">
                <a
                  id="footer-taobao-link"
                  href={BRAND.taobaoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--taobao"
                >
                  前往淘宝店铺
                </a>
                <a
                  id="footer-xhs-link"
                  href={BRAND.xiaohongshuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--xhs"
                >
                  前往小红书
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {BRAND.name}</span>
            <span>{BRAND.tagline}</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
