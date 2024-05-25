using System;
using UnityEngine;
using UnityEngine.Events;

namespace Lab_2.Scripts
{
    public class EventBus : MonoBehaviour
    {
        public static EventBus Instance { get; private set; } 
        public UnityEvent OnInventoryChanged = new UnityEvent();

        private void Awake()
        {
            if (Instance == null)
                Instance = this;
            else
                Destroy(gameObject);
        }
    }
}