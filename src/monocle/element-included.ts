import { LazyArg } from 'fp-ts/function'
import * as L from 'monocle-ts/Lens'
import { isFunction } from '@spicy-hooks/utils'

export type CompareFn<E> = (a: E, b: E) => number

const insertAtProperPosition = <E>(
  originalList: readonly E[],
  element: E,
  compare: CompareFn<E>
) => {
  let newIndex = 0
  let found = false
  for (let i = 0; i < originalList.length; i++) {
    const e = originalList[i]
    if (compare(e, element) === 0) {
      found = true
      break
    } else if (compare(e, element) <= 0) {
      newIndex = i
    }
  }
  if (found) {
    return originalList
  } else {
    return [
      ...originalList.slice(0, newIndex),
      element,
      ...originalList.slice(newIndex),
    ]
  }
}

const includesEqual = <E>(
  list: readonly E[],
  element: E,
  compare: CompareFn<E>
) => {
  return list.findIndex((e) => compare(e, element) === 0) > -1
}

const removeEqual = <E>(
  originalList: readonly E[],
  element: E,
  compare: CompareFn<E>
) => {
  const newList = originalList.filter((e) => compare(e, element) !== 0)
  return newList.length === originalList.length ? originalList : newList
}

const acquire = <T>(arg: LazyArg<T> | T) => {
  return isFunction(arg) ? arg() : arg
}

export const naturalCompare = <T>(a: T, b: T) => (a === b ? 0 : a > b ? 1 : -1)

export const elementIncluded = <E>(
  element: LazyArg<E> | E,
  compare: CompareFn<E> = naturalCompare
) =>
  L.compose(
    L.lens<readonly E[], boolean>(
      (list) => includesEqual(list, acquire(element), compare),
      (shouldBeIncluded) => (originalList) => {
        const acquiredElement = acquire(element)
        if (shouldBeIncluded) {
          return insertAtProperPosition(originalList, acquiredElement, compare)
        } else {
          return removeEqual(originalList, acquiredElement, compare)
        }
      }
    )
  )
