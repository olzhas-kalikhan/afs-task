import clsx from "clsx";
import styles from "./select.module.scss";
import * as Popover from "@radix-ui/react-popover";
import SvgIcon from "../svg-icon";
import { useState } from "react";
import type { Option } from "./type";

export default function SingleSelect<TOption extends Option>({
  options,
  value: selected,
  onValueChange: setSelected,
  getLabel,
}: {
  options: TOption[] | readonly TOption[];
  value: TOption;
  onValueChange: (option: TOption | null) => void;
  getLabel: (option: TOption) => string;
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const selectHandler = (option: TOption) => () => {
    setSelected(option === selected ? null : option);
    setPopoverOpen(false);
  };

  return (
    <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
      <Popover.Trigger className={clsx(styles["select__control"])}>
        {getLabel(selected) || <span>Select...</span>}
        <SvgIcon iconName="Chevron" className={clsx(styles["select__arrow"])} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={5} className={styles["select__menu"]}>
          <ul className={styles["select__menu-list"]}>
            {options.map((option) => (
              <li
                key={option}
                value={option}
                className={clsx(
                  styles["select__menu-option"],
                  option === selected && styles["select__menu-option--selected"]
                )}
                onClick={selectHandler(option)}
              >
                {getLabel(option)}
              </li>
            ))}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
