import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import React, { useState } from 'react'
import { FormInput } from '@/cmps/FormInput'
import styles from '@/styles/Edit.module.css'
import { useGeneratePokemonImg } from '@/hooks/useGeneratePokemonImg'
import { httpService } from '@/services/http.service'
import { useRouter } from 'next/router'
import Link from 'next/link'

const yupSchemaObj = {
  Name: yup.string().required(),
  Type: yup.string().required(),
  HP: yup.number().positive().integer().min(1).max(255).required(),
  Attack: yup.number().positive().integer().min(1).max(255).required(),
  Defense: yup.number().positive().integer().min(1).max(255).required(),
  'Special Attack': yup
    .number()
    .positive()
    .integer()
    .min(1)
    .max(255)
    .required(),
  'Special Defense': yup
    .number()
    .positive()
    .integer()
    .min(1)
    .max(255)
    .required(),
  Speed: yup.number().positive().integer().min(1).max(255).required(),
}

const schema = yup.object(yupSchemaObj).required()
type PokemonFormData = yup.InferType<typeof schema>

export const Edit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PokemonFormData>({
    resolver: yupResolver(schema),
  })

  const router = useRouter()

  const onSubmit = async (data: PokemonFormData) => {
    //Ideally would be a function in a PokemonService
    const resFormat = {
      imgUrl: src,
      name: {
        english: data.Name,
      },
      type: [data.Type],
      base: {
        HP: data.HP,
        Attack: data.Attack,
        Defense: data.Defense,
        'Sp. Attack': data['Special Attack'],
        'Sp. Defense': data['Special Defense'],
        Speed: data.Speed,
      },
    }

    const pokemon = await httpService.post(`pokemon`, resFormat)

    router.push(`/pokemon/${pokemon._id}`)
  }

  const [src, setSrc] = useState(
    'https://res.cloudinary.com/wewix/image/upload/v1677462085/default-pokemon_sx06co.png'
  )

  const [generateImg, isFetching] = useGeneratePokemonImg()

  const handleGenerateImage = async () => {
    const imgUrl = await generateImg()
    if (imgUrl) setSrc(imgUrl)
  }

  return (
    <section className={styles.editView}>
      <div className={styles.header}>
        <Link className="backButton" href="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"></path>
          </svg>
          Back
        </Link>
      </div>

      <div className={styles.formWrapper}>
        <section className={styles.imgSection}>
          {src ? <img src={src} alt="A pokemon image!" /> : null}
          {isFetching ? 'generating...' : null}
          <button className="customBtn" onClick={handleGenerateImage}>
            Generate pokemon image
          </button>
        </section>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {(Object.keys(yupSchemaObj) as Array<keyof typeof yupSchemaObj>).map(
            (key) => (
              <FormInput
                key={key}
                register={register}
                inputKey={key}
                error={errors[key]?.message}
              />
            )
          )}

          <input className="customBtn" type="submit" />
        </form>
      </div>
    </section>
  )
}
export default Edit
