import Link from 'next/link'
import React from 'react'
import styles from '@/styles/PokemonDetails.module.css'
import { usePokemon } from '@/hooks/usePokemon'
import { Skill } from '@/cmps/Skill'

interface PokemonDetailsProps {}

export const PokemonDetails: React.FC<PokemonDetailsProps> = ({}) => {
  const [pokemon, isLoading] = usePokemon()

  if (isLoading) return <p>Loading...</p>
  if (!pokemon) return <p>No pokemons</p>

  const _skillToPercent = (skill: number) => {
    const MAX_BASE_POKEMON_STAT = 255
    return Math.round((skill / MAX_BASE_POKEMON_STAT) * 100)
  }

  return (
    <section className={styles.pokemonDetails}>
      <Link className={styles.backButton} href="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            fill="currentColor"
            d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"></path>
        </svg>
        Back
      </Link>

      {pokemon ? (
        <article className={styles.pokemonDetailsCard}>
          <img
            className={styles.pokemonImg}
            src={pokemon.imgUrl}
            alt={`${pokemon.name}'s image`}
          />
          <p className={styles.pokemonName}>{pokemon.name}</p>
          <p className={styles.pokemonType}>{pokemon.type}</p>
          {/* <ul>
            <li>HP: {pokemon.base.HP}</li>
            <li>Attack: {pokemon.base.Attack}</li>
            <li>Defense: {pokemon.base.Defense}</li>
            <li>Sp. Attack: {pokemon.base['Sp. Attack']}</li>
            <li>Sp. Defense: {pokemon.base['Sp. Defense']}</li>
            <li>Speed: {pokemon.base.Speed}</li>
          </ul> */}
          <div className="base-skills">
            {Object.keys(pokemon.base).map((skill) => (
              <Skill
                key={skill}
                skillName={skill}
                percent={_skillToPercent(pokemon.base[skill])}
                value={pokemon.base[skill]}
              />
            ))}
          </div>
        </article>
      ) : null}
    </section>
  )
}
export default PokemonDetails
