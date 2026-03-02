import s from './Skeleton.module.css'

type SkeletonProps = {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  className?: string
  margin?: string
  padding?: string
}
export const Skeleton = ({width = '100%', height = '20px', borderRadius = '4px', className, margin, padding}: SkeletonProps) => {
  return (
    <div
      className={`${s.skeleton} ${className || ''}`}
      style={{width, height, borderRadius, margin, padding}}
    />
  )
}