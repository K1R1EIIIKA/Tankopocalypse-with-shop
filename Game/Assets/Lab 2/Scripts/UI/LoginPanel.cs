using Lab_2.Scripts.Api;
using Lab_2.Scripts.Api.Lab_2.Scripts;
using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace Lab_2.Scripts.UI
{
    public class LoginPanel : MonoBehaviour
    {
        [SerializeField] private TextMeshProUGUI _loginInputField;
        [SerializeField] private TextMeshProUGUI _passwordInputField;

        [SerializeField] private GameObject _loginPanelUI;
        [SerializeField] private GameObject _userPanelUI;

        public static LoginPanel Instance { get; private set; }

        private async void Awake()
        {
            if (Instance == null)
                Instance = this;
            else
                Destroy(gameObject);
            
            // var userResults = await UserResultsManager.GetUserResults();
            // if (userResults != null)
            // {
            //     foreach (var userResult in userResults)
            //     {
            //         Debug.Log($"ID: {userResult.id}, User: {userResult.user}, Score: {userResult.score}");
            //     }
            // }
            // else
            // {
            //     Debug.Log("Failed to retrieve user results.");
            // }
        }

        private async void Start()
        {
            await UserInfoManager.GetUserInfo();
            // Debug.Log(UserInfoManager.IsAuthorized);
            // Debug.Log(PlayerPrefs.GetString("cookie"));
            if (UserInfoManager.IsAuthorized)
                OpenUserPanel();


            if (SceneManager.GetActiveScene().name == "Main Menu" && UserInfoManager.IsAuthorized)
            {
                OpenUserPanel();
                CloseLoginPanel();
            }
            else if (SceneManager.GetActiveScene().name == "Main Menu" && !UserInfoManager.IsAuthorized)
            {
                OpenLoginPanel();
                CloseUserPanel();
            }
        }

        private void CloseUserPanel()
        {
            _userPanelUI.SetActive(false);
        }

        public void OpenLoginPanel()
        {
            _loginPanelUI.SetActive(true);
            _userPanelUI.SetActive(false);
        }

        public async void LoginButton()
        {
            bool loginSuccess = await AuthManager.Instance.Login(_loginInputField.text, _passwordInputField.text);

            Debug.Log(loginSuccess);

            if (loginSuccess)
            {
                OpenUserPanel();
                CloseLoginPanel();
                // MenuManager.Instance.LoadGame();
            }
            else
                Debug.LogError("Login failed.");
        }

        public void CloseLoginPanel()
        {
            _loginInputField.text = "";
            _passwordInputField.text = "";
            _loginPanelUI.SetActive(false);
        }

        public async void LogoutButton()
        {
            bool logoutSuccess = await AuthManager.Instance.Logout();

            if (logoutSuccess)
                OpenLoginPanel();
        }

        public async void OpenUserPanel()
        {
            await UserInfoManager.RefreshUserInfo();

            if (AuthManager.Instance.UserInfoData == null)
            {
                Debug.LogError("UserInfoData is null");
                return;
            }

            Debug.Log("User info loaded successfully");

            // _loginPanelUI.SetActive(false);
            _userPanelUI.SetActive(true);
            UserPanel.Instance.SetUserData(AuthManager.Instance.UserInfoData);
            Inventory.Inventory.Instance.Init();
        }
    }
}