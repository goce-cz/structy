import { Lens } from "monocle-ts/Lens";
import { FC } from "react";
import { useFocusedSetter } from "./use-focused-setter";
import { useFocusedValue } from "./use-focused-value";
import { BoundOptic } from "./bound-optic";

export interface SliderProps {
  valueOptic: BoundOptic<Lens<any, number>>;
}

export const Slider: FC<SliderProps> = ({ valueOptic }) => {
  const value = useFocusedValue(valueOptic);
  const setValue = useFocusedSetter(valueOptic);

  return (
    <input
      type="range"
      min={0}
      max={100}
      value={value}
      onChange={(event) => setValue(Number(event.target.value))}
    />
  );
};
