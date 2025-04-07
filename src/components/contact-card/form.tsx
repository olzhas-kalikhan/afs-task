import { CardBody, CardEntry } from "../ui/card";
import Input from "../ui/input";
import Label from "../ui/label";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { useContactPatch } from "@/hooks/use-contact-patch";
import { contactStore } from "@/store/contact-store";

const formDefaultValues = {
  fullName: "",
  phone: "",
  email: "",
};

export const ContactForm = observer(
  ({ formId, onSubmit }: { formId: string; onSubmit: () => void }) => {
    const data = contactStore.contact;
    const formData = data
      ? {
          phone: data.phone,
          email: data.email,
          fullName: [data.firstname, data.lastname].join(" "),
        }
      : null;

    const form = useForm({ defaultValues: formData ?? formDefaultValues });
    const contactPatch = useContactPatch("16"); // TODO: pass from context or url

    return (
      <form
        id={formId}
        onSubmit={form.handleSubmit(async (values) => {
          const [firstname, lastname] = values.fullName.split(" ");
          await contactPatch.mutateAsync({
            firstname,
            lastname,
            phone: values.phone,
            email: values.email,
          });
          onSubmit();
        })}
      >
        <CardBody data-mode="edit">
          <CardEntry>
            <Label>Responsible Person:</Label>
            <Input {...form.register("fullName")} />
          </CardEntry>
          <CardEntry>
            <Label>Phone number:</Label>
            <Input {...form.register("phone")} />
          </CardEntry>
          <CardEntry>
            <Label>E-mail:</Label>
            <Input {...form.register("email")} />
          </CardEntry>
        </CardBody>
      </form>
    );
  }
);
