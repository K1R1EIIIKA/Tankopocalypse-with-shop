using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Lab_2.Scripts.Player
{
    public class PlayerAttack : MonoBehaviour
    {
        private PlayerStats CurrentStats => PlayerLogic.Instance.currentStats;
        [SerializeField] private Transform _gunBarrel;
        [SerializeField] private Transform _bulletSpawnPoint;
        [SerializeField] private GameObject _bulletPrefab;
        [SerializeField] private float _bulletSpeed = 10f;
        
        private bool _canShoot = true;
        
        private void Update()
        {
            if (Input.GetMouseButtonDown(0) && _canShoot)
            {
                Shoot();
            }
        }

        private void Shoot()
        {
            GameObject bullet = Instantiate(_bulletPrefab, transform.position, Quaternion.identity);
            Rigidbody bulletRb = bullet.GetComponent<Rigidbody>();

            Debug.Log(_gunBarrel.up);
            var force = _bulletSpeed * new Vector3(_gunBarrel.up.x * -1 , _gunBarrel.up.y * -1, _gunBarrel.up.z * -1) ;
            bulletRb.AddForce(force, ForceMode.Impulse); 
            
            StartCoroutine(ShootCooldown());
        }

        private IEnumerator ShootCooldown()
        {
            _canShoot = false;
            yield return new WaitForSeconds(1 / CurrentStats.AttackSpeed);
            _canShoot = true;
        }
    }
}