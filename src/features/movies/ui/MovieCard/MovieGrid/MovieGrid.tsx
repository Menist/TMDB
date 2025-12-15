import type {BaseMovieSchemaType} from "../../../../../shared/api/schemas";

type MovieGridProps= {
  movies: BaseMovieSchemaType
}

export const MovieGrid=({movies}:MovieGridProps)=>{
  console.log(movies)
}
