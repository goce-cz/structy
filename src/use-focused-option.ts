import {Optional} from 'monocle-ts/Optional'
import {BoundOptic} from './bound-optic'
import {useSubscription} from './mocks/use-subscription'
import {Option} from "fp-ts/Option";
import {useDependantState} from "@spicy-hooks/core";

export const useFocusedOption = <S, T>({optic, store}: BoundOptic<Optional<S, T>>): Option<T> => {
    const [snapshot, setSnapshot] = useDependantState<Option<T>>(() => optic.getOption(store.getValue()), [optic, store])

    useSubscription(store, {
        next: value => setSnapshot(optic.getOption(value))
    }, [optic])

    return snapshot
}
