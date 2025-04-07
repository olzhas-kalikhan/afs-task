import clsx from "clsx";
import styles from "./label.module.scss";

export default function Label({
  children,
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={clsx(styles["label"], className)} {...props}>
      {children}
    </label>
  );
}
