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
  const [wechatOpen, setWechatOpen] = useState(false);

  useEffect(() => {
    setWechatOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [product.id]);

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
            className="back-link"
            onClick={onBack}
          >
            <span aria-hidden="true">←</span>
            返回全部商品
          </button>
        </div>

        <section className="detail-upper" aria-label="商品信息与购买入口">
          <div className="detail-main-photo">
            <img src={product.images[0]} alt={product.name} />
          </div>

          <div className="detail-summary">
            <p className="detail-eyebrow">
              {product.category} · {BRAND.name}
            </p>
            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-price">{formatPrice(product.price)}</p>
            <p id="detail-shipping" className="detail-shipping">
              运费：{BRAND.shippingRule}
            </p>
            <p className="detail-note">
              点击下方按钮可直达淘宝同款商品页或小红书品牌主页；尺码与搭配疑问可展开微信咨询。
            </p>

            <div className="detail-actions">
              <a
                id="detail-taobao-link"
                href={product.taobaoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-bar action-bar--taobao"
              >
                <span>前往淘宝购买同款</span>
                <span aria-hidden="true">↗</span>
              </a>

              <a
                id="detail-xhs-link"
                href={BRAND.xiaohongshuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-bar action-bar--xhs"
              >
                <span>前往小红书主页</span>
                <span aria-hidden="true">↗</span>
              </a>

              <div>
                <button
                  id="detail-wechat-toggle"
                  type="button"
                  className="action-bar action-bar--accordion"
                  aria-expanded={wechatOpen}
                  onClick={() => setWechatOpen((prev) => !prev)}
                >
                  <span>微信咨询</span>
                  <span aria-hidden="true">{wechatOpen ? '−' : '+'}</span>
                </button>
                {wechatOpen && (
                  <div className="accordion-panel">
                    <div>
                      <p className="accordion-wechat-label">PETZLIFE 官方微信号</p>
                      <p className="accordion-wechat-id">{BRAND.wechatId}</p>
                    </div>
                    <WechatCopyButton id="detail-copy-wechat" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="detail-shoot" aria-label="商品实拍">
          <aside className="detail-shoot-aside">
            <h2 className="detail-shoot-title">商品实拍</h2>
            <p className="detail-shoot-desc">
              {BRAND.name} · {product.name}
              <br />
              共 {product.images.length} 张实拍细节图，向下滑动即可完整浏览。
            </p>
          </aside>

          <div className="detail-shoot-stack">
            {product.images.map((imgSrc, idx) => (
              <div key={imgSrc} className="detail-shoot-frame">
                <img
                  src={imgSrc}
                  alt={`${product.name} 实拍图 ${idx + 1}`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="related-section" aria-label="继续浏览其他款式">
          <div className="section-header">
            <h2 className="section-title">继续浏览</h2>
            <span className="section-count">MORE</span>
          </div>
          <div className="lookbook-grid">
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
                <div className="product-card-meta">
                  <div className="product-card-row">
                    <h3 className="product-card-name">{item.name}</h3>
                    <p className="product-card-price">{formatPrice(item.price)}</p>
                  </div>
                  <p className="product-card-cat">{item.category}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
