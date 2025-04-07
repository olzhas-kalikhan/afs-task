import { CardBody, CardEntry } from "../ui/card";
import Label from "../ui/label";
import { observer } from "mobx-react-lite";
import { contactStore } from "@/store/contact-store";

export const ContactDetails = observer(() => {
  const data = contactStore.contact;

  if (!data) return null;
  return (
    <CardBody>
      <CardEntry>
        <Label>Responsible Person: </Label>
        <div>
          {data.firstname} {data.lastname}
        </div>
      </CardEntry>
      <CardEntry>
        <Label>Phone number: </Label>
        <div>{data.phone}</div>
      </CardEntry>
      <CardEntry>
        <Label>E-mail: </Label>
        {data.email}
      </CardEntry>
    </CardBody>
  );
});
