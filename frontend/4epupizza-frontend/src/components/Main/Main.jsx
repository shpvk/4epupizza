import { useState } from "react";
import { Link } from "react-router-dom";
import "./Main.css";

function Main() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  console.log("Сейчас переменная isVideoOpen равна:", isVideoOpen);

  return (
    <main>
      <div className="pizza-background">Pizza</div>
      <div className="main-cont">
        <div className="text-section">
          <h1>
            The Fastest <br /> Pizza Delivery
          </h1>
          <p>
            We will deliver juicy pizza for your family in 30
            <br /> minutes, if the courier is late -{" "}
            <span className="freepizz">pizza is free!</span>
          </p>
          <p>Cooking process:</p>

          <div className="video-preview" onClick={() => setIsVideoOpen(true)}>
            <img src="https://zcncvckglgttnjwrwuuc.supabase.co/storage/v1/object/public/pizza-images/important/pizza-frame.png" className="preview-image" />
            <img src="https://zcncvckglgttnjwrwuuc.supabase.co/storage/v1/object/public/pizza-images/important/Ellipse2.png" className="play-button" />
          </div>
          <div>
            <Link to="/catalog" className="catalog-button">
              Каталог
            </Link>
          </div>
        </div>
        <div className="photo-section">
          <img src="https://zcncvckglgttnjwrwuuc.supabase.co/storage/v1/object/public/pizza-images/important/stepizza.jpeg" />
        </div>
      </div>

      {isVideoOpen && (
        <div className="vide-player" onClick={() => setIsVideoOpen(false)}>
          <div className="video-content" onClick={(e) => e.stopPropagation()}>
            <video
              src="https://zcncvckglgttnjwrwuuc.supabase.co/storage/v1/object/public/pizza-images/video/pizza-making-main.mp4"
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
