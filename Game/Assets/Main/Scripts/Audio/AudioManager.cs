using System;
using UnityEngine;

namespace Lab_2.Scripts.Audio
{
    public class AudioManager : MonoBehaviour
    {
        public Sound[] sounds;

        public static AudioManager Instance;

        private void Awake()
        {
            if (Instance == null)
                Instance = this;
            else
            {
                Destroy(gameObject);
                return;
            }

            DontDestroyOnLoad(gameObject);

            foreach (Sound sound in sounds)
            {
                sound.source = gameObject.AddComponent<AudioSource>();
                sound.source.clip = sound.clip;
                sound.source.pitch = sound.pitch;
                sound.source.loop = sound.loop;
            }
        }

        private Sound FindSound(string soundName)
        {
            return Array.Find(sounds, s => s.name == soundName);
        }

        public void Play(string soundName)
        {
            Sound sound = FindSound(soundName);
            if (sound == null)
            {
                Debug.LogWarning($"Sound with name {soundName} not found!");
                return;
            }

            sound.source.Play();
        }

        public bool IsPlaying(string soundName)
        {
            Sound sound = FindSound(soundName);
            if (sound == null)
                return false;

            return sound.source.isPlaying;
        }

        public void Stop(string soundName)
        {
            Sound sound = FindSound(soundName);
            if (sound == null)
                return;

            sound.source.Stop();
        }
    }
}