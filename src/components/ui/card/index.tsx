import styles from "./card.module.scss";

export function Card({ children }: { children: React.ReactNode }) {
  return <div className={styles["card"]}>{children}</div>;
}
export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className={styles["card__header"]}>{children}</div>;
}
export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles["card__title"]}>{children}</h2>;
}
export function CardFieldsGroup({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={styles["card__group"]} {...props}>
      {children}
    </div>
  );
}
export function CardBody({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={styles["card__body"]} {...props}>
      {children}
    </div>
  );
}
export function CardEntry({ children }: { children: React.ReactNode }) {
  return <div className={styles["card__entry"]}>{children}</div>;
}
