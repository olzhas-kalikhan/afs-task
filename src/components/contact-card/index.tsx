import { useId, useState } from "react";
import Button from "../ui/button";
import { Card, CardFieldsGroup, CardHeader, CardTitle } from "../ui/card";
import { ContactForm } from "./form";
import { ContactDetails } from "./details";

export default function ContactCard() {
  const [isEditMode, setIsEditMode] = useState(false);
  const formId = useId();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Details</CardTitle>
        {isEditMode ? (
          <CardFieldsGroup>
            <Button variant="flat" iconName="Check" type="submit" form={formId}>
              Save Changes
            </Button>
            <Button
              variant="flat"
              iconName="X"
              onClick={() => setIsEditMode(false)}
            >
              Cancel
            </Button>
          </CardFieldsGroup>
        ) : (
          <Button
            variant="flat"
            iconName="Edit"
            onClick={() => {
              setIsEditMode(true);
            }}
          >
            Edit
          </Button>
        )}
      </CardHeader>

      {isEditMode ? (
        <ContactForm
          formId={formId}
          onSubmit={() => {
            setIsEditMode(false);
          }}
        />
      ) : (
        <ContactDetails />
      )}
    </Card>
  );
}
