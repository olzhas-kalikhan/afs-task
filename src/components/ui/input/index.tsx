import styles from "./input.module.scss";
import clsx from "clsx";

export default function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={clsx(styles.input, className)} {...props} />;
}
