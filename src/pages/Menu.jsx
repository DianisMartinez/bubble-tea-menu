import { MENU } from "../data/menu";
import Category from "../components/Category";
import "../style/menu.css";

export default function Menu() {
  const base = import.meta.env.BASE_URL || "/";

  const files = [
    "menu-1.jpg",
    "menu-2.jpg",
    "menu-3.jpg",
    "menu-4.jpg",
    "menu-5.jpg",
  ];

  const urlCandidates = (file) => [
    `${base}images/${file}`,
    `/images/${file}`,
    `images/${file}`,
  ];

  const handleImgError = (e) => {
    const img = e.currentTarget;
    const file = img.getAttribute("data-file");
    const idx = Number(img.getAttribute("data-fallback") || "0");
    const candidates = urlCandidates(file);

    if (idx + 1 < candidates.length) {
      img.setAttribute("data-fallback", String(idx + 1));
      img.src = candidates[idx + 1];
    }
  };

  return (
    <div className="wrap pageDecor">
      {/* HERO */}
      <header className="hero">
        {/* Fotos */}
        <div className="photoStrip">
          {files.map((file) => (
            <img
              key={file}
              className="photo"
              src={`/images/${file}`}
              alt="Bubble Tea"
              onError={handleImgError}
            />
          ))}
        </div>

        {/* TÍTULO + LOGO */}
        <div className="heroBody">

          <div className="heroInline">
            <span className="brandTitle"> Menu </span>
          </div>

          <div className="taiwanBadge">
            Inspirado en Taiwan 🇹🇼
          </div>

          <img
            src="/images/logo.png"
            alt="Bubble Tea & Coffee logo"
            className="brandLogoHero"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />

          <p className="subtitle">
            Bebida fría de té o fruta + bolitas masticables 🧋😍
          </p>

        </div>
      </header>

      {/* CATEGORÍAS */}
      {MENU.map((cat) => (
        <Category key={cat.title} category={cat} />
      ))}

      {/* REDES */}
      <div className="socialBar">
        <a
          href="https://www.tiktok.com/@bubbleteaosorno"
          target="_blank"
          rel="noopener noreferrer"
          className="socialItem"
        >
          <i className="fa-brands fa-tiktok"></i>
          <span>@bubbleteaosorno</span>
        </a>

        <a
          href="https://www.instagram.com/bubbleteaosorno"
          target="_blank"
          rel="noopener noreferrer"
          className="socialItem"
        >
          <i className="fa-brands fa-instagram"></i>
          <span>@bubbleteaosorno</span>
        </a>
      </div>
      <footer className="footer">
        📍 Osorno · Precios sujetos a cambios
      </footer>
    </div>
  );
}