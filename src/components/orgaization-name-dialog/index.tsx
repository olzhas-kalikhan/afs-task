import Button from "../ui/button";
import { IconButton } from "../ui/icon-button";
import Input from "../ui/input";
import {
  DialogActions,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { useCompanyPatch } from "@/hooks/use-company-patch";
import { observer } from "mobx-react-lite";
import { companyStore } from "@/store/company-store";
import { useState } from "react";

const formDefaultValues = {
  name: "",
};

const OrganizationNameForm = observer(
  ({ onSubmit }: { onSubmit: () => void }) => {
    const companyPatch = useCompanyPatch("12");
    const companyName = companyStore.companyName;
    const form = useForm({ defaultValues: companyName ?? formDefaultValues });

    return (
      <DialogContent asChild>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            await companyPatch.mutateAsync(values);
            onSubmit();
          })}
        >
          <DialogTitle>Specify the Organization's name</DialogTitle>
          <Input {...form.register("name")} />

          <DialogActions>
            <DialogClose>Cancel</DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogActions>
        </form>
      </DialogContent>
    );
  }
);

export default function OrganizationNameDialog() {
  const [open, setOpen] = useState(false);
  return (
    <DialogContainer open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <IconButton iconName="Edit" size="lg" />
      </DialogTrigger>
      <DialogPortal>
        <OrganizationNameForm onSubmit={() => setOpen(false)} />
      </DialogPortal>
    </DialogContainer>
  );
}
