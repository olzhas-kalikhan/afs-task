import { action, computed, makeObservable, observable } from "mobx";

export type Contract = {
  no: string;
  issue_date: string;
};

export type CompanyPhoto = {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
};
export type Company = {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: BusinessEntity;
  contract: Contract;
  type: CompanyType[];
  status: "active"; //| "inactive";
  photos: CompanyPhoto[];
  createdAt: string;
  updatedAt: string;
};

export type CompanyDetails = Pick<
  Company,
  "name" | "businessEntity" | "contract" | "type"
>;
export const BUSINESS_ENTITIES = [
  "Sole Partnership",
  "PartnerShip",
  "Limited Liability Company",
] as const;

export type BusinessEntity = (typeof BUSINESS_ENTITIES)[number];

export const COMPANY_TYPE_LABELS = {
  burial_care_contractor: "Burial Care Contractor",
  funeral_home: "Funeral Home",
  logistics_services: "Logistic Services",
} as const;
export type CompanyType = keyof typeof COMPANY_TYPE_LABELS;

export class CompanyStore {
  company: Company | null = null;

  constructor() {
    makeObservable(this, {
      company: observable,
      companyDetails: computed,
      companyPhotos: computed,
      companyName: computed,
      setCompany: action,
      updateCompanyDetails: action,
      addCompanyPhoto: action,
      removeCompanyPhoto: action,
      reset: action,
    });
  }

  get companyDetails(): CompanyDetails | null {
    if (!this.company) return null;
    return {
      type: this.company.type,
      contract: this.company.contract,
      name: this.company.name,
      businessEntity: this.company.businessEntity,
    };
  }

  get companyPhotos(): CompanyPhoto[] {
    if (!this.company) return [];
    return this.company.photos;
  }
  get companyName(): Pick<Company, "name"> | null {
    if (!this.company) return null;
    return { name: this.company.name };
  }

  setCompany(newCompany: Company) {
    this.company = newCompany;
  }

  updateCompanyDetails(updates: CompanyDetails) {
    if (!this.company) return;
    this.company = Object.assign(this.company, updates);
  }

  addCompanyPhoto(newPhoto: CompanyPhoto) {
    if (!this.company) return;
    this.company.photos.push(newPhoto);
  }

  removeCompanyPhoto(photoName: string) {
    if (!this.company) return;
    this.company.photos = this.company.photos.filter(
      (p) => p.name != photoName
    );
  }

  reset() {
    this.company = null;
  }
}

export const companyStore = new CompanyStore();
