import s from './MovieActors.module.css';

type MovieActorsProps = {
  posterUrl: string | undefined
  name: string
  character: string
}

export const MovieActors = ({ posterUrl, name, character }: MovieActorsProps) => {
  return (
    <article className={s.actorCard}>
      <img
        src={posterUrl ?? '/placeholder.jpg'}
        alt={`Actor ${name}`}
        className={s.actorImage}
      />
      <p className={s.actorCharacter}>{character}</p>
      <p className={s.actorName}>{name}</p>
    </article>
  );
};