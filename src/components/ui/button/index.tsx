import styles from "./button.module.scss";
import clsx from "clsx";
import SvgIcon, { type IconName } from "../svg-icon";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "filled" | "outline" | "flat" | "icon";
  iconName?: IconName;
};

export default function Button({
  children,
  variant = "filled",
  iconName,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(styles.button, styles[`button--${variant}`])}
      {...props}
    >
      {/* TODO: и так сойдет */}
      {iconName ? (
        <SvgIcon className={styles["button__icon"]} iconName={iconName} />
      ) : (
        <span />
      )}
      {children}
      <span />
    </button>
  );
}
