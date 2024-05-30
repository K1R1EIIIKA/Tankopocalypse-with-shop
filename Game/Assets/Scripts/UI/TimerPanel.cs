using System;
using Lab_2.Scripts.Player;
using TMPro;
using UnityEngine;

namespace Lab_2.Scripts.UI
{
    public class TimerPanel : MonoBehaviour
    {
        [SerializeField] private TextMeshProUGUI _timerText;
        [SerializeField] private float _timeToWin;
        
        public bool IsTimeOver { get; private set; }
        
        public static TimerPanel Instance { get; private set; }
        
        private void Awake()
        {
            Time.timeScale = 1;
            
            if (Instance == null)
                Instance = this;
            else
                Destroy(gameObject);
        }
        
        private void Start()
        {
            SetTime(_timeToWin);
        }

        private void Update()
        {
            if (IsTimeOver)
                return;
            
            UpdateTimer();
        }

        private void UpdateTimer()
        {
            _timeToWin -= Time.deltaTime;
            SetTime(_timeToWin);
            if (_timeToWin <= 0)
            {
                SetTime(0);
                TimeIsOver();
            }
        }

        private void TimeIsOver()
        {
            IsTimeOver = true;
            Time.timeScale = 0;
            CameraLogic.Instance.UnlockCursor();
            GameOverPanel.Instance.ShowGameOverPanel();
        }

        private void SetTime(float time)
        {
            _timerText.text = $"Time: {GetTimeText(time)}";
        }
        
        private string GetTimeText(float time)
        {
            string minutes = Mathf.Floor(time / 60).ToString("00");
            string seconds = (time % 60).ToString("00");
            return $"{minutes}:{seconds}";
        }
    }
}