import Ajv, { JSONSchemaType } from 'ajv'
import { ALL_PERMISSIONS, Data, User } from './model.ts'

const ajv = new Ajv()

const userSchema: JSONSchemaType<User> = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string', minLength: 1 },
    age: { type: 'number', maximum: 90 },
    address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
      },
      required: ['street', 'city'],
    },
    permissions: {
      type: 'array',
      items: {
        type: 'string',
        enum: ALL_PERMISSIONS,
      },
      minItems: 1,
    },
  },
  required: ['id', 'name', 'age', 'address', 'permissions'],
}

const dataSchema: JSONSchemaType<Data> = {
  type: 'object',
  properties: {
    currentUser: userSchema,
    users: {
      type: 'array',
      items: userSchema,
    },
  },
  required: ['currentUser', 'users'],
}

export const validateDataSchema = ajv.compile(dataSchema)
