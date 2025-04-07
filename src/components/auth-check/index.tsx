import { authStore } from "@/store/auth-store";
import { observer } from "mobx-react-lite";

const Auth = observer(
  ({
    children,
    isPublic,
  }: {
    children: React.ReactNode;
    isPublic?: boolean;
  }) => {
    const canAccess =
      (isPublic && !authStore.isAuthenticated) ||
      (!isPublic && authStore.isAuthenticated);

    if (!canAccess) return null;
    return <>{children}</>;
  }
);

export function Protected({ children }: { children: React.ReactNode }) {
  return <Auth>{children}</Auth>;
}
export function Public({ children }: { children: React.ReactNode }) {
  return <Auth isPublic>{children}</Auth>;
}
