import styles from "./Skeleton.module.css";

const variants = {
  text: [styles.skeleton, styles["skeleton--text"]],
  circle: [styles.skeleton, styles["skeleton--circle"]],
  rectangle: [styles.skeleton, styles["skeleton--rectangle"]],
} as const;

type SkeletonProps = {
  variant?: keyof typeof variants;
  width?: number | string;
  height?: number | string;
  count?: number;
  className?: string;
};

export const Skeleton = ({variant = "text", width, height, count = 1, className = "",}: SkeletonProps) => {
  const classes = [...variants[variant], className].join(" ");

  const defaultWidth = width ?? (variant === "text" ? "100%" : "200px");
  const defaultHeight = height ?? (variant === "text" ? "1em" : "300px");

  if (count > 1) {
    return (
      <>
        {Array.from({length: count}).map((_, i) => (
          <div
            key={i}
            className={classes}
            style={{width: defaultWidth, height: defaultHeight}}
          />
        ))}
      </>
    );
  }

  return (
    <div
      className={classes}
      style={{width: defaultWidth, height: defaultHeight}}
    />
  );
};
