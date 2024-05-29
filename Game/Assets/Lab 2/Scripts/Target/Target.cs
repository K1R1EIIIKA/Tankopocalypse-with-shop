using System;
using Lab_2.Scripts.Audio;
using Lab_2.Scripts.Player;
using Lab_2.Scripts.UI;
using UnityEngine;
using Random = UnityEngine.Random;

namespace Lab_2.Scripts.Target
{
    public abstract class Target : MonoBehaviour
    {
        [SerializeField] protected GameObject _explosion;
        [SerializeField] private GameObject _replacement;
        [SerializeField] protected float _breakForce = 2f;
        [SerializeField] protected float _collisionMultiplier = 100f;
        [SerializeField] protected int _health = 1;
        [SerializeField] protected int _score = 10;
        
        [SerializeField] private string _soundName;

        protected bool _isBroken;

        private void OnCollisionEnter(Collision other)
        {
            if (!other.gameObject.CompareTag("Bullet")) return;
            if (_isBroken) return;

            TakeDamage(PlayerLogic.Instance.currentStats.Damage);
            AudioManager.Instance.Play(_soundName);
            if (_health <= 0)
                DestroyTargetWithBullet(other);
        }

        private void OnTriggerEnter(Collider other)
        {
            if (!other.gameObject.CompareTag("ExplodeTarget")) return;
            Debug.Log(other.gameObject.name + " " + gameObject.name);
            if (_isBroken) return;
            
            DestroyTargetWithExplosion(other);
        }

        public void DestroyTarget(float time)
        {
            Destroy(gameObject, time);
        }

        protected abstract void CustomDestroy(Collision other);

        private void DestroyTargetWithBullet(Collision other)
        {
            if (!(other.relativeVelocity.magnitude >= _breakForce)) return;

            _isBroken = true;

            CustomDestroy(other);

            var replacement = Instantiate(_replacement, transform.position, transform.rotation);
            var rbs = replacement.GetComponentsInChildren<Rigidbody>();

            foreach (var rb in rbs)
            {
                rb.AddExplosionForce(other.relativeVelocity.magnitude * _collisionMultiplier, other.contacts[0].point,
                    2);

                Destroy(rb.gameObject, Random.Range(3f, 5f));
            }

            ScoreLogic.Instance.AddScore(_score);
            var explosion = Instantiate(_explosion, transform.position, Quaternion.identity);
            explosion.transform.rotation = Quaternion.Euler(transform.rotation.eulerAngles.z - 90f, 0, 0);

            explosion.GetComponent<ParticleSystem>().Play();

            Destroy(replacement, 5f);
            Destroy(gameObject.transform.parent.gameObject, 0.05f);
            Destroy(explosion, 2f);
        }
        
        private void DestroyTargetWithExplosion(Collider other)
        {
            _isBroken = true;

            CustomDestroy(new Collision());

            var replacement = Instantiate(_replacement, transform.position, transform.rotation);
            var rbs = replacement.GetComponentsInChildren<Rigidbody>();

            foreach (var rb in rbs)
            {
                rb.AddExplosionForce(1000, other.transform.position, 3);

                Destroy(rb.gameObject, Random.Range(3f, 5f));
            }

            ScoreLogic.Instance.AddScore(_score * 2);
            var explosion = Instantiate(_explosion, transform.position, Quaternion.identity);
            explosion.transform.rotation = Quaternion.Euler(transform.rotation.eulerAngles.z - 90f, 0, 0);

            explosion.GetComponent<ParticleSystem>().Play();

            Destroy(replacement, 5f);
            Destroy(gameObject.transform.parent.gameObject, 0.05f);
            Destroy(explosion, 2f);
        }

        private void TakeDamage(int damage)
        {
            _health -= damage;
        }
    }
}