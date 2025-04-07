import SvgIcon, { type IconName } from "../svg-icon";
import styles from "./icon-button.module.scss";
import clsx from "clsx";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "filled" | "ghost" | "sidebar";
  icon?: React.ReactNode;
  size?: "md" | "lg" | "xl";
  iconName: IconName;
};

export function IconButton({
  size = "md",
  variant = "ghost",
  iconName,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        styles["icon-button"],
        styles[`icon-button--${variant}`],
        styles[`icon-button--${size}`],
        className
      )}
      {...props}
    >
      <SvgIcon iconName={iconName} />
    </button>
  );
}
