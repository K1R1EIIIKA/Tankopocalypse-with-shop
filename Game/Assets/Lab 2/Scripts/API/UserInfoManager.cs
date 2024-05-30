using System;
using System.Threading.Tasks;
using Cysharp.Threading.Tasks;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Networking;

namespace Lab_2.Scripts.Api
{
    namespace Lab_2.Scripts
    {
        [Serializable]
        public class UserInfo
        {
            public int id;
            public int user;
            public Role role;
            public float balance;
            public UserItem[] items;
            public UserSkin[] skins;
        }

        public static class UserInfoManager
        {
            private const string URL = "http://localhost:8000/api/account/user-info/";
            
            public static bool IsAuthorized { get; set; }
            
            public static async UniTask<UserInfo> GetUserInfo()
            {
                return await GetUserInfoAsync(URL);
            }

            private static async UniTask<UserInfo> GetUserInfoAsync(string url)
            {
                using (UnityWebRequest www = UnityWebRequest.Get(url))
                {
                    // Получение куки из хранилища
                    string cookie = PlayerPrefs.GetString("cookie");
                    Debug.Log(string.Join(";", cookie));
                    
                    // // Установка куки в заголовок запроса
                    www.SetRequestHeader("Cookie", cookie);
                    
                    Debug.Log(www.GetRequestHeader("Cookie"));

                    var asyncOperation = www.SendWebRequest();
                    while (!asyncOperation.isDone)
                    {
                        await Task.Yield();
                    }

                    if (www.result == UnityWebRequest.Result.ConnectionError ||
                        www.result == UnityWebRequest.Result.ProtocolError)
                    {
                        Debug.Log(www.error);
                        IsAuthorized = false;
                        return null;
                    }

                    var jsonResponse = www.downloadHandler.text;
                    var userInfoJson = JObject.Parse(jsonResponse);

                    var role = await RoleManager.GetRole(userInfoJson.Value<int>("role"));
                    var items = await UserItemManager.GetUserItems();
                    var skins = await UserSkinManager.GetUserSkins();
                    
                    IsAuthorized = true;

                    return new UserInfo
                    {
                        id = userInfoJson.Value<int>("id"),
                        user = userInfoJson.Value<int>("user"),
                        role = role,
                        balance = userInfoJson.Value<float>("balance"),
                        items = items,
                        skins = skins
                    };
                }
            }

            public static async UniTask RefreshUserInfo()
            {
                AuthManager.Instance.UserInfoData = await GetUserInfo();
            }

        }
    }
}