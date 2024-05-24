using System;
using UnityEngine;

namespace Lab_2.Scripts.Item
{
    public class InventoryItem : ItemBase
    {
        [SerializeField] private int count;
        
        public int Count => count;
    }
}