using System;
using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using Lab_2.Scripts.Lab_2.Scripts;
using Newtonsoft.Json.Linq;

namespace Lab_2.Scripts
{
    [Serializable]
    public class LoginResponse
    {
        public string jwt;
        public string refreshJwt;
    }

    public class AuthManager : MonoBehaviour
    {
        private string loginUrl = "http://localhost:8000/api/auth/login";
        private LoginResponse loginResponse;

        private void Awake()
        {
           loginResponse = new LoginResponse();
        }

        async void Start()
        {
            
        }

        private async void Update()
        {
            if (Input.GetKeyDown(KeyCode.Alpha1))
            {
                Login("a@b.com", "12345");
            }

            if (Input.GetKeyDown(KeyCode.Alpha2))
            {
                UserInfo userInfo = await UserInfoManager.GetUserInfo();
                if (userInfo != null)
                {
                    Debug.Log("User ID: " + userInfo.id);
                    Debug.Log("User Role ID: " + userInfo.role.id);
                    Debug.Log("User Role Name: " + userInfo.role.name);
                    Debug.Log("User Role RU Name: " + userInfo.role.ru_name);
                    Debug.Log("User Balance: " + userInfo.balance);
                    foreach (var userItem in userInfo.items)
                    {
                        Debug.Log("User Item ID: " + userItem.id);
                        Debug.Log("User Item Unity ID: " + userItem.unityId);
                        Debug.Log("User Item Count: " + userItem.count);
                    }

                    foreach (var userSkin in userInfo.skins)
                    {
                        Debug.Log("User Skin ID: " + userSkin.id);
                        Debug.Log("User Skin Unity ID: " + userSkin.unityId);
                        Debug.Log("User Skin Count: " + userSkin.count);
                    }
                }
                else
                {
                    Debug.Log("Failed to get user info.");
                }
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

        private void Login(string email, string password)
        {
            StartCoroutine(LoginCoroutine(email, password));
        }

        private IEnumerator LoginCoroutine(string email, string password)
        {
            WWWForm form = new WWWForm();
            form.AddField("email", email);
            form.AddField("password", password);

            using (UnityWebRequest www = UnityWebRequest.Post(loginUrl, form))
            {
                yield return www.SendWebRequest();

                if (www.result == UnityWebRequest.Result.ConnectionError ||
                    www.result == UnityWebRequest.Result.ProtocolError)
                {
                    Debug.Log(www.error + " " + www.downloadHandler.text);
                }
                else
                {
                    var jsonResponse = www.downloadHandler.text;
                    var loginResponseJson = JObject.Parse(jsonResponse);
                    loginResponse.jwt = loginResponseJson.Value<string>("jwt");
                    loginResponse.refreshJwt = loginResponseJson.Value<string>("refresh_jwt");
                    Debug.Log("Successfully logged in. JWT: " + loginResponse.jwt + " Refresh JWT: " + loginResponse.refreshJwt);
                }
            }
        }
    }
}