import {BehaviorSubject} from "rxjs";
import * as O from "monocle-ts/Optional";
import {BoundLens, BoundOptics, BoundOptional, isBoundOptional, isOptional, Optics} from "./rxjs";
import * as L from "monocle-ts/Lens";
import {pipe} from "fp-ts/function";

export const bindLens = <S, A>(source$: BehaviorSubject<S>) => (sa: L.Lens<S, A>): BoundLens<S, A> => ({
    lens: sa,
    source$: source$ as BehaviorSubject<S>
})

export const bindOptional = <S, A>(source$: BehaviorSubject<S>) => (sa: O.Optional<S, A>): BoundOptional<S, A> => ({
    optional: sa,
    source$: source$ as BehaviorSubject<S>
})

export function focusBoundOptics<S, A, T>(boundOptics: BoundOptional<S, A>, optics: Optics<A, T>): BoundOptional<S, T>
export function focusBoundOptics<S, A, T>(boundOptics: BoundLens<S, A>, optics: L.Lens<A, T>): BoundLens<S, T>
export function focusBoundOptics<S, A, T>(boundOptics: BoundOptics<S, A>, optics: Optics<A, T>): BoundOptics<S, T> {
    if (isBoundOptional(boundOptics)) {
        const composedOptics = pipe(boundOptics.optional, isOptional(optics) ? O.compose(optics) : O.composeLens(optics));
        return bindOptional<S, T>(boundOptics.source$)(composedOptics)
    } else if (isOptional(optics)) {
        const composedOptics = pipe(boundOptics.lens, L.composeOptional(optics))
        return bindOptional<S, T>(boundOptics.source$)(composedOptics)
    } else {
        const composedOptics = pipe(boundOptics.lens, L.compose(optics))
        return bindLens<S, T>(boundOptics.source$)(composedOptics)
    }
}