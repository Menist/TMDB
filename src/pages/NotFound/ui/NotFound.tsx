import {ButtonLink} from "../../../components/ButtonLink";
import {Path} from "../../../app/providers/RouterProvider";
import s from './NotFound.module.css'

export const NotFoundPage = () => {
  return (
    <div className="container">
      <div className={s.notFoundContainer}>
        <div className={s.notFoundContent}>
          <h1 className={s.errorCode}>404</h1>
          <h2 className={s.errorTitle}>Старонка не знойдзена</h2>
          <p className={s.errorDescription}>
            На жаль, запытаная старонка не існуе або была перамешчаная.
          </p>
          <ButtonLink
            to={Path.Main}
          >
            Вярнуцца на галоўную
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};
