export const roundRating=(rating: number): number=>{
  return  Math.ceil(rating * 10) / 10;
}

