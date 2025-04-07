import * as Dialog from "@radix-ui/react-dialog";
import styles from "./dialog.module.scss";
import Button from "../button";

export function DialogContainer({ children, ...props }: Dialog.DialogProps) {
  return <Dialog.Root {...props}>{children}</Dialog.Root>;
}
export function DialogTrigger({ children }: { children: React.ReactNode }) {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Title className={styles["dialog__title"]}>{children}</Dialog.Title>
  );
}
export function DialogActions({ children }: { children: React.ReactNode }) {
  return <div className={styles["dialog__actions"]}>{children}</div>;
}
export function DialogClose({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Close asChild>
      <Button variant="outline">{children}</Button>
    </Dialog.Close>
  );
}
export function DialogPortal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles["dialog__overlay"]} />
      {children}
    </Dialog.Portal>
  );
}

export function DialogContent({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Content className={styles["dialog__content"]} asChild={asChild}>
      {children}
    </Dialog.Content>
  );
}
