import clsx from "clsx";
import styles from "./select.module.scss";
import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import SvgIcon from "../svg-icon";
import { useState } from "react";
import type { Option } from "./type";

export default function MultiSelect<TOption extends Option>({
  value: selected,
  onValueChange: setSelected,
  options,
  getLabel,
}: {
  value: TOption[];
  onValueChange: (options: TOption[]) => void;
  options: TOption[];
  getLabel: (option: TOption) => string;
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const getSelected = (options: TOption[], option: TOption) => {
    return options.find((o) => o === option);
  };

  const selectHandler = (option: TOption) => () => {
    const exists = getSelected(selected, option);
    if (exists) {
      setSelected(selected.filter((o) => o != option));
    } else {
      return setSelected([...selected, option]);
    }

    setPopoverOpen(false);
  };

  return (
    <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
      <Popover.Trigger className={clsx(styles["select__control"])}>
        {selected.map((o) => getLabel(o)).join(", ") || "Select..."}
        <SvgIcon iconName="Chevron" className={clsx(styles["select__arrow"])} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={5} className={styles["select__menu"]}>
          <ul className={styles["select__menu-list"]}>
            {options.map((option) => {
              const selectedOption = getSelected(selected, option);
              return (
                <li
                  key={option}
                  value={option}
                  className={clsx(
                    styles["select__menu-option"],
                    selectedOption && styles["select__menu-option--selected"]
                  )}
                  onClick={selectHandler(option)}
                >
                  <div className={clsx(styles["select__checkbox-container"])}>
                    <Checkbox.Root
                      checked={!!selectedOption}
                      className={clsx(styles["select__checkbox"])}
                    >
                      <Checkbox.Indicator
                        className={styles["select__checkbox-icon-container"]}
                      >
                        <SvgIcon
                          iconName="Check"
                          className={clsx(styles["select__checkbox-icon"])}
                        />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  </div>
                  <span>{getLabel(option)}</span>
                </li>
              );
            })}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
