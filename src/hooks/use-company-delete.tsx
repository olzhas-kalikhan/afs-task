import axios from "@/lib/axios";
import { companyStore, type CompanyDetails } from "@/store/company-store";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export function useCompanyDelete(companyId: string) {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete<CompanyDetails>(
        `/companies/${companyId}`,
        { headers: { Authorization: `Bearer ${Cookies.get("authToken")}` } }
      );
      return response.data;
    },
    onSuccess() {
      companyStore.reset();
    },
  });
}
