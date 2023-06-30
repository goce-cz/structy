import { ErrorObject } from 'ajv'
import { ReactNode } from 'react'
import { isTruthy } from '@spicy-hooks/utils'

export type CustomMessageHandler = (error: ErrorObject[]) => ReactNode[]

export type CustomErrorMessage =
  | { handled: false }
  | { handled: true; message?: ReactNode }

export interface GeneralCustomErrorMessagePattern {
  instancePath?: RegExp
  schemaPath?: RegExp
  propertyName?: RegExp
  process: (error: ErrorObject) => CustomErrorMessage
}

interface ComparisonParams<T> {
  comparison: string
  limit: T
}

interface ErrorParamsByKeyword {
  maximum: ComparisonParams<number>
  minimum: ComparisonParams<number>
}

export interface SpecificCustomErrorMessagePattern<
  K extends keyof ErrorParamsByKeyword
> extends Omit<GeneralCustomErrorMessagePattern, 'process'> {
  keyword: K
  process: (
    error: ErrorObject<K, ErrorParamsByKeyword[K]>
  ) => CustomErrorMessage
}

export const keywordPattern = <K extends keyof ErrorParamsByKeyword>(
  pattern: SpecificCustomErrorMessagePattern<K>
) => pattern

export type CustomErrorMessagePattern =
  | GeneralCustomErrorMessagePattern
  | SpecificCustomErrorMessagePattern<any>

export const isSpecificCustomErrorMessagePattern = (
  pattern: CustomErrorMessagePattern
): pattern is SpecificCustomErrorMessagePattern<any> => 'keyword' in pattern

const patternMatches = (
  pattern: CustomErrorMessagePattern,
  error: ErrorObject
): boolean => {
  if (
    isSpecificCustomErrorMessagePattern(pattern) &&
    pattern.keyword !== error.keyword
  )
    return false
  if (pattern.instancePath && !pattern.instancePath.test(error.instancePath))
    return false
  if (pattern.schemaPath && !pattern.schemaPath.test(error.schemaPath))
    return false
  if (
    pattern.propertyName &&
    (!error.propertyName || !pattern.propertyName.test(error.propertyName))
  )
    return false
  return true
}

export const customErrorMessagePatternHandler =
  (patterns: CustomErrorMessagePattern[]): CustomMessageHandler =>
  (errors) => {
    return errors
      .map((error) => {
        for (const pattern of patterns) {
          if (patternMatches(pattern, error)) {
            const customMessage = pattern.process(error)
            if (customMessage.handled) {
              return customMessage.message
            }
          }
        }
        return error.message
      })
      .filter(isTruthy)
  }
