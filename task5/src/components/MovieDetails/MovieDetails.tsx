import React, { useEffect, useState } from "react";
import CopyButton from "./../../assets/copy.png";
import EditButton from "./../../assets/edit.png";
import style from "./MovieDetails.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById } from "./../../Services/apiService";
import { MovieDetailsData } from "../../types";
import NotFoundImage from "./../../assets/404.png";
import { NotificationManager } from "react-notifications";
import { MdOutlineFavorite,  MdOutlineFavoriteBorder} from "react-icons/md";

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsData>();
  const [favorite, setFavorite] = useState<string | null>()
  useEffect(() => {
    getMovieById(Number(id))
      .then((response) => {
        setMovie(response);
      })
      .catch(() => {
        NotificationManager.error(`;(`, "Ошибка при получении фильма по id");
      });
    setFavorite(window.localStorage.getItem(`${id}`))
  }, [id]);

  const saveToBuffer = () => {
    navigator.clipboard.writeText(`${movie?.id}`);
    NotificationManager.success(`id = ${movie?.id}`, "Id успешно скопирован");
  };
  
  const addToFavorite = () => {
    if(favorite){
      window.localStorage.removeItem(`${movie?.id}`);
      setFavorite(null);
      NotificationManager.success("Фильм убран из избранных");
    }
    else {
      window.localStorage.setItem(`${movie?.id}`, `fav`);
      setFavorite(window.localStorage.getItem(`${id}`))
      NotificationManager.success("Фильм добавлен в избранные");
    }
  }

  return (
    <div className={style.movieDetails}>
      <div className={style.movieDetailsHeader}>
        <div className={style.idBlock} onClick={saveToBuffer}>
          Id: {movie?.id}
          <img
            alt="copy"
            className={style.copyButtonImage}
            src={CopyButton}
          ></img>
        </div>
        <div
          className={style.editBlock}
          onClick={() => {
            navigate(`/movies/${id}/edit`);
          }}
        >
          <img
            className={style.editButtonImage}
            src={EditButton}
            alt="edit"
          ></img>
          Редактировать
        </div>
      </div>
      <div className={style.movieDetailsMain}>
        <img
          className={style.imageWrapper}
          width="300px"
          height="300px"
          src={movie?.posterUrl}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = NotFoundImage;
          }}
          alt="poster"
        />
        <div className={style.movieDetailsInfo}>
          <div className={style.title}>{movie?.title}</div>
          <div className={style.author}>{movie?.director}</div>
          <div className={style.paramsAndRolesWrapper}>
            <section className={style.params}>
              <div className={style.paramTitle}>Параметры</div>
              <div className={style.paramRow}>
                <div className={style.paramKey}>Год производства</div>
                <div className={style.paramValue}>{movie?.year}</div>
              </div>
              <div className={style.paramRow}>
                <div className={style.paramKey}>Продолжительность</div>
                <div className={style.paramValue}>{movie?.runtime}</div>
              </div>
            </section>

            <section className={style.roles}>
              <div className={style.roleTitle}>В главных ролях</div>
              {movie?.actors.split(",").map((actor, i) => (
                <div className={style.role} key={i}>
                  {actor}
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
      <section className={style.descriptionSection}>
        <div className={style.descriptionTitle}>Описание</div>
        <div className={style.description}>{movie?.plot}</div>
      </section>
      <section className={style.rateSection}>
        <div className={style.rateTitle}>Текущий рейтинг</div>
        <div className={style.rateValue}>{movie?.rate ?? "-"} {favorite ? <MdOutlineFavorite onClick={addToFavorite} /> : <MdOutlineFavoriteBorder onClick={addToFavorite} />}</div>
      </section>
    </div>
  );
};
