import {getOrElse, isSome, Option} from "fp-ts/Option";
import {BehaviorSubject, filter, map, OperatorFunction} from 'rxjs';
import {Optional} from "monocle-ts/Optional";
import {Lens} from "monocle-ts/Lens";
import {LazyArg} from "fp-ts/function";
import {lens} from "monocle-ts";
import {b} from "vitest/dist/types-aac763a5";

export type Optics<S, T> = Lens<S, T> | Optional<S, T>

export function isOptional<S, T>(optics: Optics<S, T>): optics is Optional<S, T> {
    return 'getOption' in optics
}

export function focus<S, T>(lens: Lens<S, T>): OperatorFunction<S, T>
export function focus<S, T>(lens: Optional<S, T>): OperatorFunction<S, Option<T>>

export function focus<S, T>(optics: Optics<S,T> ): OperatorFunction<S, T | Option<T>> {
    return map(source =>
        isOptional(optics)
            ? optics.getOption(source)
            : optics.get(source)
    )
}

export function someOnly<T>(): OperatorFunction<Option<T>, T> {
    return filter(option => isSome(option)) as OperatorFunction<Option<T>, T>
}

export function orElse<T>(onNone: LazyArg<T>): OperatorFunction<Option<T>, T> {
    const orElse = getOrElse(onNone)
    return map(option => orElse(option))
}

export interface BoundLens<S,A> {
    readonly lens: Lens<S,A>
    readonly source$: BehaviorSubject<S>
}

export interface BoundOptional<S,T> {
    readonly optional: Optional<S,T>
    readonly source$: BehaviorSubject<S>
}

export type BoundOptics<S,T> = BoundLens<S,T> | BoundOptional<S,T>

export function isBoundOptional<S, T>(boundOptics: BoundOptics<S, T>): boundOptics is BoundOptional<S, T> {
    return 'optional' in boundOptics
}