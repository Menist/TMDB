import {ViewMoreLink} from "../../../common/ui/ViewMoreLink";
import {SectionHeader} from "../../../common/ui/SectionHeader";
import s from './SectionHeaderBlock.module.css'
import {SectionHeaderBlockSkeleton} from "./SectionHeaderBlockSkeleton";

type Props = {
  title: string
  to: string
  className?: string
  showViewMore: boolean
  isLoading: boolean
}
export const SectionHeaderBlock = ({ to, className, title, showViewMore, isLoading }: Props) => {
  return isLoading ? (
    <SectionHeaderBlockSkeleton />

) : (
    <section className={className ? `${className} ${s.sectionHeaderBlock}` : s.sectionHeaderBlock}>
      <SectionHeader title={title} />
      {showViewMore && <ViewMoreLink to={to} />}
    </section>
  );
};