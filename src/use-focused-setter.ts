import { BoundOptic, Optic, isOptional } from "./bound-optic";
import { isFunction } from "./is-function";
import { Dispatch, SetStateAction, useCallback } from "react";
import { isNone } from "fp-ts/Option";

export const useFocusedSetter = <S, T>(
  boundOptic: BoundOptic<Optic<S, T>>
): Dispatch<SetStateAction<T>> => {
  return useCallback<Dispatch<SetStateAction<T>>>(
    (setStateAction) => {
      const { optic, store } = boundOptic;
      const originalSource = store.getValue();
      let modifiedTarget: T;
      if (isFunction(setStateAction)) {
        const originalSource = store.getValue();
        let originalTarget: T;
        if (isOptional(optic)) {
          const option = optic.getOption(originalSource);
          if (isNone(option)) {
            throw new Error("not initialized"); // TODO Handle differently?
          }
          originalTarget = option.value;
        } else {
          originalTarget = optic.get(originalSource);
        }
        modifiedTarget = setStateAction(originalTarget);
      } else {
        modifiedTarget = setStateAction;
      }
      const modifiedSource = optic.set(modifiedTarget)(originalSource);
      store.next(modifiedSource);
    },
    [boundOptic]
  );
};
