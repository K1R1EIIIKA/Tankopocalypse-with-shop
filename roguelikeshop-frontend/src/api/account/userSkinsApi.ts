import {getSkin, Skin} from "../shop/SkinsApi.ts";
import {User} from "./UserApi.ts";
import axios from "axios";

export interface UserSkin {
    id: number;
    user: User;
    skin: Skin;
    count: number;
    price: number;
}

export async function getUserSkins() {
    try {
        const response = await axios.get('http://localhost:8000/api/account/user-skins');
        const userSkins = response.data;
        for (const userSkin of userSkins) {
            userSkin.skin = await getSkin(userSkin.skin);
        }
        return userSkins;
    }
    catch (error) {
        console.error('There was an error!', error);
        return null;
    }
}

export async function getUserSkin(id: number) {
    try {
        const response = await axios.get(`http://localhost:8000/api/account/user-skins/${id}`);
        const userSkin = response.data;
        userSkin.skin = await getSkin(userSkin.skin);
        return userSkin;
    }
    catch (error) {
        console.error('There was an error!', error);
        return null;
    }
}