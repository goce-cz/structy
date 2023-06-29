import { BoundOptic } from '../../rxjs/bind-optic.ts'
import { User } from '../../model.ts'
import * as L from 'monocle-ts/Lens'
import { FC, useMemo, useState } from 'react'
import { useFocusedValue } from '../../focuses/use-focused-value.ts'
import { UserEditor } from './UserEditor.tsx'
import { Fold } from '../../guards/Fold.tsx'
import { pipeBoundOptic } from '../../rxjs/pipe-bound-optic.ts'
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

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
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemButton onClick={() => setSelectedUserId(user.id)}>
                <ListItemText primary={user.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button variant="outlined" onClick={() => setSelectedUserId(undefined)}>
          Unselect
        </Button>
      </div>
    </div>
  )
}
