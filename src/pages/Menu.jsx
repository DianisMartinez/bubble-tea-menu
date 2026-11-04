import { MENU } from "../data/menu";
import Category from "../components/Category";
import BubbleScene from "../components/BubbleScene";
import "../style/menu.css";

export default function Menu() {
  const base = import.meta.env.BASE_URL || "/";

  return (
    <>
      <header className="hero">
        <BubbleScene />
        <span className="heroZh" aria-hidden="true">珍珠奶茶</span>
        <div className="heroBody">
          <h1 className="heroLogo">
            <img src={`${base}images/logo.png`} alt="Bubble Tea & Coffee" />
          </h1>
          <p className="heroOrigin">Inspirado en Taiwán</p>
          <p className="heroTagline">Té, leche y perlas de tapioca masticables.</p>
        </div>
        <svg className="heroWave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 40c120-34 240-34 360 0s240 34 360 0 240-34 360 0 240 34 360 0v30H0z" />
        </svg>
      </header>

      <main className="wrap">
        {MENU.map((cat) => (
          <Category key={cat.title} category={cat} />
        ))}
      </main>

      <footer className="footer">
        <div className="social">
          <a href="https://www.tiktok.com/@bubbleteaosorno" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-tiktok" aria-hidden="true"></i>
            <span>TikTok</span>
          </a>
          <a href="https://www.instagram.com/bubbleteaosorno" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram" aria-hidden="true"></i>
            <span>Instagram</span>
          </a>
        </div>
        <p className="handle">@bubbleteaosorno</p>
        <p className="note">Precios sujetos a cambios</p>
      </footer>
    </>
  );
}
