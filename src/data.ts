import { Data } from './model.ts'

export const data: Data = {
  currentUser: {
    id: 1,
    name: 'Homer Simpson',
    address: {
      street: 'Evergreen Terrace',
      city: 'Springfield',
    },
    age: 37,
    permissions: ['emails', 'accounting'],
  },
  users: [
    {
      id: 1,
      name: 'Homer Simpson',
      address: {
        street: 'Evergreen Terrace',
        city: 'Springfield',
      },
      age: 37,
      permissions: ['emails', 'accounting'],
    },
    {
      id: 2,
      name: 'Marge Simpson',
      address: {
        street: 'Evergreen Terrace',
        city: 'Springfield',
      },
      age: 35,
      permissions: ['emails', 'accounting', 'contracts'],
    },
  ],
}
