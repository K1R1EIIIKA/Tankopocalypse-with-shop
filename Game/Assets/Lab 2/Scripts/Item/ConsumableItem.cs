using UnityEngine;

namespace Lab_2.Scripts.Item
{
    public class ConsumableItem : ItemBase
    {
        public override void Use()
        {
            Debug.Log("Consumed item " + Name + " with id " + Id);
        }
    }
}