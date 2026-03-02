import { z } from 'zod'

export const validateResponse = <T>(schema: z.ZodSchema<T>) => {
  return (response: unknown): T => {
    try {
      return schema.parse(response)
    } catch (error) {
      console.error('API Validation error:', error)
      throw error
    }
  }
}