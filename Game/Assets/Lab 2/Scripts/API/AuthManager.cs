using System;
using System.Collections;
using System.Threading.Tasks;
using Cysharp.Threading.Tasks;
using Lab_2.Scripts.Api.Lab_2.Scripts;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Networking;

namespace Lab_2.Scripts.Api
{
    [Serializable]
    public class LoginResponse
    {
        public string jwt;
        public string refreshJwt;
    }

    public class AuthManager : MonoBehaviour
    {
        public UserInfo UserInfoData { get; set; }

        private string loginUrl = "http://localhost:8000/api/auth/login";
        private string logoutUrl = "http://localhost:8000/api/auth/logout";
        private LoginResponse loginResponse;

        public static AuthManager Instance { get; private set; }

        private void Awake()
        {
            loginResponse = new LoginResponse();

            if (Instance == null)
                Instance = this;
            else
                Destroy(gameObject);
        }

        private async void Update()
        {
            if (Input.GetKeyDown(KeyCode.Space))
            {
                await Login("d@g.com", "12345");
            }
        }

        private IEnumerator CheckInternetConnection()
        {
            using (UnityWebRequest www = UnityWebRequest.Get("https://www.google.com/"))
            {
                yield return www.SendWebRequest();

                if (www.result == UnityWebRequest.Result.ConnectionError ||
                    www.result == UnityWebRequest.Result.ProtocolError)
                {
                    Debug.Log("No Internet Connection");
                }
                else
                {
                    Debug.Log("Internet Connection Available");
                }
            }
        }

        public async Task<bool> Login(string email, string password)
        {
            WWWForm form = new WWWForm();
            form.AddField("email", email);
            form.AddField("password", password);

            using (UnityWebRequest www = UnityWebRequest.Post(loginUrl, form))
            {
                var asyncOperation = www.SendWebRequest();

                while (!asyncOperation.isDone)
                {
                    await Task.Yield();
                }

                if (www.result == UnityWebRequest.Result.Success)
                {
                    var jsonResponse = www.downloadHandler.text;
                    var loginResponseJson = JObject.Parse(jsonResponse);
                    string jwt = loginResponseJson.Value<string>("jwt");
                    string refreshJwt = loginResponseJson.Value<string>("refresh_jwt");

                    if (!string.IsNullOrEmpty(jwt) && !string.IsNullOrEmpty(refreshJwt))
                    {
                        // Сохранение JWT токенов и куки
                        PlayerPrefs.SetString("jwt", jwt);
                        PlayerPrefs.SetString("refreshJwt", refreshJwt);
                        PlayerPrefs.Save();

                        foreach (var header in www.GetResponseHeaders())
                        {
                            if (header.Key.ToLower() == "set-cookie")
                            {
                                PlayerPrefs.SetString("cookie", header.Value);
                            }
                        }

                        Debug.Log("Successfully logged in. JWT: " + jwt + " Refresh JWT: " + refreshJwt);
                        return true;
                    }
                    else
                    {
                        Debug.LogError("Invalid login response");
                        return false;
                    }
                }

                Debug.LogError("Login failed: " + www.error);
                return false;
            }
        }


        public async Task<bool> Logout()
        {
            using (UnityWebRequest www = UnityWebRequest.PostWwwForm(logoutUrl, ""))
            {
                // www.SetRequestHeader("Authorization", "Bearer " + loginResponse.jwt);
                var asyncOperation = www.SendWebRequest();
                while (!asyncOperation.isDone)
                {
                    await Task.Yield();
                }

                if (www.result == UnityWebRequest.Result.Success)
                {
                    Debug.Log("Logout successful");
                    return true;
                }

                Debug.LogError("Logout failed" + www.error);
                return false;
            }
        }
    }
}