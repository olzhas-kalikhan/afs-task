import { useId, useState } from "react";
import Button from "../ui/button";
import { Card, CardFieldsGroup, CardHeader, CardTitle } from "../ui/card";
import { CompanyForm } from "./form";
import { CompanyDetails } from "./details";

export default function CompanyCard() {
  const [isEditMode, setIsEditMode] = useState(false);
  const formId = useId();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Details</CardTitle>
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
        <CompanyForm
          formId={formId}
          onSubmit={() => {
            setIsEditMode(false);
          }}
        />
      ) : (
        <CompanyDetails />
      )}
    </Card>
  );
}
