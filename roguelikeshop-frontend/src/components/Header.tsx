import {Link} from "react-router-dom";
// import {useSelector} from "react-redux";
// import {RootState} from "@reduxjs/toolkit/query";
import {useAppSelector} from "../app/hooks.ts";

export default function Header() {
    // const user = useSelector((state: RootState) => state.auth.user);
    const user = useAppSelector((state) => state.auth.user);

    return (
        <header>
            {/*<h1>Header</h1>*/}
            <nav className={'nav'}>
                <Link to={'/'} className={'nav-link'}>Home</Link>
                <Link to={'/items'} className={'nav-link'}>Items</Link>
                <Link to={'/auth/login'} className={'nav-link'}>Login</Link>
                {user && <Link to={'/user'} className={'nav-link'}>{user.name}</Link>}
            </nav>
        </header>
    );
}