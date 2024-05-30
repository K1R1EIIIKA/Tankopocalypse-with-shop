using TMPro;
using UnityEngine;

namespace Lab_2.Scripts.UI
{
    public class ScoreLogic : MonoBehaviour
    {
        [SerializeField] private TextMeshProUGUI _scoreText;

        public int Score { get; private set; }

        public static ScoreLogic Instance { get; private set; }

        private void Awake()
        {
            if (Instance == null)
                Instance = this;
            else
                Destroy(gameObject);

            Score = 0;
            SetScore();
        }

        public void AddScore(int score)
        {
            Score += score;
            SetScore();
        }

        private void SetScore()
        {
            _scoreText.text = $"Score: {Score}";
        }
    }
}