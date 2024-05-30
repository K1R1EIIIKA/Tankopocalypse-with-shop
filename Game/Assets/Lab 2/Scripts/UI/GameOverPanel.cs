using Lab_2.Scripts.Api;
using TMPro;
using UnityEngine;

namespace Lab_2.Scripts.UI
{
    public class GameOverPanel : MonoBehaviour
    {
        [SerializeField] private GameObject _gameOverPanel;
        [SerializeField] private TextMeshProUGUI _scoreText;
        [SerializeField] private TextMeshProUGUI _highScoresText;
        [SerializeField] private int _highScoresCount = 5;
        
        public static GameOverPanel Instance { get; private set; }
        
        private void Awake()
        {
            if (Instance == null)
                Instance = this;
            else
                Destroy(gameObject);
        }
        
        public async void ShowGameOverPanel()
        {
            _gameOverPanel.SetActive(true);
            _scoreText.text = $"Score:\n{ScoreLogic.Instance.Score}";
            
            var results = await UserResultsManager.PostUserResults(ScoreLogic.Instance.Score);
            if (!results)
            {
                _highScoresText.text = "Failed to post user results.";
                return;
            }

            var highScores = await UserResultsManager.GetHighesScoresAsync(_highScoresCount);
            if (highScores != null)
            {
                _highScoresText.text = "High Scores:\n";
                foreach (var highScore in highScores)
                {
                    _highScoresText.text += $"{highScore.name}: {highScore.score}\n";
                }
            }
            else
            {
                _highScoresText.text = "Failed to retrieve high scores.";
            }
        }
    }
}