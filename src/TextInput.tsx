import { BoundOptic } from "./bound-optic";
import * as L from "monocle-ts/Lens";
import { useFocusedSetter } from "./use-focused-setter";
import { useFocusedValue } from "./use-focused-value";
import { FC } from "react";

export const TextInput: FC<{
  valueOptic: BoundOptic<L.Lens<any, string>>;
}> = ({ valueOptic }) => {
  const value = useFocusedValue(valueOptic);
  const setValue = useFocusedSetter(valueOptic);

  return (
    <input
      type="text"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};
