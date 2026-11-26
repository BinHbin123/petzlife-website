import { BRAND } from '../data/products';

interface HeaderProps {
  onNavigateHome: (sectionId?: string) => void;
}

export function Header({ onNavigateHome }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          id="nav-logo"
          href="#/"
          className="brand-logo-link"
          aria-label="PETZLIFE 首页"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
          }}
        >
          <img
            src={BRAND.logo}
            alt="PETZLIFE Your cozy pet life"
            className="brand-logo-img"
          />
        </a>

        <nav className="header-nav" aria-label="主导航">
          <button
            id="nav-clothing"
            type="button"
            className="nav-link"
            onClick={() => onNavigateHome('clothing')}
          >
            服装
          </button>
          <button
            id="nav-accessories"
            type="button"
            className="nav-link"
            onClick={() => onNavigateHome('accessories')}
          >
            周边
          </button>
          <button
            id="nav-wechat"
            type="button"
            className="nav-link"
            onClick={() => onNavigateHome('wechat')}
          >
            微信咨询
          </button>
        </nav>
      </div>
    </header>
  );
}
