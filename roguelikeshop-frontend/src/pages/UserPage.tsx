import {useAppSelector} from "../api/app/hooks.ts";
import {User} from "../api/account/UserApi.ts";
import {useEffect, useState} from "react";
import {getUserItems, UserItem} from "../api/account/userItemsApi.ts";
import {getUserSkins, UserSkin} from "../api/account/userSkinsApi.ts";
import {refreshUserInfo} from "../components/Hooks/useUserInfo.tsx";
import {getUserInfo, motherload, UserInfo} from "../api/account/userInfoApi.ts";
import {Link} from "react-router-dom";

export default function UserPage() {
	const user: User  = useAppSelector((state) => state.auth.user);
	const [items, setItems] = useState<UserItem[] | null>(null);
	const [skins, setSkins] = useState<UserSkin[] | null>(null);
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

	useEffect(() => {
		getUserItems().then((items) => setItems(items));
		getUserSkins().then((skins) => setSkins(skins));
		getUserInfo().then((userInfo) => setUserInfo(userInfo));
	}, []);

	function handleMotherload() {
		motherload().then(() => {
			refreshUserInfo()
		});
	}

	return (
		<div>
			<h1>User</h1>
			<div>
				<h2>{user?.name}</h2>
				<p>{user?.email}</p>
				{userInfo && userInfo.role.name.toLowerCase() === 'crush' && (
					<button onClick={handleMotherload}>Motherload</button>
				)}

				<span className="navbar-text"><Link to="/auth/logout" className="nav-item nav-link">Logout</Link></span>

				{items ? (
					<div>
						<h3>Items</h3>
						{items.map((item) => (
							<div key={item.id}>
								<p>{item.item.name} x{item.count}</p>
								<p>{item.item.description}</p>
								<p>{item.price}</p>
								<br></br>
							</div>
							))}
					</div>
				) : (
					<p>Loading items...</p>
				)}

				{skins ? (
					<div>
						<h3>Skins</h3>
						{skins.map((skin) => (
							<div key={skin.id}>
								<p>{skin.skin.name} x{skin.count}</p>
								<p>{skin.skin.description}</p>
								<p>{skin.price}</p>
							</div>
						))}
					</div>
				) : (
					<p>Loading skins...</p>
				)}
			</div>
		</div>
);
}