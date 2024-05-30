using System;
using Cinemachine;
using Lab_2.Scripts.Api.Lab_2.Scripts;
using Lab_2.Scripts.UI;
using UnityEngine;

namespace Lab_2.Scripts.Player
{
    public class PlayerLogic : MonoBehaviour
    {
        public PlayerStats currentStats;
        public PlayerStats baseStats;

        public float rotationSpeed = 10f;

        private Animator _animator;
        private Camera _camera;
        [SerializeField] private Transform _gunBarrel;

        public static PlayerLogic Instance { get; private set; }

        private void Awake()
        {
            if (Instance == null)
                Instance = this;
            else
                Destroy(gameObject);

            _animator = GetComponent<Animator>();
            _camera = Camera.main;
        }

        private void Start()
        {
            currentStats = baseStats.Clone();

            Debug.Log(UserInfoManager.IsAuthorized);
            if (UserInfoManager.IsAuthorized)
                LoginPanel.Instance.OpenUserPanel();
        }

        private void Update()
        {
            Move();
            
            if (CameraLogic.Instance.IsCursorLocked)
                Rotate();
        }

        private void Move()
        {
            Vector3 direction = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
            transform.Translate(direction * (currentStats.Speed * Time.deltaTime));

            if (direction != Vector3.zero)
            {
                _animator.SetBool("IsMoving", true);
            }

            if (direction == Vector3.zero)
            {
                _animator.SetBool("IsMoving", false);
            }
        }

        private void Rotate()
        {
            var cameraRotation = _camera.transform.rotation;
            cameraRotation.x = 0;
            cameraRotation.z = 0;
            transform.rotation = Quaternion.Slerp(transform.rotation, cameraRotation, rotationSpeed * Time.deltaTime);

            _gunBarrel.rotation = Quaternion.Euler(_camera.transform.rotation.eulerAngles.x - 105f,
                transform.rotation.eulerAngles.y, 0f);
        }
    }
}