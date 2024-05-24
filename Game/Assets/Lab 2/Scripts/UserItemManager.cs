using System;
using Cysharp.Threading.Tasks;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Networking;

namespace Lab_2.Scripts
{
    [Serializable]
    public class UserItem
    {
        public int id;
        public int unityId;
        public int count;
    }

    public static class UserItemManager
    {
        private const string URL = "http://localhost:8000/api/account/user-items/";
        public static async UniTask<UserItem[]> GetUserItems()
        {
            return await GetUserItemsAsync(URL);
        }

        private static async UniTask<UserItem[]> GetUserItemsAsync(string url)
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
                var userItemsJson = JArray.Parse(jsonResponse);
                UserItem[] userItems = new UserItem[userItemsJson.Count];
                for (int i = 0; i < userItemsJson.Count; i++)
                {
                    userItems[i] = new UserItem
                    {
                        id = userItemsJson[i].Value<int>("id"),
                        unityId = userItemsJson[i].Value<int>("unity_id"),
                        count = userItemsJson[i].Value<int>("count")
                    };
                }

                return userItems;
            }
        }
    }
}