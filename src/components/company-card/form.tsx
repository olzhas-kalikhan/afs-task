import { CardBody, CardEntry, CardFieldsGroup } from "../ui/card";
import Input from "../ui/input";
import Label from "../ui/label";
import { MultiSelect, SingleSelect } from "../ui/select";
import { Controller, useForm } from "react-hook-form";
import {
  BUSINESS_ENTITIES,
  COMPANY_TYPE_LABELS,
  companyStore,
  type CompanyDetails,
} from "@/store/company-store";
import { observer } from "mobx-react-lite";
import { useCompanyPatch } from "@/hooks/use-company-patch";
import DatePicker from "../ui/date-picker";
import { parseJSON } from "date-fns";

const formDefaultValues = {
  name: "",
  businessEntity: "PartnerShip",
  contract: {
    no: "",
    issue_date: "",
  },
  type: [],
} satisfies CompanyDetails;

const CompanyTypeOptions = Object.keys(
  COMPANY_TYPE_LABELS
) as (keyof typeof COMPANY_TYPE_LABELS)[];

export const CompanyForm = observer(
  ({ formId, onSubmit }: { formId: string; onSubmit: () => void }) => {
    const data = companyStore.companyDetails;
    const form = useForm({ defaultValues: data ?? formDefaultValues });
    const companyMutation = useCompanyPatch("12"); //pass from context or url

    return (
      <form
        id={formId}
        onSubmit={form.handleSubmit(async (values) => {
          await companyMutation.mutateAsync(values);
          onSubmit();
        })}
      >
        <CardBody data-mode="edit">
          <CardEntry>
            <Label>Agreement: </Label>
            <CardFieldsGroup>
              <Input {...form.register("contract.no")} />
              <Label>Date:</Label>
              <Controller
                control={form.control}
                name="contract.issue_date"
                render={({ field }) => (
                  <DatePicker
                    value={parseJSON(field.value)}
                    onValueChange={(date) =>
                      field.onChange(date?.toJSON() ?? "")
                    }
                  />
                )}
              />
            </CardFieldsGroup>
          </CardEntry>
          <CardEntry>
            <Label>Business entity:</Label>
            <Controller
              control={form.control}
              name="businessEntity"
              render={({ field }) => (
                <SingleSelect
                  value={field.value}
                  getLabel={(option) => option}
                  onValueChange={field.onChange}
                  options={BUSINESS_ENTITIES}
                />
              )}
            />
          </CardEntry>
          <CardEntry>
            <Label>Company type:</Label>
            <Controller
              control={form.control}
              name="type"
              render={({ field }) => (
                <MultiSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  options={CompanyTypeOptions}
                  getLabel={(option) => COMPANY_TYPE_LABELS[option]}
                />
              )}
            />
          </CardEntry>
        </CardBody>
      </form>
    );
  }
);
