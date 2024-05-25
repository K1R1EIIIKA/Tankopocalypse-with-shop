using Lab_2.Scripts.Api.Lab_2.Scripts;
using TMPro;
using UnityEngine;

namespace Lab_2.Scripts.UI
{
    public class UserPanel : MonoBehaviour
    {
        [SerializeField] private TextMeshProUGUI _userInfoText;
        
        public static UserPanel Instance { get; private set; }

        private void Awake()
        {
            if (Instance == null)
                Instance = this;
            else
                Destroy(gameObject);
        }
        
        public void SetUserData(UserInfo userInfo)
        {
            _userInfoText.text = $"User ID: {userInfo.id}\n" +
                                 $"User Role ID: {userInfo.role.id}\n" +
                                 $"User Role Name: {userInfo.role.name}\n" +
                                 $"User Role RU Name: {userInfo.role.ru_name}\n" +
                                 $"User Balance: {userInfo.balance}\n";
            // foreach (var userItem in userInfo.items)
            // {
            //     _userInfoText.text += $"User Item ID: {userItem.id}\n" +
            //                           $"User Item Unity ID: {userItem.unityId}\n" +
            //                           $"User Item Count: {userItem.count}\n";
            // }
            //
            // foreach (var userSkin in userInfo.skins)
            // {
            //     _userInfoText.text += $"User Skin ID: {userSkin.id}\n" +
            //                           $"User Skin Unity ID: {userSkin.unityId}\n" +
            //                           $"User Skin Count: {userSkin.count}\n";
            // }
        }
    }
}