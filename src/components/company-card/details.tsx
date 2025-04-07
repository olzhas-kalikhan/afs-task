import { COMPANY_TYPE_LABELS, companyStore } from "@/store/company-store";
import { CardBody, CardEntry } from "../ui/card";
import Label from "../ui/label";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";

export const CompanyDetails = observer(() => {
  const data = companyStore.companyDetails;

  if (!data) return null;
  return (
    <CardBody>
      <CardEntry>
        <Label>Agreement: </Label>
        <div>
          {data.contract.no} / {format(data.contract.issue_date, "dd.MM.yyyy")}
        </div>
      </CardEntry>
      <CardEntry>
        <Label>Business entity: </Label>
        <div>{data.businessEntity}</div>
      </CardEntry>
      <CardEntry>
        <Label>Company type: </Label>
        <div>
          {data.type.map((type) => COMPANY_TYPE_LABELS[type]).join(", ")}
        </div>
      </CardEntry>
    </CardBody>
  );
});
