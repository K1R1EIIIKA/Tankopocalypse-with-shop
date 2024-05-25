using System;
using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using System.Threading.Tasks;
using Cysharp.Threading.Tasks;
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

        private void Update()
        {
            if (Input.GetKeyDown(KeyCode.Space))
            {
                Login("d@g.com", "12345");
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
                await www.SendWebRequest();

                if (www.result == UnityWebRequest.Result.ConnectionError || www.result == UnityWebRequest.Result.ProtocolError)
                {
                    Debug.Log(www.error);
                    return false;
                }
                else
                {
                    Debug.Log(www.downloadHandler.text);
                    // Логика после успешной авторизации
                    return true;
                }
            }
        }


        // private IEnumerator LoginCoroutine(string email, string password)
        // {
        //    
        // }
        
        public void Logout()
        {
            StartCoroutine(LogoutCoroutine());
        }

        private IEnumerator LogoutCoroutine()
        {
            using (UnityWebRequest www = UnityWebRequest.PostWwwForm(logoutUrl, ""))
            {
                www.SetRequestHeader("Authorization", "Bearer " + loginResponse.jwt);
                yield return www.SendWebRequest();

                if (www.result == UnityWebRequest.Result.ConnectionError ||
                    www.result == UnityWebRequest.Result.ProtocolError)
                {
                    Debug.Log(www.error + " " + www.downloadHandler.text);
                }
                else
                {
                    Debug.Log("Successfully logged out");
                }
            }
        }
    }
}