using Lab_2.Scripts.Api;
using Lab_2.Scripts.Api.Lab_2.Scripts;
using TMPro;
using UnityEngine;
using Lab_2.Scripts.Inventory;

namespace Lab_2.Scripts.UI
{
    public class LoginPanel : MonoBehaviour
    {
        [SerializeField] private TextMeshProUGUI _loginInputField;
        [SerializeField] private TextMeshProUGUI _passwordInputField;

        [SerializeField] private GameObject _loginPanelUI;
        [SerializeField] private GameObject _userPanelUI;

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
            bool loginSuccess = await AuthManager.Instance.Login(_loginInputField.text, _passwordInputField.text);

            Debug.Log(loginSuccess);

            if (loginSuccess)
                OpenUserPanel();
            else
                Debug.LogError("Login failed.");
        }

        public async void LogoutButton()
        {
            bool logoutSuccess = await AuthManager.Instance.Logout();

            if (logoutSuccess)
                OpenLoginPanel();
        }

        private async void OpenUserPanel()
        {
            await UserInfoManager.RefreshUserInfo();

            if (AuthManager.Instance.UserInfoData == null)
            {
                Debug.LogError("UserInfoData is null");
                return;
            }

            Debug.Log("User info loaded successfully");

            _loginPanelUI.SetActive(false);
            _userPanelUI.SetActive(true);
            UserPanel.Instance.SetUserData(AuthManager.Instance.UserInfoData);
            Inventory.Inventory.Instance.Init();
        }

    }
}