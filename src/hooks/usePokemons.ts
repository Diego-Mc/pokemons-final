import { httpService } from '@/services/http.service'
import { useEffect, useState } from 'react'
import { PokemonState } from 'types'

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState<PokemonState[]>()
  const [isLoading, setLoading] = useState(false)

  const trigger = () =>
    httpService.get('pokemon').then((pokemons: PokemonState[]) => {
      setPokemons(pokemons)
      setLoading(false)
    })

  useEffect(() => {
    if (pokemons) return
    setLoading(true)
    trigger()
  }, [])

  return [pokemons, isLoading, trigger] as [PokemonState[], boolean, () => void]
}
