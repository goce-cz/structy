import {Query} from './query'
import {Dispatch, SetStateAction, useCallback, useMemo, useState} from 'react'
import {useSubscription} from '@spicy-hooks/observables'
import {useDependantState, useUpdatedRef} from '@spicy-hooks/core'
import {isFunction} from '@spicy-hooks/utils'
import {BehaviorSubject} from 'rxjs'
import {Optional} from "monocle-ts/Optional";
import {Lens} from "monocle-ts/Lens";
import {BoundLens, BoundOptics, BoundOptional, isBoundOptional, isOptional} from "./rxjs";
import {getOrElse, isNone, Option} from "fp-ts/Option";
import {LazyArg} from "fp-ts/function";

export function useQueryState<P, C>(query: Query<P, C>, parent$: BehaviorSubject<P>): [value: C, setValue: Dispatch<SetStateAction<C>>] {
    const [snapshot, setSnapshot] = useDependantState(() => query.resolve(parent$.getValue()), [query, parent$])
    const snapshotRef = useUpdatedRef(snapshot)

    useSubscription(parent$, {
        next: snapshot => setSnapshot(query.resolve(snapshot))
    }, [query])

    const setValue = useCallback<Dispatch<SetStateAction<C>>>(valueOrSetter => {
        const value = isFunction(valueOrSetter) ? valueOrSetter(snapshotRef.current) : valueOrSetter
        parent$.next(query.update(parent$.getValue(), value))
    }, [])

    return [snapshot, setValue]
}


type UseStateTuple<S> = [S, Dispatch<SetStateAction<S>>]


export function useFocusedState<S, T>(lens: Lens<S, T>, useStateTuple: UseStateTuple<S>): UseStateTuple<T> {
    const state = useMemo(
        () => lens.get(useStateTuple[0]),
        [lens, useStateTuple[0]]
    )
    const setState = useCallback<Dispatch<SetStateAction<T>>>(valueOrSetter => {
        useStateTuple[1](originalSource => {
            const modifiedTarget = isFunction(valueOrSetter) ? valueOrSetter(lens.get(originalSource)) : valueOrSetter
            const modifiedSource = lens.set(modifiedTarget) as S
            return modifiedSource
        })
    }, [useStateTuple[1]])
    return [state, setState]
}

export function useFocusedSetter<S, T>(boundOptics: BoundOptics<S, T>): Dispatch<SetStateAction<T>> {
    return useCallback<Dispatch<SetStateAction<T>>>(valueOrSetter => {
        const originalSource = boundOptics.source$.getValue()
        const optics = isBoundOptional(boundOptics) ? boundOptics.optional : boundOptics.lens
        if (isFunction(valueOrSetter)) {
            let originalTarget
            if (isOptional(optics)) {
                const option = optics.getOption(originalSource)
                if (isNone(option)) {
                    return originalSource
                }
                originalTarget = option.value
            } else {
                originalTarget = optics.get(originalSource)
            }
            const modifiedTarget = valueOrSetter(originalTarget)
            const modifiedSource = optics.set(modifiedTarget)(originalSource)
            return modifiedSource
        } else {
            return optics.set(valueOrSetter)(originalSource)
        }
    }, [boundOptics])
}

function getOrElseOfPossiblyOptional<S, T>(lens: Lens<S, T> | Optional<S, T>, onNone?: LazyArg<T>): (source: S) => T {
    if (isOptional(lens)) {
        if (!onNone) {
            throw new Error('Missing onNone callback')
        }
        const orElse = getOrElse(onNone)
        return source => orElse(lens.getOption(source))
    } else {
        return source => lens.get(source)
    }
}

export function useFocusedValue<S, T>(boundLens: BoundLens<S, T>): T {
    const [state, setState] = useState(boundLens.lens.get(boundLens.source$.getValue()))
    useSubscription(boundLens.source$, {
        next: source => setState(boundLens.lens.get(source))
    }, [boundLens])
    return state
}

export function useFocusedOption<S, T>(boundOptional: BoundOptional<S, T>): Option<T> {
    const [state, setState] = useState(boundOptional.optional.getOption(boundOptional.source$.getValue()))
    useSubscription(boundOptional.source$, {
        next: source => setState(boundOptional.optional.getOption(source))
    }, [boundOptional])
    return state
}
