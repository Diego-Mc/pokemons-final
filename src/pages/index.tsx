import { usePokemons } from '@/hooks/usePokemons'
import { PokemonsList } from '../cmps/PokemonsList'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Home() {
  const [pokemons, isLoading, trigger] = usePokemons()

  const router = useRouter()

  if (isLoading) return <p>Loading...</p>
  if (!pokemons) return <p>No pokemons</p>

  return (
    <main className={styles.home}>
      <h2 className="title">Pokemons List</h2>
      <PokemonsList pokemons={pokemons} />
      <section className={styles.btns}>
        <button className="customBtn" onClick={() => trigger()}>
          Refresh
        </button>
        <button className="customBtn" onClick={() => router.push('/edit')}>
          + &nbsp;Create a new Pokemon
        </button>
      </section>
    </main>
  )
}
