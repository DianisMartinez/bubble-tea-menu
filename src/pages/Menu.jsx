import { MENU } from "../data/menu";
import Category from "../components/Category";
import "../style/menu.css";
import { useEffect } from "react";

export default function Menu() {
  const base = import.meta.env.BASE_URL || "/";

  useEffect(() => {
    const container = document.createElement("div");
    container.className = "tapiocaContainer";
    document.body.appendChild(container);

    for (let i = 0; i < 25; i++) {
      const boba = document.createElement("div");
      boba.className = "tapioca";
      boba.style.left = Math.random() * 100 + "vw";
      boba.style.animationDuration = 5 + Math.random() * 5 + "s";
      boba.style.opacity = Math.random().toString();
      container.appendChild(boba);
    }

    const timeout = setTimeout(() => {
      container.remove();
    }, 5000);

    return () => {
      clearTimeout(timeout);
      container.remove();
    };
  }, []);



  return (
    <div className="wrap pageDecor">
      {/* HERO */}
      <header className="hero">
        <div className="heroBody">
          <img
            src={`${base}images/logo.png`}
            alt="Bubble Tea & Coffee logo"
            className="brandLogoHero"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
           <div className="taiwanBadge">
            Inspirado en Taiwan 🇹🇼
          </div>
          <p className="subtitle">
            Bebida Asiatica frutal o leche + bolitas masticables 🧋😍
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
        Precios sujetos a cambios
      </footer>
    </div>
  );
}