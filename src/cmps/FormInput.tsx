import React from 'react'
import styles from '@/styles/FormInput.module.css'
import { UseFormRegister } from 'react-hook-form'
import { PokemonFormInputOptions } from 'types'

interface FormInputProps {
  register: UseFormRegister<PokemonFormInputOptions>
  error?: string
  inputKey: keyof PokemonFormInputOptions
}

export const FormInput: React.FC<FormInputProps> = ({
  register,
  error,
  inputKey,
}) => {
  return (
    <div className={styles.inputBox}>
      <div className={styles.inputGroup}>
        <input {...register(inputKey)} placeholder=" " />
        <label htmlFor={inputKey}>{inputKey}</label>
      </div>
      <span className={styles.inputHelper}>{error} &nbsp;</span>
    </div>
  )
}
