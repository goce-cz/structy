import { BehaviorSubject } from 'rxjs'
import { Optic, SourceOf } from '../monocle/optic.ts'

export interface BoundOptic<O extends Optic<any, any>> {
  store: BehaviorSubject<SourceOf<O>>
  optic: O
}

export const bindOptic = <O extends Optic<any, any>>(
  optic: O,
  store: BehaviorSubject<SourceOf<O>>
): BoundOptic<O> => ({
  store,
  optic,
})
