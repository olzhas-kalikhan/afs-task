import { action, makeObservable, observable } from "mobx";

export type Contact = {
  id: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
export type ContactDetails = Pick<
  Contact,
  "firstname" | "lastname" | "phone" | "email"
>;

export class ContactStore {
  contact: Contact | null = null;

  constructor() {
    makeObservable(this, {
      contact: observable,
      setContact: action,
      reset: action,
    });
  }

  setContact(newContact: Contact) {
    this.contact = newContact;
  }

  reset() {
    this.contact = null;
  }
}

export const contactStore = new ContactStore();
