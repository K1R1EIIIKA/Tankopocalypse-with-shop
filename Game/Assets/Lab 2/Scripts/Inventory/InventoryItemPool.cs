using System.Collections.Generic;
using Lab_2.Scripts.Item;
using UnityEngine;

namespace Lab_2.Scripts.Inventory
{
    [CreateAssetMenu(fileName = "InventoryItemPool", menuName = "Inventory/InventoryItemPool")]
    public class InventoryItemPool : ScriptableObject
    {
        [SerializeField] private List<InventoryItem> _items;
        public List<InventoryItem> Items => _items;
    }
}