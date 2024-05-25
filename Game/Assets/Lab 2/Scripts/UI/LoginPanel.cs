using Lab_2.Scripts.Api;
using Lab_2.Scripts.Api.Lab_2.Scripts;
using TMPro;
using UnityEngine;

namespace Lab_2.Scripts.UI
{
    public class LoginPanel : MonoBehaviour
    {
        [SerializeField] private TextMeshProUGUI _loginInputField;
        [SerializeField] private TextMeshProUGUI _passwordInputField;

        [SerializeField] private GameObject _loginPanelUI;
        [SerializeField] private GameObject _userPanelUI;

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
            bool loginSuccess = await AuthManager.Instance.Login(_loginInputField.text, _passwordInputField.text);

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
            UserInfoObject = await UserInfoManager.GetUserInfo();

            if (UserInfoObject == null)
                return;

            _loginPanelUI.SetActive(false);
            _userPanelUI.SetActive(true);
            UserPanel.Instance.SetUserData(UserInfoObject);
        }
    }
}