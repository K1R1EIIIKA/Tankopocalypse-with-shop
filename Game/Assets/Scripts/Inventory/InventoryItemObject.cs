using Lab_2.Scripts.Item;
using UnityEngine;

namespace Lab_2.Scripts.Inventory
{
    [CreateAssetMenu(fileName = "InventoryItemObject", menuName = "Inventory/InventoryItemObject")]
    public class InventoryItemObject : ScriptableObject
    {
        [SerializeField] private InventoryItem _item;
        public InventoryItem Item => _item;
        [SerializeField] private ConsumableItem _consumableItem;
        public ConsumableItem ConsumableItem => _consumableItem;
        [SerializeField] private Sprite _icon;
        public Sprite Icon => _icon;
    }
}