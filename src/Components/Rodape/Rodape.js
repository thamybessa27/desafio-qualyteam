import React from "react";
import style from "./Rodape.module.css";

const Rodape = () => {
  return (
    <footer className="rodape">
      <p className={style.pfooter}>
        {new Date().getFullYear()} - Desenvolvido por{" "}
        <a href="https://github.com/thamybessa27">Thamy Bessa</a>
      </p>
    </footer>
  );
};

export default Rodape;
