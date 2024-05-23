import {useAppSelector} from "../../api/app/hooks.ts";
import {User} from "../../api/account/UserApi.ts";
import {useEffect, useState} from "react";
import {getUserItems, UserItem} from "../../api/account/userItemsApi.ts";
import {getUserSkins, UserSkin} from "../../api/account/userSkinsApi.ts";
import {refreshUserInfo} from "../../components/Hooks/useUserInfo.tsx";
import {getUserInfo, motherload, UserInfo} from "../../api/account/userInfoApi.ts";
import {Link} from "react-router-dom";
import './UserPage.css';

export default function UserPage() {
	const user: User = useAppSelector((state) => state.auth.user);
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
			getUserInfo().then((userInfo) => setUserInfo(userInfo));
		});
	}

	return (
		<div>
			<div className="row mt-4">
				<div className="col user-info">
					<h1>Привет, {user?.name}!</h1>
					<h3>e-mail: {user?.email}</h3>
					<h3>Баланс: {userInfo?.balance}₽</h3>
				</div>
				<div className="col">
					{userInfo && userInfo.role.name.toLowerCase() === 'crush' && (
						<>
							<button onClick={handleMotherload} className={'btn btn-primary mb-4'}>Добавить денег</button>
							<br/>
						</>
					)}
					<button className="btn btn-primary"><Link to="/auth/logout" className="nav-item nav-link">Выйти из
						аккаунта</Link>
					</button>
				</div>
			</div>
			<div className={'row'}>
				<div className="col">
					{items ? (
						<div className={'mt-4 user-items'}>
							<h3>Предметы</h3>
							{items.map((item) => (
								<div key={item.id}>
									<h5>{item.item.name} - <span
										style={{color: item.item.rarity.color.hex_code}}>{item.item.rarity.name}</span> x{item.count}</h5>
								</div>
							))}
						</div>
					) : (
						<p>Loading...</p>
					)}
				</div>

				<div className="col">
					{skins ? (
						<div className={'mt-4 user-items'}>
							<h3>Скины</h3>
							{skins.map((skin) => (
								<div key={skin.id}>
									<h5>{skin.skin.name} (<span
										style={{color: skin.skin.color.hex_code}}>{skin.skin.color.name}</span>) - <span
										style={{color: skin.skin.rarity.color.hex_code}}>{skin.skin.rarity.name}</span> x{skin.count}</h5>
								</div>
							))}
						</div>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>
		</div>
	);
}