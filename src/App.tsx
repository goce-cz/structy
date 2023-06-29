import { BehaviorSubject } from 'rxjs'
import * as L from 'monocle-ts/Lens'
import { Data, usersL } from './model.ts'

import './styles.css'
import { bindOptic } from './rxjs/bind-optic.ts'
import { UsersManager } from './components/app-specific/UsersManager.tsx'
import { pipeBoundOptic } from './rxjs/pipe-bound-optic.ts'
import { data } from './data.ts'

const data$ = new BehaviorSubject<Data>(data)

const dataOptic = bindOptic(L.id<Data>(), data$)
// const currentUserOptic = pipeBoundOptic(dataOptic, L.compose(currentUserL))
const usersOptic = pipeBoundOptic(dataOptic, L.compose(usersL))

export default function App() {
  return (
    <div className="App">
      <UsersManager usersLens={usersOptic} />
      {/*<UserEditor userOptic={currentUserOptic} title='Current user'/>*/}
    </div>
  )
}
