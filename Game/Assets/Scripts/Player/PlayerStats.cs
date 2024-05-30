using System;

namespace Lab_2.Scripts.Player
{
    [Serializable]
    public class PlayerStats
    {
        public int CurrentHealth;
        public int Health;
        public int MaxHealth;
        public float Speed;
        public int Damage;
        public float AttackSpeed;

        public PlayerStats(int health, float speed, int damage, float attackSpeed)
        {
            Health = health;
            MaxHealth = health;
            CurrentHealth = health;
            Speed = speed;
            Damage = damage;
            AttackSpeed = attackSpeed;
        }
        
        public PlayerStats Clone()
        {
            return new PlayerStats(Health, Speed, Damage, AttackSpeed);
        }
        
        public void TakeDamage(int damage)
        {
            CurrentHealth -= damage;
            if (CurrentHealth < 0)
                CurrentHealth = 0;
        }
    }
}