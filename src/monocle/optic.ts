import * as L from 'monocle-ts/Lens'
import * as O from 'monocle-ts/Optional'

export type Optic<S, T> = L.Lens<S, T> | O.Optional<S, T>

export const isOptional = <S, T>(
  optic: Optic<S, T>
): optic is O.Optional<S, T> => 'getOptional' in optic

export const isLens = <S, T>(optic: Optic<S, T>): optic is L.Lens<S, T> =>
  'get' in optic

export type SourceOf<O extends Optic<any, any>> = O extends Optic<infer S, any>
  ? S
  : never

export type TargetOf<O extends Optic<any, any>> = O extends Optic<any, infer T>
  ? T
  : never
