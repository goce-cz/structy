import {Optional} from 'monocle-ts/Optional'
import {BoundOptic} from './bound-optic'
import {useSubscription} from './mocks/use-subscription'
import {isSome} from "fp-ts/Option";
import {useDependantState} from "@spicy-hooks/core";

export const useIsSome = <S, T>({optic, store}: BoundOptic<Optional<S, T>>): boolean => {
    const [snapshot, setSnapshot] = useDependantState<boolean>(() => isSome(optic.getOption(store.getValue())),[optic, store])

    useSubscription(store, {
        next: value => setSnapshot(isSome(optic.getOption(value)))
    }, [optic])

    return snapshot
}
