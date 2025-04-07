import axios from "@/lib/axios";
import { CompanyPhoto, companyStore } from "@/store/company-store";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export function useCompanyPhotoPost(companyId: string) {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post<CompanyPhoto>(
        `/companies/${companyId}/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      companyStore.addCompanyPhoto(data);
    },
  });
}
