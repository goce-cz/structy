import {BoundOptic, pipeBoundOptic} from "./bound-optic";
import {User} from "./optics";
import * as L from "monocle-ts/Lens";
import {FC, useMemo, useState} from "react";
import {useFocusedValue} from "./use-focused-value";
import {UserEditor} from "./UserEditor.tsx";
import {OnlyIfSome} from "./OnlyIfSome.tsx";

export const UsersManager: FC<{
    usersOptic: BoundOptic<L.Lens<any, readonly User[]>>;
}> = ({usersOptic}) => {
    const [selectedUserId, setSelectedUserId] = useState<number>();
    const [x, setX] = useState<number>(1);
    const users = useFocusedValue(usersOptic);
    const selectedUserOptic = useMemo(
        () =>
            pipeBoundOptic(
                usersOptic,
                L.findFirst((user) => user.id === selectedUserId)
            ),
        [usersOptic, selectedUserId]
    );
    return (
        <div>
            {/*<OnlyIfSome2 component={UserEditor} optionalOpticProp='userOptic' userOptic={selectedUserOptic} title={`X = ${x}`} fallback={<div>Please select a user</div>}/>*/}
            <OnlyIfSome optionalOptic={selectedUserOptic} fallback={<div>Please select a user</div>}>
                {(userOptic) => <UserEditor userOptic={userOptic} title={`X = ${x}`}/>}
            </OnlyIfSome>
            <div>
                <ul>
                    {users.map((user) => (
                        <li key={user.id} onClick={() => setSelectedUserId(user.id)}>
                            {user.name}
                        </li>
                    ))}
                </ul>
                <button onClick={() => setSelectedUserId(undefined) }>Unselect</button>
                <button onClick={() => setX(val => val + 1) }>X</button>
            </div>
        </div>
    );
};
