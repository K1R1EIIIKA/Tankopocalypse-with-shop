using System;
using Lab_2.Scripts.Player;
using UnityEngine;

namespace Lab_2.Scripts.UI
{
    public class PausePanel : MonoBehaviour
    {
        [SerializeField] private GameObject _pausePanel;

        public bool IsPaused { get; private set; }

        public static PausePanel Instance { get; private set; }

        private void Awake()
        {
            if (Instance == null)
                Instance = this;
            else
                Destroy(gameObject);
        }

        private void Update()
        {
            if (Input.GetKeyDown(KeyCode.Escape) && !TimerPanel.Instance.IsTimeOver)
                TogglePause();
        }

        public void TogglePause()
        {
            IsPaused = !IsPaused;
            _pausePanel.SetActive(IsPaused);
            if (IsPaused)
                CameraLogic.Instance.UnlockCursor();
            else
                CameraLogic.Instance.LockCursor();

            Time.timeScale = IsPaused ? 0 : 1;
        }
    }
}