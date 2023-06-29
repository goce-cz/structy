import { BoundOptic } from '../../rxjs/bind-optic.ts'
import { User, ageL, nameL, ALL_PERMISSIONS } from '../../model.ts'
import * as L from 'monocle-ts/Lens'
import { memo, useMemo } from 'react'
import { FocusedSlider } from '../primitives/FocusedSlider.tsx'
import { useFocusedValue } from '../../focuses/use-focused-value.ts'
import { FocusedTextField } from '../primitives/FocusedTextField.tsx'
import { TagToggle } from '../primitives/TagToggle.tsx'
import { focusLens } from '../../rxjs/focus-operator.ts'
import { useSnapshot } from '@spicy-hooks/observables'
import { debounceTime, distinctUntilChanged } from 'rxjs'
import { pipeBoundOptic } from '../../rxjs/pipe-bound-optic.ts'

export const UserEditor = memo<{
  userLens: BoundOptic<L.Lens<any, User>>
  title: string
}>(({ userLens, title }) => {
  const { age, name } = useFocusedValue(userLens)
  const [ageLens, nameLens, permissionsLens] = useMemo(
    () => [
      pipeBoundOptic(userLens, L.compose(ageL)),
      pipeBoundOptic(userLens, L.compose(nameL)),
      pipeBoundOptic(userLens, L.prop('permissions')),
    ],
    [userLens]
  )

  const debouncedUser$ = useMemo(
    () =>
      userLens.store.pipe(
        focusLens(userLens.optic),
        distinctUntilChanged(),
        debounceTime(1000)
      ),
    [userLens]
  )

  const [debouncedUser] = useSnapshot(debouncedUser$)

  return (
    <div>
      <h1>{title}</h1>
      <p>editing user {name}</p>
      <div>
        <FocusedSlider valueLens={ageLens} />
      </div>
      <div>
        <FocusedTextField valueLens={nameLens} />
      </div>
      <div>
        <h2>Permissions</h2>
        {ALL_PERMISSIONS.map((permission) => (
          <TagToggle
            tag={permission}
            listLens={permissionsLens}
            key={permission}
          >
            {permission}
          </TagToggle>
        ))}
      </div>

      <p>Lived {age} long years</p>
      <pre>{JSON.stringify(debouncedUser, null, 2)}</pre>
    </div>
  )
})
