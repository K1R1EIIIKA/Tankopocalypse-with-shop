using System;
using TMPro;
using UnityEngine;

namespace Lab_2.Scripts.Item
{
    public class InventoryItem : MonoBehaviour
    {
        public ConsumableItem consumableItem;
        public int count;
        public TextMeshProUGUI CountText;
        public bool IsSelected;
        public GameObject SelectedBorder;
        
        public void SetCount(int itemCount)
        {
            count = itemCount;
            CountText.text = itemCount.ToString();
        }
        
        public void Select()
        {
            IsSelected = true;
            SelectedBorder.SetActive(true);
        }
        
        public void Deselect()
        {
            IsSelected = false;
            SelectedBorder.SetActive(false);
        }
    }
}