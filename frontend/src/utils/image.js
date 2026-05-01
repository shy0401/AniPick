export const PLACEHOLDER_POSTER = 'https://placehold.co/300x420/d9d9d9/777777?text=AniPick';
export const PLACEHOLDER_BANNER = 'https://placehold.co/1200x360/d9d9d9/777777?text=AniPick';

export function getAnimePoster(anime) {
  if (!anime) return null;
  return (
    anime.coverImage?.extraLarge ||
    anime.coverImage?.large ||
    anime.coverImage?.medium ||
    anime.animeImage ||
    anime.imageUrl ||
    null
  );
}

export function getAnimeBanner(anime) {
  if (!anime) return null;
  return anime.bannerImage || anime.coverImage?.extraLarge || anime.coverImage?.large || anime.imageUrl || null;
}
