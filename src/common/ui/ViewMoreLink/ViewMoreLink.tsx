import s from './ViewMoreLink.module.css';

type Props = {
  to: string;
}

export const ViewMoreLink = ({to}: Props) => {
  return (
    <a
      href={to}
      data-discover="true"
      className={s.viewMoreLink}
    >
      View More
    </a>
  );
}