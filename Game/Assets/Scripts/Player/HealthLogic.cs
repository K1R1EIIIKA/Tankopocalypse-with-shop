using System;
using UnityEngine;

namespace Lab_2.Scripts.Player
{
    public class HealthLogic : MonoBehaviour
    {
        private void Start()
        {
            PlayerLogic.Instance.currentStats.CurrentHealth = PlayerLogic.Instance.currentStats.MaxHealth;
            PlayerLogic.Instance.currentStats.Health = PlayerLogic.Instance.currentStats.MaxHealth;
        }
    }
}