import {BehaviorSubject} from "rxjs";
import {Data, currentUserL, usersL} from "./optics";

import "./styles.css";
import {useMemo} from "react";
import {bindOptic} from "./bound-optic";
import {UsersManager} from "./UsersManager.tsx";

const data$ = new BehaviorSubject<Data>({
    currentUser: {
        id: 1,
        name: "Homer Simpson",
        address: {
            street: "Evergreen Terrace",
            city: "Springfield"
        },
        age: 37
    },
    users: [
        {
            id: 1,
            name: "Homer Simpson",
            address: {
                street: "Evergreen Terrace",
                city: "Springfield"
            },
            age: 37
        },
        {
            id: 2,
            name: "Marge Simpson",
            address: {
                street: "Evergreen Terrace",
                city: "Springfield"
            },
            age: 35
        }
        ]
});

export default function App() {
    const currentUserOptic = useMemo(() => bindOptic(currentUserL, data$), []);
    const usersOptic = useMemo(() => bindOptic(usersL, data$), []);

    return (
        <div className="App">
            <UsersManager usersOptic={usersOptic}/>
            {/*<UserEditor userOptic={currentUserOptic} title='Current user'/>*/}
        </div>
    );
}
