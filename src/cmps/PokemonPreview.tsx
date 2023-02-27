import React, { useState } from 'react'
import { PokemonState } from 'types'
import styles from '@/styles/PokemonPreview.module.css'

interface PokemonPreviewProps {
  pokemon: PokemonState
}

export const PokemonPreview: React.FC<PokemonPreviewProps> = ({ pokemon }) => {
  const [src, setSrc] = useState(pokemon.imgUrl)

  return (
    <article className={styles.pokemonPreview}>
      <img
        className={styles.pokemonImg}
        src={src}
        alt={`${pokemon.name}'s image`}
        onError={() =>
          setSrc(
            'https://res.cloudinary.com/wewix/image/upload/v1677462085/default-pokemon_sx06co.png'
          )
        }
      />
      <p className={styles.pokemonName}>{pokemon.name}</p>
    </article>
  )
}
export default PokemonPreview
