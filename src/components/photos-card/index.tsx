import styles from "./photos-card.module.scss";
import Button from "../ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "../ui/card";
import {
  companyStore,
  type CompanyDetails as PhotosList,
} from "@/store/company-store";
import { observer } from "mobx-react-lite";
import { IconButton } from "../ui/icon-button";
import { useCompanyPhotoDelete } from "@/hooks/use-company-photo-delete";
import { useCompanyPhotoPost } from "@/hooks/use-company-photo-post";
import { useRef } from "react";

export default function PhotosCard() {
  //TODO: separate file input component
  const fileInputRef = useRef<HTMLInputElement>(null);
  const companyPhotoPost = useCompanyPhotoPost("12");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    companyPhotoPost.mutate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photos</CardTitle>

        <Button
          variant="flat"
          iconName="AddPhoto"
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          Add
        </Button>
        <input
          ref={fileInputRef}
          hidden
          type="file"
          onChange={handleChange}
          accept="image/*"
        />
      </CardHeader>

      <PhotosList />
    </Card>
  );
}

const PhotosList = observer(() => {
  const data = companyStore.companyPhotos;

  const companyPhotoDelete = useCompanyPhotoDelete("12");

  if (!data) return null;
  return (
    <CardBody className={styles["photos-card__photos-list"]}>
      {data.map(({ name, thumbpath }) => (
        <div key={name} className={styles["photos-card__photo-container"]}>
          <img src={thumbpath} className={styles["photos-card__photo"]} />
          <IconButton
            iconName="Trash"
            variant="filled"
            className={styles["photos-card__photo-icon"]}
            onClick={() => companyPhotoDelete.mutate(name)}
          />
        </div>
      ))}
    </CardBody>
  );
});
