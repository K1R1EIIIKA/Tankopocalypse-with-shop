using System;
using Lab_2.Scripts.Api.Lab_2.Scripts;
using Lab_2.Scripts.UI;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace Lab_2.Scripts
{
    public class MenuManager : MonoBehaviour
    {
        public static MenuManager Instance { get; private set; }
        
        private void Awake()
        {
            if (Instance == null)
                Instance = this;
            else
                Destroy(gameObject);
        }

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