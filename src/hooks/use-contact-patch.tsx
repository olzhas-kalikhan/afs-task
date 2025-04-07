import axios from "@/lib/axios";
import {
  Contact,
  contactStore,
  type ContactDetails,
} from "@/store/contact-store";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export function useContactPatch(contactId: string) {
  return useMutation({
    mutationFn: async (data: ContactDetails) => {
      const response = await axios.patch<Contact>(
        `/contacts/${contactId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => contactStore.setContact(data),
  });
}
