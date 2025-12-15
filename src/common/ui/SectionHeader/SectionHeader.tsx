import s from './SectionHeader.module.css';

type Props = {
  title: string
  className?: string
}
export const SectionHeader = ({title}: Props) => {
  return <h2 className={s.sectionHeader}>{title}</h2>
}