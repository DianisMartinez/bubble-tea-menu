import { useState, useEffect } from "react";

export const DrinkAI = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
      setMessage("Tócame y te recomiendo una bebida 🧋");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const askAI = () => {
    const drinks = [
      "OSORNO SPECIAL",
      "BUBBLE CLASICO",
      "BROWN SUGAR BOBA",
      "MANGO MATCHA FUSION",
      "MATCHA LATTE",
      "COCONUT TARO",
      "MARACUYÁ",
      "TARO MILK TEA",
      "MANGO PARADISE",
      "GREEN ISLAND",
      
    ];

    const random = drinks[Math.floor(Math.random() * drinks.length)];

    setMessage(random);
  };

  return (
    <>
      {show && (
        <div
          className="helper"
          onClick={askAI}
          style={{ position: "fixed", bottom: "20px", right: "20px", fontSize: "45px", cursor: "pointer", zIndex: 999 }}
        >
          🧋
        </div>
      )}

      {message && (
        <div
          className="bubble"
          style={{ position: "fixed", bottom: "90px", right: "20px", background: "white", padding: "12px", borderRadius: "15px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)", maxWidth: "220px" }}
        >
          {message}
        </div>
      )}
    </>
  );
};