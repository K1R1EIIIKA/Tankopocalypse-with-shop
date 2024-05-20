import {useAppSelector} from "../app/hooks.ts";

export default function User() {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div>
            <h1>User</h1>
            <div>
                <h2>{user?.username}</h2>
                <p>{user?.email}</p>
            </div>
        </div>
    );
}