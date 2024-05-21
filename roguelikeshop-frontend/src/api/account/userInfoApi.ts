import {getUser, User} from "./UserApi.ts";
import {getRole, Role} from "./RolesApi.ts";
import {getUserItem, UserItem} from "./userItemsApi.ts";
import {getUserSkin, UserSkin} from "./userSkinsApi.ts";
import axios from "axios";

export interface UserInfo {
    id: number;
    user: User;
    role: Role;
    balance: number;
    items: UserItem[];
    skins: UserSkin[];
}

export async function getUserInfo() {
    try {
        const response = await axios.get('http://localhost:8000/api/account/user-info', { withCredentials: true });
        const userInfo = response.data;
        userInfo.user = await getUser();
        userInfo.role = await getRole(userInfo.role);

        const items = userInfo.items;
        const skins = userInfo.skins;

        userInfo.items = [];
        for (const userItem of items) {
            userInfo.items.push(await getUserItem(userItem));
        }
        userInfo.skins = [];
        for (const userSkin of skins) {
            userInfo.skins.push(await getUserSkin(userSkin));
        }
        return userInfo;
    }
    catch (error) {
        console.error('There was an error!', error);
        return null;
    }
}