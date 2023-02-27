import { httpService } from '@/services/http.service'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { PokemonState } from 'types'

export const usePokemon = () => {
  const router = useRouter()
  const { pokemonId } = router.query
  const [pokemon, setPokemon] = useState<PokemonState>()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (!pokemonId) return
    httpService.get(`pokemon/${pokemonId}`).then((pokemon) => {
      setPokemon(pokemon)
      setLoading(false)
    })
  }, [pokemonId])

  return [pokemon, isLoading] as [PokemonState, boolean]
}
