import { useState, useEffect } from "react";
import { getUserInfo, UserInfo } from "../api/account/userInfoApi.ts";
import {useAppSelector} from "../api/app/hooks.ts";
import {User} from "../api/account/UserApi.ts";

let globalSetUserInfo: ((userInfo: UserInfo) => void) | null = null;

export function useUserInfo() {
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const user: User = useAppSelector((state) => state.auth.user);

	useEffect(() => {
		if (!user) {
			setUserInfo(null);
			return;
		}
		globalSetUserInfo = setUserInfo;
		getUserInfo().then(setUserInfo);
		return () => {
			globalSetUserInfo = null;
		};
	}, [user]);

	return userInfo;
}

export function refreshUserInfo() {
	if (globalSetUserInfo) {
		getUserInfo().then(globalSetUserInfo);
	}
}
