using System;
using Lab_2.Scripts.Lab_2.Scripts;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.UIElements;

namespace Lab_2.Scripts
{
    public class LoginPanel : MonoBehaviour
    {
        [SerializeField] private TextMeshProUGUI _loginInputField;
        [SerializeField] private TextMeshProUGUI _passwordInputField;

        [SerializeField] private GameObject _loginPanelUI;
        [SerializeField] private GameObject _userPanelUI;
        [SerializeField] private TextMeshProUGUI _userInfoText;

        public UserInfo UserInfoObject { get; private set; }
        public static LoginPanel Instance { get; private set; }

        private void Awake()
        {
            if (Instance == null)
                Instance = this;
            else
                Destroy(gameObject);
        }

        private void Start()
        {
            OpenLoginPanel();
        }

        private void OpenLoginPanel()
        {
            _loginPanelUI.SetActive(true);
            _userPanelUI.SetActive(false);
        }
        
        public async void LoginButton()
        {
            // AuthManager.Instance.Logout();
            bool loginSuccess = await AuthManager.Instance.Login(_loginInputField.text, _passwordInputField.text);
            
            if (loginSuccess)
            {
                OpenUserPanel();
            }
            else
            {
                Debug.LogError("Login failed.");
            }
        }

        private async void OpenUserPanel()
        {
            UserInfoObject = await UserInfoManager.GetUserInfo();
            
            if (UserInfoObject == null)
                return;
            
            _loginPanelUI.SetActive(false);
            _userPanelUI.SetActive(true);
            SetUserData(UserInfoObject);
        }

        public void SetUserData(UserInfo userInfo)
        {
            _userInfoText.text = $"User ID: {userInfo.id}\n" +
                                 $"User Role ID: {userInfo.role.id}\n" +
                                 $"User Role Name: {userInfo.role.name}\n" +
                                 $"User Role RU Name: {userInfo.role.ru_name}\n" +
                                 $"User Balance: {userInfo.balance}\n";
            foreach (var userItem in userInfo.items)
            {
                _userInfoText.text += $"User Item ID: {userItem.id}\n" +
                                      $"User Item Unity ID: {userItem.unityId}\n" +
                                      $"User Item Count: {userItem.count}\n";
            }

            foreach (var userSkin in userInfo.skins)
            {
                _userInfoText.text += $"User Skin ID: {userSkin.id}\n" +
                                      $"User Skin Unity ID: {userSkin.unityId}\n" +
                                      $"User Skin Count: {userSkin.count}\n";
            }
        }
    }
}