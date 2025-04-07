import "react-day-picker/style.css";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

import clsx from "clsx";
import styles from "./date-picker.module.scss";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { format } from "date-fns";

export default function DatePicker({
  value,
  onValueChange,
}: {
  value: Date | undefined;
  onValueChange: (date: Date | undefined) => void;
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    onValueChange(date);
    setPopoverOpen(false);
  };

  return (
    <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
      <Popover.Trigger className={clsx(styles["date-picker__trigger"])}>
        {value ? format(value, "dd.MM.yyyy") : "Select Date..."}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={5}>
          <DayPicker
            mode="single"
            selected={value}
            onSelect={handleSelect}
            classNames={{
              root: clsx(getDefaultClassNames().root, styles["date-picker"]),
            }}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
