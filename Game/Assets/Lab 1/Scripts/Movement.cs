using System;
using UnityEngine;

namespace Lab_1.Scripts
{
    public class Movement : MonoBehaviour
    {
        [SerializeField] private float _speed = 5.0f;
        
        private Rigidbody _rb;

        private void Awake()
        {
            _rb = GetComponent<Rigidbody>();
        }
        
        private void Update()
        {
            Move();
        }
        
        private void Move()
        {
            transform.position += new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical")) * (_speed * Time.deltaTime);
        }
    }
}
