using System;
using Cysharp.Threading.Tasks;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Networking;

namespace Lab_2.Scripts
{
    [Serializable]
    public class UserSkin
    {
        public int id;
        public int unityId;
        public int count;
    }

    public static class UserSkinManager
    {
        private const string URL = "http://localhost:8000/api/account/user-skins/";

        public static async UniTask<UserSkin[]> GetUserSkins()
        {
            return await GetUserSkinsAsync(URL);
        }

        private static async UniTask<UserSkin[]> GetUserSkinsAsync(string url)
        {
            using (UnityWebRequest www = UnityWebRequest.Get(url))
            {
                await www.SendWebRequest();

                if (www.result == UnityWebRequest.Result.ConnectionError ||
                    www.result == UnityWebRequest.Result.ProtocolError)
                {
                    Debug.Log(www.error);
                    return null;
                }

                var jsonResponse = www.downloadHandler.text;
                var userSkinsJson = JArray.Parse(jsonResponse);
                UserSkin[] userSkins = new UserSkin[userSkinsJson.Count];
                for (int i = 0; i < userSkinsJson.Count; i++)
                {
                    userSkins[i] = new UserSkin
                    {
                        id = userSkinsJson[i].Value<int>("id"),
                        unityId = userSkinsJson[i].Value<int>("unity_id"),
                        count = userSkinsJson[i].Value<int>("count")
                    };
                }

                return userSkins;
            }
        }
    }
}