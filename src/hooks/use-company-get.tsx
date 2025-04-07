import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { companyStore, type Company } from "@/store/company-store";
import Cookies from "js-cookie";
import { useEffect } from "react";

// Я не понял как работает mobx flow )))
export default function useCompanyGet(companyId: string) {
  const companyQuery = useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const response = await axios.get<Company>(`/companies/${companyId}`, {
        headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (companyQuery.data) {
      companyStore.setCompany(companyQuery.data);
    }
  }, [companyQuery.data]);

  return companyQuery;
}
