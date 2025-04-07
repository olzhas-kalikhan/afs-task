import axios from "@/lib/axios";
import { companyStore } from "@/store/company-store";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export function useCompanyPhotoDelete(companyId: string) {
  return useMutation({
    mutationFn: async (imgName: string) => {
      await axios.delete(`/companies/${companyId}/image/${imgName}`, {
        headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
      });
      return imgName;
    },
    onSuccess: (imgName) => {
      companyStore.removeCompanyPhoto(imgName);
    },
  });
}
