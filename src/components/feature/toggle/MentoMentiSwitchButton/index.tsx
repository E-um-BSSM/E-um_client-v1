import{ HiddenRadio, SlidingBackground, StyledLabel, SwitchContainer } from "./styles";
import { useState } from "react";

export const RadioSwitch = () => {
  const [selectedValue, setSelectedValue] = useState("Mento");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
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
        onChange={handleChange}
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
        onChange={handleChange}
      />
      <StyledLabel htmlFor="opt2" isSelected={selectedValue === "Mento"}>
        멘토
      </StyledLabel>
    </SwitchContainer>
  );
};