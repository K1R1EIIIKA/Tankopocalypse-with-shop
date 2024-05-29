using System;
using UnityEngine;

namespace Lab_2.Scripts.Player
{
    public class BulletExplosion : MonoBehaviour
    {
        [SerializeField] private ParticleSystem _explosion;

        private void OnCollisionEnter(Collision other)
        {
            Explode();
        }

        private void Explode()
        {
            _explosion.Play();
            
            transform.GetComponent<Renderer>().enabled = false;
            transform.GetComponent<Rigidbody>().velocity = Vector3.zero;
            transform.GetComponent<Rigidbody>().useGravity = false;
            transform.GetComponent<Collider>().enabled = false;
            
            Destroy(gameObject, 2f);
        }

        private void Update()
        {
            if (transform.position.y < -20)
                Destroy(gameObject);
        }
    }
}