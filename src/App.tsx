import { BehaviorSubject } from 'rxjs'
import * as L from 'monocle-ts/Lens'
import { Data, usersL } from './model.ts'

import './styles.css'
import { bindOptic } from './rxjs/bind-optic.ts'
import { UsersManager } from './components/app-specific/UsersManager.tsx'
import { pipeBoundOptic } from './rxjs/pipe-bound-optic.ts'
import { data } from './data.ts'
import { pipe } from 'fp-ts/function'
import { validatorLens } from './validators/validator-lens.ts'
import { ajvValidator } from './validators/ajv-validator.ts'
import { validateDataSchema } from './schema.ts'
import { ErrorToast } from './components/app-specific/ErrorToast.tsx'
import { useAutoHideErrors } from './use-auto-hide-errors.ts'

const data$ = new BehaviorSubject<Data>(data)

const dataOptic = bindOptic(
  pipe(L.id<Data>(), validatorLens(ajvValidator(validateDataSchema))),
  data$
)
// const currentUserOptic = pipeBoundOptic(dataOptic, L.compose(currentUserL))
const usersOptic = pipeBoundOptic(dataOptic, L.compose(usersL))

export default function App() {
  useAutoHideErrors(3000)
  return (
    <div className="App">
      <UsersManager usersLens={usersOptic} />
      {/*<UserEditor userOptic={currentUserOptic} title='Current user'/>*/}
      <ErrorToast />
    </div>
  )
}
