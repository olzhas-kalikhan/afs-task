import Button from "../ui/button";
import { IconButton } from "../ui/icon-button";
import {
  DialogActions,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { useCompanyDelete } from "@/hooks/use-company-delete";

const OrganizationDeleteForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const companyPatch = useCompanyDelete("12");

  return (
    <DialogContent>
      <DialogTitle>Remove the Organization?</DialogTitle>
      Are you sure you want to remove this Organozation?
      <DialogActions>
        <DialogClose>No</DialogClose>
        <Button
          type="submit"
          onClick={async () => {
            await companyPatch.mutateAsync();
            onSubmit();
          }}
        >
          Yes, remove
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

export default function OrganizationDeleteDialog({
  className,
}: {
  className: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <DialogContainer open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <IconButton iconName="Trash" size="lg" className={className} />
      </DialogTrigger>
      <DialogPortal>
        <OrganizationDeleteForm onSubmit={() => setOpen(false)} />
      </DialogPortal>
    </DialogContainer>
  );
}
