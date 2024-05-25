using System;
using System.Collections.Generic;
using System.Linq;
using Lab_2.Scripts.Api;
using Lab_2.Scripts.Api.Lab_2.Scripts;
using Lab_2.Scripts.Item;
using Unity.VisualScripting;
using UnityEngine;

namespace Lab_2.Scripts.Inventory
{
    public class Inventory : MonoBehaviour
    {
        public List<InventoryItem> Items;
        public InventoryItemPool ItemPool;

        public static Inventory Instance;

        private void Awake()
        {
            if (Instance == null)
                Instance = this;
            else
                Destroy(gameObject);

            Items = new List<InventoryItem>();
        }

        private void Start()
        {
            EventBus.Instance.OnInventoryChanged.AddListener(Init);
        }

        public void AddItem(InventoryItem item)
        {
            Items.Add(item);
        }

        public void RemoveItem(InventoryItem item)
        {
            Items.Remove(item);
        }

        public void Init()
        {
            foreach (var item in Items.ToList())
            {
                Destroy(item.gameObject);
                Items.Remove(item);
            }

            if (AuthManager.Instance.UserInfoData.items == null || AuthManager.Instance.UserInfoData.items.Length == 0)
                return;

            foreach (var item in AuthManager.Instance.UserInfoData.items)
            {
                Debug.Log(item.unityId + " " + item.count + " " + ItemPool.Items.Find(i => i.ConsumableItem.Id == item.unityId));

                var inventoryItemObject = ItemPool.Items.Find(i => i.ConsumableItem.Id == item.unityId);
                var inventoryItem = Instantiate(inventoryItemObject.Item, transform);
                inventoryItem.SetCount(item.count);
                inventoryItem.SetIcon(inventoryItemObject.Icon);
                inventoryItem.ConsumableItem = inventoryItemObject.ConsumableItem;

                AddItem(inventoryItem);
            }

            Items[0].Select();
        }

        public void ScrollItems(int direction)
        {
            var currentIndex = Items.FindIndex(i => i.IsSelected);
            Items[currentIndex].Deselect();

            if (direction < 0)
            {
                if (currentIndex + 1 < Items.Count)
                    Items[currentIndex + 1].Select();
                else
                    Items[0].Select();
            }
            else
            {
                if (currentIndex - 1 >= 0)
                    Items[currentIndex - 1].Select();
                else
                    Items[^1].Select();
            }
        }

        private void Update()
        {
            HandleScrollWheel();
            
            if (Input.GetKeyDown(KeyCode.E))
                UseSelectedItem();
        }

        private void HandleScrollWheel()
        {
            if (Items.Count == 0)
                return;

            var scroll = Input.GetAxis("Mouse ScrollWheel");
            if (scroll > 0)
                ScrollItems(1);
            else if (scroll < 0)
                ScrollItems(-1);
        }
        
        private void UseSelectedItem()
        {
            var selectedItem = Items.Find(i => i.IsSelected);
            if (selectedItem == null)
                return;
            
            selectedItem.Use();
        }
        
        // TODO: сделать сохранение инвентаря на серв
        // TODO: (чтобы отсутствующие предметы удалились из бд (надо будет кинуть пост в котором будет гет на получение всех айтемов))
    }
}