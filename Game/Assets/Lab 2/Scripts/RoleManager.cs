using System;
using Cysharp.Threading.Tasks;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Networking;

namespace Lab_2.Scripts
{
    [Serializable]
    public class Role
    {
        public int id;
        public string name;
        public string ru_name;
    }

    public static class RoleManager
    {
        private const string URL = "http://localhost:8000/api/account/roles/";
        
        public static async UniTask<Role> GetRole(int id)
        {
            return await GetRoleAsync(URL + id + "/");
        }

        private static async UniTask<Role> GetRoleAsync(string url)
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
                var roleJson = JObject.Parse(jsonResponse);
                return new Role
                {
                    id = roleJson.Value<int>("id"),
                    name = roleJson.Value<string>("name"),
                    ru_name = roleJson.Value<string>("name_ru")
                };
            }
        }
    }
}