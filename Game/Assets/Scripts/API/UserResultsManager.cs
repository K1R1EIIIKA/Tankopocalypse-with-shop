using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cysharp.Threading.Tasks;
using Lab_2.Scripts.Api.Lab_2.Scripts;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Networking;

namespace Lab_2.Scripts.Api
{
    [Serializable]
    public class UserResults
    {
        public int id;
        public int user;
        public string name;
        public int score;
    }

    public static class UserResultsManager
    {
        private const string URL = "http://localhost:8000/api/account/results/";

        public static async UniTask<List<UserResults>> GetUserResults()
        {
            return await GetUserResultsAsync(URL);
        }

        private static async UniTask<List<UserResults>> GetUserResultsAsync(string url)
        {
            using (UnityWebRequest www = UnityWebRequest.Get(url))
            {
                var asyncOperation = www.SendWebRequest();
                while (!asyncOperation.isDone)
                {
                    await Task.Yield();
                }

                if (www.result == UnityWebRequest.Result.ConnectionError ||
                    www.result == UnityWebRequest.Result.ProtocolError)
                {
                    Debug.Log(www.error);
                    return null;
                }

                var jsonResponse = www.downloadHandler.text;
                
                var userResultsJson = JArray.Parse(jsonResponse);
                List<UserResults> userResults = new List<UserResults>();
                foreach (var result in userResultsJson)
                {
                    userResults.Add(new UserResults
                    {
                        id = result.Value<int>("id"),
                        user = result.Value<int>("user"),
                        name = result.Value<string>("name"),
                        score = result.Value<int>("score")
                    });
                }

                return userResults;
            }
        }
        
        public static async UniTask<List<UserResults>> GetHighesScoresAsync(int count)
        {
            var results = await GetUserResults();
            results.Sort((a, b) => b.score.CompareTo(a.score));
            
            return results.GetRange(0, Math.Min(count, results.Count));
        }
        
        public static async Task<bool> PostUserResults(int score)
        {
            var user = await UserInfoManager.GetUserInfo();
            var body = new JObject
            {
                { "user_id", user.user },
                { "score", score }
            };
            
            using (UnityWebRequest www = UnityWebRequest.PostWwwForm(URL, body.ToString()))
            {
                await www.SendWebRequest();

                while (!www.isDone)
                {
                    await Task.Yield();
                }
                
                if (www.result == UnityWebRequest.Result.ConnectionError ||
                    www.result == UnityWebRequest.Result.ProtocolError)
                {
                    Debug.Log(www.error);
                    return false;
                }
                
                Debug.Log("Score posted");
                
                await UserInfoManager.RefreshUserInfo();
                
                return true;
            }
        }
    }
}