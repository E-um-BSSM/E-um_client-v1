import{ HiddenRadio, SlidingBackground, StyledLabel, SwitchContainer } from "./styles";
import { useState } from "react";

export const RadioSwitch = () => {
  const [selectedValue, setSelectedValue] = useState("A");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };

  return (
    <SwitchContainer>
      <SlidingBackground activeIndex={selectedValue === "A" ? 0 : 1} />

      <HiddenRadio
        type="radio"
        id="opt1"
        name="toggle"
        value="A"
        checked={selectedValue === "A"}
        onChange={handleChange}
      />
      <StyledLabel htmlFor="opt1" isSelected={selectedValue === "A"}>
        멘티
      </StyledLabel>

      <HiddenRadio
        type="radio"
        id="opt2"
        name="toggle"
        value="B"
        checked={selectedValue === "B"}
        onChange={handleChange}
      />
      <StyledLabel htmlFor="opt2" isSelected={selectedValue === "B"}>
        멘토
      </StyledLabel>
    </SwitchContainer>
  );
};