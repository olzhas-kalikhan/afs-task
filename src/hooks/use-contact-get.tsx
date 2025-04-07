import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { contactStore, type Contact } from "@/store/contact-store";

export default function useContactGet(contactId: string) {
  const contactQuery = useQuery({
    queryKey: ["contact"],
    queryFn: async () => {
      const response = await axios.get<Contact>(`/contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (contactQuery.data) {
      contactStore.setContact(contactQuery.data);
    }
  }, [contactQuery.data]);

  return contactQuery;
}
