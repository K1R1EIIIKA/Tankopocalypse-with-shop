import {Link} from "react-router-dom";

export default function Header() {

    return (
        <header>
            {/*<h1>Header</h1>*/}
            <nav className={'nav'}>
                <Link to={'/'} className={'nav-link'}>Home</Link>
                <Link to={'/items'} className={'nav-link'}>Items</Link>
                <Link to={'/auth/login'} className={'nav-link'}>Login</Link>
            </nav>
        </header>
    );
}