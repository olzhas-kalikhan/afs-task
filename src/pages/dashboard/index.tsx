import Sidebar from "@/components/sidebar";
import styles from "./dashboard.module.scss";
import CompanyCard from "@/components/company-card";
import PhotosCard from "@/components/photos-card";
import useCompanyGet from "@/hooks/use-company-get";
import ContactCard from "@/components/contact-card";
import useContactGet from "@/hooks/use-contact-get";
import { IconButton } from "@/components/ui/icon-button";
import OrganizationNameDialog from "@/components/orgaization-name-dialog";
import { observer } from "mobx-react-lite";
import { companyStore } from "@/store/company-store";
import OrganizationDeleteDialog from "@/components/oraganization-delete-dialog";

const OrganizationTitle = observer(() => (
  <h1 className={styles["dashboard__header-title"]}>
    {companyStore.companyName?.name}
  </h1>
));

function DashboardTitle() {
  return (
    <header className={styles["dashboard__header"]}>
      <IconButton
        iconName="Chevron"
        className={styles["dashboard__header-back"]}
      />
      <OrganizationTitle />
      <div>
        <OrganizationNameDialog />
        <OrganizationDeleteDialog
          className={styles["dashboard__header-delete"]}
        />
      </div>
    </header>
  );
}

function DashboardInit() {
  useCompanyGet("12");
  useContactGet("16");
  return null;
}

const DashboardShow = observer(
  ({ children }: { children: React.ReactNode }) => {
    if (!companyStore.company)
      return (
        <div className={styles["dashboard__no-organizations"]}>
          No organizations
        </div>
      );
    return children;
  }
);

function DashboardContent() {
  return (
    <div className={styles["dashboard__content"]}>
      <DashboardTitle />
      <CompanyCard />
      <ContactCard />
      <PhotosCard />
    </div>
  );
}

const DashboardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles["dashboard"]}>
      <DashboardInit />
      <Sidebar /> {/* TODO?: layout */}
      <DashboardShow>{children}</DashboardShow>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <DashboardContainer>
      <DashboardContent />
    </DashboardContainer>
  );
}
