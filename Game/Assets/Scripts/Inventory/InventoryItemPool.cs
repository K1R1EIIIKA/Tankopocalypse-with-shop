using System.Collections.Generic;
using Lab_2.Scripts.Item;
using UnityEngine;

namespace Lab_2.Scripts.Inventory
{
    [CreateAssetMenu(fileName = "InventoryItemPool", menuName = "Inventory/InventoryItemPool")]
    public class InventoryItemPool : ScriptableObject
    {
        [SerializeField] private List<InventoryItemObject> _items;
        public List<InventoryItemObject> Items => _items;
    }
}