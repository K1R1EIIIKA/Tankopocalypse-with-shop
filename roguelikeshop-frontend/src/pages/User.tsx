import {RootState} from "@reduxjs/toolkit/query";
import {useSelector} from "react-redux";

export default function User() {
    const user = useSelector((state: RootState) => state.auth.user);

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