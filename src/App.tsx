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
  const heroFeatured = PRODUCTS.find((p) => p.id === '07') ?? PRODUCTS[0];

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
          <section aria-label="品牌首屏">
            <div className="hero-visual-wrap">
              <div className="hero-visual-inner">
                <img
                  src={heroFeatured.images[0]}
                  alt={`PETZLIFE ${heroFeatured.name}`}
                  className="hero-visual-img"
                />
              </div>
            </div>

            <div className="hero-editorial">
              <div className="container hero-editorial-grid">
                <div>
                  <p className="hero-tagline">{BRAND.tagline}</p>
                  <h1 className="hero-heading">PETZLIFE 全部系列</h1>

                  <p className="hero-featured-label">照片里的单品</p>
                  <button
                    id="hero-featured-product"
                    type="button"
                    className="hero-featured-item"
                    onClick={() => openProduct(heroFeatured.id)}
                  >
                    <span className="hero-featured-left">
                      <img
                        src={heroFeatured.images[0]}
                        alt={heroFeatured.name}
                        className="hero-featured-thumb"
                      />
                      <span>
                        <span className="hero-featured-name">
                          {heroFeatured.name}
                        </span>
                        <span
                          className="hero-featured-cat"
                          style={{ display: 'block' }}
                        >
                          {heroFeatured.category} ·{' '}
                          {formatPrice(heroFeatured.price)}
                        </span>
                      </span>
                    </span>
                    <span className="hero-featured-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </button>
                </div>

                <div className="hero-shop-stack">
                  <a
                    id="hero-taobao-link"
                    href={BRAND.taobaoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-bar action-bar--taobao"
                  >
                    <span>前往淘宝店铺</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    id="hero-xhs-link"
                    href={BRAND.xiaohongshuUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-bar action-bar--xhs"
                  >
                    <span>前往小红书主页</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section
            id="clothing"
            className="catalog-section"
            aria-labelledby="clothing-heading"
          >
            <div className="container">
              <div className="section-header">
                <h2 id="clothing-heading" className="section-title">
                  服装
                </h2>
                <span className="section-count">
                  共 {clothingProducts.length} 款
                </span>
              </div>

              <div className="lookbook-grid">
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
                    <div className="product-card-meta">
                      <div className="product-card-row">
                        <h3 className="product-card-name">{product.name}</h3>
                        <p className="product-card-price">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <p className="product-card-cat">{product.category}</p>
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
                <h2 id="accessories-heading" className="section-title">
                  周边
                </h2>
                <span className="section-count">
                  共 {accessoryProducts.length} 款
                </span>
              </div>

              <div className="lookbook-grid">
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
                    <div className="product-card-meta">
                      <div className="product-card-row">
                        <h3 className="product-card-name">{product.name}</h3>
                        <p className="product-card-price">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <p className="product-card-cat">{product.category}</p>
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
          <div className="footer-top">
            <div>
              <img
                src={BRAND.logo}
                alt="PETZLIFE"
                className="footer-logo"
              />
              <p className="footer-tagline">{BRAND.tagline}</p>
            </div>

            <div className="footer-wechat-card">
              <h2 className="footer-wechat-title">微信咨询与官方店铺</h2>
              <div className="footer-wechat-row">
                <span id="footer-wechat-id" className="footer-wechat-id">
                  {BRAND.wechatId}
                </span>
                <WechatCopyButton id="footer-copy-wechat" />
              </div>
              <div className="footer-shop-links">
                <a
                  id="footer-taobao-link"
                  href={BRAND.taobaoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-bar action-bar--taobao"
                >
                  <span>前往淘宝店铺</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  id="footer-xhs-link"
                  href={BRAND.xiaohongshuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-bar action-bar--xhs"
                >
                  <span>前往小红书主页</span>
                  <span aria-hidden="true">↗</span>
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
