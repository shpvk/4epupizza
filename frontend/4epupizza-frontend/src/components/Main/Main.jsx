import { useState } from "react";
import { Link } from "react-router-dom";
import "./Main.css";

function Main() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <main className="hero">
      <div className="hero__glow" aria-hidden="true"></div>
      <span className="hero__watermark" aria-hidden="true">Pizza</span>

      <div className="hero__grid">
        <div className="hero__content">
          <span className="hero__eyebrow">
            <span className="hero__pulse" aria-hidden="true"></span>
            Доставка за 30 хвилин
          </span>

          <h1 className="hero__title">
            The Fastest
            <span className="hero__title-accent"> Pizza </span>
            Delivery
          </h1>

          <p className="hero__lead">
            Соковита піца для всієї родини за 30 хвилин.{" "}
            <br />
            Кур'єр запізнився — <span className="hero__free">піца безкоштовно!</span>
          </p>

          <div className="hero__actions">
            <Link to="/constructor" className="hero__cta">
              Зібрати свою піцу
              <span className="hero__cta-arrow" aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              className="hero__play"
              onClick={() => setIsVideoOpen(true)}
            >
              <span className="hero__play-icon" aria-hidden="true">▶</span>
              Як ми готуємо
            </button>
          </div>

          <ul className="hero__stats">
            <li>
              <strong>30<span>хв</span></strong>
              <em>середня доставка</em>
            </li>
            <li>
              <strong>50<span>+</span></strong>
              <em>начинок у конструкторі</em>
            </li>
            <li>
              <strong>4.9<span>★</span></strong>
              <em>оцінка гостей</em>
            </li>
          </ul>
        </div>

        <div className="hero__visual">
          <span className="hero__ring hero__ring--solid" aria-hidden="true"></span>
          <span className="hero__ring hero__ring--dashed" aria-hidden="true"></span>
          <img
            className="hero__pizza"
            src="/img/stepizza.jpeg"
            alt="Фірмова піца 4epupizza"
          />
          <div className="hero__badge">
            <strong>30 хв</strong>
            <span>або безкоштовно</span>
          </div>
        </div>
      </div>

      {isVideoOpen && (
        <div className="vide-player" onClick={() => setIsVideoOpen(false)}>
          <div className="video-content" onClick={(e) => e.stopPropagation()}>
            <div className="close-button">
              <button onClick={() => setIsVideoOpen(false)}>
                <img src="/img/close.png" alt="Закрити" />
              </button>
            </div>

            <video
              src="./video/0603.mp4"
              controls
              autoPlay
              style={{ width: "100%", borderRadius: "20px" }}
            ></video>
          </div>
        </div>
      )}
    </main>
  );
}

export default Main;
