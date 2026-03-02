import {z} from 'zod'

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  overview: z.string(),
  release_date: z.string()
})

export type Movie = z.infer<typeof MovieSchema>

export const PopularMoviesResponseSchema = z.object({
  results: z.array(MovieSchema),
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number()
})

export type PopularMoviesResponse = z.infer<typeof PopularMoviesResponseSchema>
export const GenreSchema = z.object({
  id: z.number(),
  name: z.string()
})

export type Genre = z.infer<typeof GenreSchema>

export const MovieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  overview: z.string(),
  release_date: z.string(),
  runtime: z.number().nullable(),
  genres: z.array(GenreSchema),
  tagline: z.string().nullable(),
  budget: z.number(),
  revenue: z.number()
})

export type MovieDetails = z.infer<typeof MovieDetailsSchema>

export const ActorSchema = z.object({
  id: z.number(),
  name: z.string(),
  profile_path: z.string().nullable(),
  character: z.string()
})

export const CreditsSchema = z.object({
  cast: z.array(ActorSchema)
})

export type Credits = z.infer<typeof CreditsSchema>

export const GenresResponseSchema = z.object({
  genres: z.array(GenreSchema)
})

export type GenresResponse = z.infer<typeof GenresResponseSchema>