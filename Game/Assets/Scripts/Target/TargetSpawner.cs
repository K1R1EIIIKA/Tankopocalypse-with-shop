using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

namespace Lab_2.Scripts.Target
{
    public class TargetSpawner : MonoBehaviour
    {
        [SerializeField] private List<TargetCluster> _targetClusters;
        [SerializeField] private List<Transform> _spawnPoints;
        [SerializeField] private float _spawnInterval = 2;

        private void Start()
        {
            StartCoroutine(SpawnTargets());
        }

        private IEnumerator SpawnTargets()
        {
            while (true)
            {
                int randomIndex = Random.Range(0, _targetClusters.Count);

                var spawnPoint = _spawnPoints[randomIndex];

                if (spawnPoint.childCount == 0)
                {
                    Instantiate(_targetClusters[randomIndex], spawnPoint.position, spawnPoint.rotation, spawnPoint);

                    yield return new WaitForSeconds(_spawnInterval);
                }
                else if (spawnPoint.GetChild(0).childCount == 0)
                {
                    Destroy(spawnPoint.GetChild(0).gameObject);
                    Instantiate(_targetClusters[randomIndex], spawnPoint.position, spawnPoint.rotation, spawnPoint);

                    yield return new WaitForSeconds(_spawnInterval);
                }
                
                yield return new WaitForSeconds(0.5f);
            }
        }
    }
}