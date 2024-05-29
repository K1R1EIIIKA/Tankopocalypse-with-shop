using System;
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

        protected Rigidbody _rb;
        protected bool _isBroken;

        private void Awake()
        {
            _rb = GetComponent<Rigidbody>();
        }

        private void OnCollisionEnter(Collision other)
        {
            if (!other.gameObject.CompareTag("Bullet")) return;
            if (_isBroken) return;

            TakeDamage(PlayerLogic.Instance.currentStats.Damage);
            if (_health <= 0)
                DestroyTargetWithScore(_score, other);
        }

        public void DestroyTarget(float time)
        {
            Destroy(gameObject, time);
        }

        public virtual void DestroyTargetWithScore(int score, Collision other)
        {
            if (!(other.relativeVelocity.magnitude >= _breakForce)) return;

            _isBroken = true;
            var replacement = Instantiate(_replacement, transform.position, transform.rotation);
            var rbs = replacement.GetComponentsInChildren<Rigidbody>();

            foreach (var rb in rbs)
            {
                rb.AddExplosionForce(other.relativeVelocity.magnitude * _collisionMultiplier, other.contacts[0].point,
                    2);
                
                Destroy(rb.gameObject, Random.Range(3f, 5f));
            }

            ScoreLogic.Instance.AddScore(score);
            var explosion = Instantiate(_explosion, transform.position, Quaternion.identity);
            explosion.transform.rotation = Quaternion.Euler(transform.rotation.eulerAngles.z - 90f, 0, 0);
            explosion.GetComponent<ParticleSystem>().Play();

            Destroy(gameObject);
            Destroy(explosion, 2f);
        }

        public void TakeDamage(int damage)
        {
            _health -= damage;
        }
    }
}