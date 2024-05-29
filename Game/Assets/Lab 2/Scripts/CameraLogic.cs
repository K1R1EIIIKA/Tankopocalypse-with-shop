using System;
using Cinemachine;
using UnityEngine;
using UnityEngine.Serialization;

namespace Lab_2.Scripts.Player
{
    public class CameraLogic : MonoBehaviour
    {
        [SerializeField] private GameObject _cross;
        [SerializeField] private CinemachineFreeLook _cinemachineFreeLook;
        
        public bool IsCursorLocked = true;
        
        public static CameraLogic Instance { get; private set; }
        
        private void Awake()
        {
            if (Instance == null)
                Instance = this;
            else
                Destroy(gameObject);
            
            UnlockCursor();
        }

        private void Update()
        {
            if (Input.GetKeyDown(KeyCode.Escape))
            {
                if (IsCursorLocked)
                    UnlockCursor();
                else
                    LockCursor();
            }
        }

        public void LockCursor()
        {
            Cursor.lockState = CursorLockMode.Locked;
            _cross.SetActive(true);
            Cursor.visible = false;
            _cinemachineFreeLook.m_XAxis.m_InputAxisName = "Mouse X";
            _cinemachineFreeLook.m_YAxis.m_InputAxisName = "Mouse Y";
            
            IsCursorLocked = true;
        }
        
        public void UnlockCursor()
        {
            Cursor.lockState = CursorLockMode.None;
            _cross.SetActive(false);
            Cursor.visible = true;
            _cinemachineFreeLook.m_XAxis.m_InputAxisName = "";
            _cinemachineFreeLook.m_YAxis.m_InputAxisName = "";
            _cinemachineFreeLook.m_XAxis.m_InputAxisValue = 0;
            _cinemachineFreeLook.m_YAxis.m_InputAxisValue = 0;
            
            IsCursorLocked = false;
        }
    }
}