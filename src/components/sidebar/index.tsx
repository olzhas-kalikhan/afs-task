import Button from "../ui/button";
import { IconButton } from "../ui/icon-button";
import Logo from "../ui/logo";
import styles from "./sidebar.module.scss";

export default function Sidebar() {
  return (
    <div className={styles["sidebar"]}>
      <div className={styles["sidebar__shortcuts-container"]}>
        <div className={styles["sidebar__shortcuts-menu"]}>
          <Logo />
          <IconButton iconName="Company" variant="sidebar" size="xl" />
          <IconButton iconName="Search" variant="sidebar" size="xl" />
        </div>
        <div className={styles["sidebar__shortcuts-menu"]}>
          <hr className={styles["sidebar__shortcuts-separator"]} />
          <IconButton iconName="Settings" variant="sidebar" size="xl" />
          <IconButton iconName="SignOut" variant="sidebar" size="xl" />
        </div>
      </div>
      <div className={styles["sidebar__content"]}>
        <div className={styles["sidebar__content-buttons"]}>
          <div>
            <h3 className={styles["sidebar__content-title"]}>
              Oak Tree Cemetery
            </h3>
            <h4 className={styles["sidebar__content-sub-title"]}>
              Process Manager
            </h4>
          </div>
          <hr className={styles["sidebar__content-separator"]} />
          <Button iconName="Company">Organizations</Button>
          <Button iconName="Contractor" variant="outline">
            Construction
          </Button>
          <Button iconName="Account" variant="outline">
            Clients
          </Button>
        </div>
        <h6 className={styles["sidebar__content-caption"]}>
          All Funeral Services © 2015-2025
        </h6>
      </div>
    </div>
  );
}
