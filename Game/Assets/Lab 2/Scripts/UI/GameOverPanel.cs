using TMPro;
using UnityEngine;

namespace Lab_2.Scripts.UI
{
    public class GameOverPanel : MonoBehaviour
    {
        [SerializeField] private GameObject _gameOverPanel;
        [SerializeField] private TextMeshProUGUI _scoreText;
        
        public static GameOverPanel Instance { get; private set; }
        
        private void Awake()
        {
            if (Instance == null)
                Instance = this;
            else
                Destroy(gameObject);
        }
        
        public void ShowGameOverPanel()
        {
            _gameOverPanel.SetActive(true);
            _scoreText.text = $"Score:\n{ScoreLogic.Instance.Score}";
        }
    }
}