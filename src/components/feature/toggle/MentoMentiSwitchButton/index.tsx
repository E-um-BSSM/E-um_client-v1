import { HiddenRadio, SlidingBackground, StyledLabel, SwitchContainer } from "./styles";
import { useState } from "react";

type SwitchValue = "Mento" | "Menti";

interface RadioSwitchProps {
  value?: SwitchValue;
  onChange?: (value: SwitchValue) => void;
}

export const RadioSwitch = ({ value, onChange }: RadioSwitchProps) => {
  const [innerValue, setInnerValue] = useState<SwitchValue>("Mento");
  const selectedValue = value ?? innerValue;

  const handleChange = (nextValue: SwitchValue) => {
    if (value === undefined) {
      setInnerValue(nextValue);
    }
    onChange?.(nextValue);
  };

  return (
    <SwitchContainer>
      <SlidingBackground activeIndex={selectedValue === "Menti" ? 0 : 1} />

      <HiddenRadio
        type="radio"
        id="opt1"
        name="toggle"
        value="Menti"
        checked={selectedValue === "Menti"}
        onChange={() => handleChange("Menti")}
      />
      <StyledLabel htmlFor="opt1" isSelected={selectedValue === "Menti"}>
        멘티
      </StyledLabel>

      <HiddenRadio
        type="radio"
        id="opt2"
        name="toggle"
        value="Mento"
        checked={selectedValue === "Mento"}
        onChange={() => handleChange("Mento")}
      />
      <StyledLabel htmlFor="opt2" isSelected={selectedValue === "Mento"}>
        멘토
      </StyledLabel>
    </SwitchContainer>
  );
};
