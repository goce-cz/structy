import { BoundOptic } from '../../rxjs/bind-optic.ts'
import { User } from '../../model.ts'
import * as L from 'monocle-ts/Lens'
import { FC, useMemo, useState } from 'react'
import { useFocusedValue } from '../../focuses/use-focused-value.ts'
import { UserEditor } from './UserEditor.tsx'
import { Fold } from '../../guards/Fold.tsx'
import { pipeBoundOptic } from '../../rxjs/pipe-bound-optic.ts'

export const UsersManager: FC<{
  usersLens: BoundOptic<L.Lens<any, readonly User[]>>
}> = ({ usersLens }) => {
  const users = useFocusedValue(usersLens)

  const [selectedUserId, setSelectedUserId] = useState<number>()

  const selectedUserOptional = useMemo(
    () =>
      pipeBoundOptic(
        usersLens,
        L.findFirst((user) => user.id === selectedUserId)
      ),
    [usersLens, selectedUserId]
  )

  return (
    <div>
      <Fold
        optionalOptic={selectedUserOptional}
        fallback={<div>Please select a user</div>}
      >
        {(selectedUserLens) => (
          <UserEditor userLens={selectedUserLens} title="Edit user" />
        )}
      </Fold>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => setSelectedUserId(user.id)}>
              {user.name}
            </li>
          ))}
        </ul>
        <button onClick={() => setSelectedUserId(undefined)}>Unselect</button>
      </div>
    </div>
  )
}
