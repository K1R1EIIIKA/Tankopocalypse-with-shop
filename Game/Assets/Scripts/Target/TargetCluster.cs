using UnityEngine;

namespace Lab_2.Scripts.Target
{
    public class TargetCluster : MonoBehaviour
    {
        [SerializeField] private Target[] _targets;

        public bool IsAllBrokenTargets()
        {
            foreach (var target in _targets)
            {
                if (target.IsBroken == false)
                    return false;
            }
            
            return true;
        }
    }
}