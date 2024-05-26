using System;
using System.Collections.Generic;
using Cysharp.Threading.Tasks;
using Lab_2.Scripts.Item;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Networking;

namespace Lab_2.Scripts.Api
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

        public static async void PostUserItems(List<InventoryItem> items)
        {
            var body = new JArray();
            foreach (var item in items)
            {
                body.Add(new JObject
                {
                    { "id", item.ConsumableItem.Id },
                    { "count", item.count }
                });
            }

            Debug.Log(string.Join(";", body.ToString()));

            using (UnityWebRequest www = UnityWebRequest.PostWwwForm(URL, body.ToString()))
            {
                string cookie = PlayerPrefs.GetString("cookie");
                Debug.Log(string.Join(";", cookie));

                www.SetRequestHeader("Cookie", cookie);

                Debug.Log(www.GetRequestHeader("Cookie"));

                await www.SendWebRequest();

                if (www.result == UnityWebRequest.Result.ConnectionError ||
                    www.result == UnityWebRequest.Result.ProtocolError)
                {
                    Debug.Log(www.error);
                }
            }
        }
    }
}