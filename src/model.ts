import * as L from 'monocle-ts/Lens'
import { pipe } from 'fp-ts/function'

export const ALL_PERMISSIONS = ['emails', 'contracts', 'accounting'] as const

export type Permission = (typeof ALL_PERMISSIONS)[number]

export interface Address {
  street: string
  city: string
}

export interface User {
  id: number
  name: string
  address: Address
  age: number
  permissions: readonly Permission[]
}

export interface Data {
  currentUser: User
  users: readonly User[]
}

export const currentUserL = pipe(L.id<Data>(), L.prop('currentUser'))
export const usersL = pipe(L.id<Data>(), L.prop('users'))

export const nameL = pipe(L.id<User>(), L.prop('name'))

export const ageL = pipe(L.id<User>(), L.prop('age'))

export const currentUserNameL = pipe(currentUserL, L.compose(nameL))

export const currentUserAgeL = pipe(currentUserL, L.compose(ageL))
