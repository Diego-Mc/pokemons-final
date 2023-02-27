import React from 'react'
import styles from '@/styles/Skill.module.css'

interface SkillProps {
  skillName: string
  percent: number
  value: number
}

export const Skill: React.FC<SkillProps> = ({ skillName, percent, value }) => {
  return (
    <div className={styles.skill}>
      <div className={styles.skillName}>{skillName}</div>
      <div className={styles.skillLevel}>
        <div
          className={styles.skillPercent}
          style={{ width: `${percent}%` }}></div>
      </div>
      <div className={styles.skillPercentNumber}>{value}</div>
    </div>
  )
}
