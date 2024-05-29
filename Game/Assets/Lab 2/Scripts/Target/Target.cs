using System;
using Lab_2.Scripts.UI;
using UnityEngine;
using Random = UnityEngine.Random;

namespace Lab_2.Scripts.Target
{
    public abstract class Target : MonoBehaviour
    {
        [SerializeField] protected ParticleSystem _explosion;
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

            TakeDamage(1);
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
            _explosion.Play();

            Destroy(gameObject);
        }

        public void TakeDamage(int damage)
        {
            _health -= damage;
        }
    }
}