import {ReactNode, useMemo, ComponentType} from "react";
import {BoundOptic, pipeBoundOptic} from "./bound-optic.ts";
import * as O from "monocle-ts/Optional";
import * as L from "monocle-ts/Lens";
import {isNone} from "fp-ts/lib/Option";
import {useIsSome} from "./use-is-some.ts";

interface OnlyIfSomeProps<S, T> {
    optionalOptic: BoundOptic<O.Optional<S, T>>
    children: (lens: BoundOptic<L.Lens<S, T>>) => ReactNode
    fallback?: ReactNode
}

const optionalToLens = <S, T>() => (sa: O.Optional<S, T>) => L.lens<S, T>(
    (s: S) => {
        const option = sa.getOption(s)
        if (isNone(option)) {
            throw new Error(`to convert an optional to a lens, the optional must be defined at the focus`)
        }
        return option.value
    },
    (t: T) => (s: S) => sa.set(t)(s)
)

export const OnlyIfSome = <S, T>({optionalOptic, children, fallback}: OnlyIfSomeProps<S, T>) => {
    const some = useIsSome(optionalOptic);
    const lens = useMemo(() => pipeBoundOptic(optionalOptic, optionalToLens()), [optionalOptic])

    if(some) {
        return children(lens)
    } else {
        return fallback ?? null
    }
}

type PropsWithOptional<P extends Record<string, any>, N extends keyof P> = {
    [K in keyof P]:
    N extends K ? (
        P[K] extends BoundOptic<L.Lens<infer S, infer T>> ?
            BoundOptic<O.Optional<S, T>>
            : never
    ) : P[K]
} & {component: ComponentType<P>, optionalOpticProp: N, fallback?: ReactNode}


export const OnlyIfSome2 = <P extends Record<string, any>, N extends keyof P>({component: Component, optionalOpticProp, fallback, ...props}: PropsWithOptional<P,N>) => {
    const {
        [optionalOpticProp]: optional,
        ...rest
    } = props
    const some = useIsSome(optional);
    const lens = useMemo(() => pipeBoundOptic(optional, optionalToLens()), [optional])

    if(!some) {
        return fallback ?? null
    }
    // @ts-ignore
    return <Component {...rest} {...{[optionalOpticProp]: lens}}/>
}