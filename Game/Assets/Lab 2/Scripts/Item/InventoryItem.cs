using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Lab_2.Scripts.Item
{
    public class InventoryItem : MonoBehaviour
    {
        public int count;
        public TextMeshProUGUI CountText;
        public bool IsSelected;
        public GameObject SelectedBorder;
        public ConsumableItem ConsumableItem;
        
        public void SetIcon(Sprite icon)
        {
            GetComponent<Image>().sprite = icon;
        }
        
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

        public void Use()
        {
            SetCount(--count);
            ConsumableItem.Use();
        }
    }
}