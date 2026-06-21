import React from "react";
import "./aboutus.css";

const AboutUs = () => {
  return (
    <section className="aboutus-dark-section">
      {/* Фоновый водяной знак */}
      <div className="aboutus-watermark">About us</div>

      <div className="aboutus-container">
        <div className="aboutus-left">
          <h2 className="aboutus-heading">About us</h2>
          <p className="aboutus-paragraph">
            In just a couple of years, we have opened 6 outlets in different cities: Kazan, Chelyabinsk, Ufa, Samara, Izhevsk, and in the future we plan to develop the network in other major cities of Russia.
          </p>

          <div className="aboutus-pizza-cluster">
            <img 
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=300" 
              alt="Pizza 1" 
              className="cluster-img img-1" 
            />
            <img 
              src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=300" 
              alt="Pizza 2" 
              className="cluster-img img-2" 
            />
            <img 
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300" 
              alt="Pizza 3" 
              className="cluster-img img-3" 
            />
          </div>

          <p className="aboutus-paragraph">
            The kitchen of each point is at least: 400-500 sq. m. meters, hundreds of employees, smoothly performing work in order to receive / prepare / form / deliver customer orders on time.
          </p>
        </div>

        <div className="aboutus-center">
           <svg className="dashed-arrow" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 25 Q 50 -10 95 25" stroke="white" strokeWidth="2" strokeDasharray="5 5" fill="none" />
              <path d="M90 20 L95 25 L90 30" stroke="white" strokeWidth="2" fill="none" />
           </svg>
        </div>

        <div className="aboutus-right">
          <div className="large-board-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800" 
              alt="Large Pizza" 
              className="large-pizza-board"
            />
          </div>
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="floating-fries">🍟</div>
      <div className="floating-slice">🍕</div>
    </section>
  );
};

export default AboutUs;
