export interface PokemonState extends PokemonBase {
  _id: string
}

export type PokemonBase = {
  name: string
  type: string
  imgUrl: string
  base: {
    [key: string]: number
    HP: number
    Attack: number
    Defense: number
    'Sp. Attack': number
    'Sp. Defense': number
    Speed: number
  }
}

export type PokemonFormInputOptions = {
  Name: string
  Type: string
  HP: number
  Attack: number
  Defense: number
  'Special Attack': number
  'Special Defense': number
  Speed: number
}
