import { z } from 'zod';

const baseMovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number()
});

const genreSchema = z.object({
  id: z.number(),
  name: z.string()
});

const productionCompanySchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string()
});

const productionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string()
});

const spokenLanguageSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string()
});

const movieDetailsSchema = baseMovieSchema.extend({
  belongs_to_collection: z.object({
    id: z.number(),
    name: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable()
  }).nullable(),
  budget: z.number(),
  genres: z.array(genreSchema),
  homepage: z.string(),
  imdb_id: z.string(),
  production_companies: z.array(productionCompanySchema),
  production_countries: z.array(productionCountrySchema),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(spokenLanguageSchema),
  status: z.string(),
  tagline: z.string()
});

const castSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  cast_id: z.number().optional(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number()
});

const crewSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  credit_id: z.string(),
  department: z.string(),
  job: z.string()
});

const movieActorsResponseSchema = z.object({
  id: z.number(),
  cast: z.array(castSchema),
  crew: z.array(crewSchema)
});

const moviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(baseMovieSchema),
  total_pages: z.number(),
  total_results: z.number()
});

const upcomingDatesResponseSchema = z.object({
  maximum: z.string(),
  minimum: z.string()
});

const upcomingResponseSchema = z.object({
  dates: upcomingDatesResponseSchema,
  page: z.number(),
  results: z.array(baseMovieSchema),
  total_pages: z.number(),
  total_results: z.number()
});

export type BaseMovieSchemaType = z.infer<typeof baseMovieSchema>;
export type MovieDetailsSchemaType = z.infer<typeof movieDetailsSchema>;
export type MovieActorsResponseSchemaType = z.infer<typeof movieActorsResponseSchema>;
export type MoviesResponseSchemaType = z.infer<typeof moviesResponseSchema>;
export type UpcomingResponseSchemaType = z.infer<typeof upcomingResponseSchema>;

export {
  moviesResponseSchema,
  upcomingResponseSchema,
  movieDetailsSchema,
  movieActorsResponseSchema
};
