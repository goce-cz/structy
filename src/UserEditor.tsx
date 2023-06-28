import {BoundOptic, composeBoundOptic} from "./bound-optic";
import {User, ageL, nameL} from "./optics";
import * as L from "monocle-ts/Lens";
import {memo, useMemo, useRef} from "react";
import {Slider} from "./Slider";
import {useFocusedValue} from "./use-focused-value";
import {TextInput} from "./TextInput";

const useTrackedChanges = (label: string, props: Record<string, any>) => {
    const lastPropsRef = useRef(props);
    const changedProps = Object.entries(props)
        .filter(([key, val]) => val !== lastPropsRef.current[key])
        .map(([key]) => key)
    if(changedProps.length) {
        console.log(`[${label}] Props changed: ${changedProps.join(", ")}`)
    }
    lastPropsRef.current = props;
}

export const UserEditor = memo<{
    userOptic: BoundOptic<L.Lens<any, User>>;
    title: string;
}>(({userOptic, title}) => {
    const renderCountRef = useRef(0);
    renderCountRef.current++;
    const {age, name} = useFocusedValue(userOptic);
    const [ageOptic, nameOptic] = useMemo(
        () => [
            composeBoundOptic(userOptic, ageL),
            composeBoundOptic(userOptic, nameL)
        ],
        [userOptic]
    );

    useTrackedChanges(`Render #${renderCountRef.current}`,{title, age, name, ageOptic, nameOptic, userOptic});

    return (
        <div>
            <h1>{title}</h1>
            <p>editing user {name}</p>
            <div>
                <Slider valueOptic={ageOptic}/>
            </div>
            <div>
                <TextInput valueOptic={nameOptic}/>
            </div>
            <p>Lived {age} long years</p>
            <p>Rendered {renderCountRef.current} times</p>
        </div>
    );
})
