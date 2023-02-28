import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'

export const useGeneratePokemonImg = () => {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)
  const [isFetching, setIsFetching] = useState(false)

  const generate = async () => {
    try {
      setIsFetching(true)
      const response = await openai.createImage({
        prompt: 'A cool pokemon style character on a white background',
        n: 1,
        size: '512x512',
      })
      return response?.data?.data?.[0]?.url
    } catch (error) {
      console.log('err', error)
    } finally {
      setIsFetching(false)
    }
  }

  return [generate, isFetching] as [() => Promise<string | undefined>, boolean]
}
