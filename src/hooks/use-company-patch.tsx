import axios from "@/lib/axios";
import { companyStore, type CompanyDetails } from "@/store/company-store";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export function useCompanyPatch(companyId: string) {
  return useMutation({
    mutationFn: async (data: Partial<CompanyDetails>) => {
      const response = await axios.patch<CompanyDetails>(
        `/companies/${companyId}`,
        data,
        {
          headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
        }
      );
      return response.data;
    },
    onSuccess(data) {
      companyStore.updateCompanyDetails(data);
    },
  });
}
