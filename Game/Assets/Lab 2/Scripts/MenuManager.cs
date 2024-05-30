using UnityEngine;
using UnityEngine.SceneManagement;

namespace Lab_2.Scripts
{
    public class MenuManager : MonoBehaviour
    {
        public void RestartGame()
        {
           SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
        }
        
        public void ExitGame()
        {
            Application.Quit();
        }
        
        public void LoadMenu()
        {
            SceneManager.LoadScene("Main Menu");
        }
        
        public void LoadGame()
        {
            SceneManager.LoadScene("Game");
        }
    }
}