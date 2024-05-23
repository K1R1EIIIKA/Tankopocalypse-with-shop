import {Link} from "react-router-dom";
import {useAppSelector} from "../../api/app/hooks.ts";
import {useUserInfo} from "../Hooks/useUserInfo.tsx";
import './Header.css';
import {Cart} from "../../api/shop/cart/cartApi.ts";
import {useCart} from "../Hooks/useCart.tsx";

export default function Header() {
	const user: any = useAppSelector((state) => state.auth.user);
	const userInfo = useUserInfo();
	const cart: Cart | null = useCart();

	return (
		<header>
			<nav className={'navbar navbar-expand-lg navbar-light bg-light py-0 fixed-top'}>
				<div className="container-fluid py-2">
					<Link to="/" className="navbar-brand ms-5">Tankopokalypse</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
									aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarText">
						<ul className="navbar-nav">
							<Link to="/items" className="nav-item nav-link me-3 ms-3">Предметы</Link>
							<Link to="/items" className="nav-item nav-link me-3">Скины</Link>
						</ul>
					</div>

					{!user && (
						<>
							<span className="navbar-text">
								<Link to="/auth/login" className="nav-item nav-link me-4">Вход</Link>
							</span>
							<span className="navbar-text">
								<Link to="/auth/register" className="nav-item nav-link me-5">Регистрация</Link>
							</span>
						</>
					)}

					{user && (
						<>
							<Link to="/cart" className="text-decoration-none">
								<span className="navbar-text me-4">Корзина - {cart?.total_price}₽</span>
							</Link>
							<span className="navbar-text me-5">
								<Link to="/user" className="nav-item nav-link">{user.name} - {userInfo?.balance}₽</Link>
							</span>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}