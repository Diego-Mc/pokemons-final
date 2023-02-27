import { usePokemons } from '@/hooks/usePokemons'
import { PokemonsList } from '../cmps/PokemonsList'
import styles from '@/styles/Home.module.css'

export default function Home() {
  const [pokemons, isLoading, trigger] = usePokemons()

  if (isLoading) return <p>Loading...</p>
  if (!pokemons) return <p>No pokemons</p>

  return (
    <main className={styles.home}>
      <h2 className={styles.title}>Pokemons List</h2>
      {pokemons ? <PokemonsList pokemons={pokemons} /> : null}
      <button className={styles.refreshBtn} onClick={() => trigger()}>
        Refresh
      </button>
    </main>
  )
}
