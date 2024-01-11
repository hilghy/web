import React from "react";
import style from "./Header.module.css";

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.headerMain}>
        <h1 className={style.leftText}>Админка фильмотеки</h1>
        <div className={style.rightRectangle}>
          <div className={style.rightText}>Школьников Сергей</div>
        </div>
      </div>
    </header>
  );
};
