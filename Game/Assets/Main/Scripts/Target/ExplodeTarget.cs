using UnityEngine;

namespace Lab_2.Scripts.Target
{
    public class ExplodeTarget : Target
    {
        [SerializeField] private Collider _explodeCollider;
        
        protected override void CustomDestroy(Collision other)
        {
            _explodeCollider.enabled = true;
        }
    }
}