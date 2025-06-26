import { useGetTopAnimeQuery, useGetTopMangaQuery, useGetTopCharactersQuery, useGetTopPeopleQuery } from "../../services/jikan";
import { LazyMount } from "../../components/atoms/lazy-mount";
import { HorizontalCarousel } from "../../components/widgets/horizontal-carousel";
import Vernac from "../../services/vernac";
import { formatThresholdNumber } from "../../shared/util";

function HomePage() {
    return (
        <div>
            <HorizontalCarousel
                heading={Vernac.getVernac('HP_TOP_ANIME_TITLE')}
                type="centered"
                cardType="media-detail"
                useQueryHook={useGetTopAnimeQuery}
                options={{}}
                adapter={(data) => data.data.map((anime) => ({
                    key: anime.mal_id.toString(),
                    title: anime.title,
                    imageUrl: anime.images.webp?.image_url ?? anime.images.jpg.image_url,
                    navigateTo: `/anime/${anime.mal_id}`,
                    alt: anime.title,
                    ratings: anime.score?.toString(),
                    favorites: formatThresholdNumber(anime.favorites),
                    summary: anime.synopsis,
                    status: anime.status,
                    genres: anime.genres.map((genre) => genre.name).slice(0, 5)
                }))}
            />
            <HorizontalCarousel
                heading={Vernac.getVernac('HP_TOP_MANGA_TITLE')}
                useQueryHook={useGetTopMangaQuery}
                options={{}}
                adapter={(data) => data.data.map((manga) => ({
                    key: manga.mal_id.toString(),
                    title: manga.title,
                    imageUrl: manga.images.webp?.image_url ?? manga.images.jpg.image_url,
                    navigateTo: `/manga/${manga.mal_id}`,
                    alt: manga.title,
                    ratings: manga.score?.toString(),
                    favorites: formatThresholdNumber(manga.favorites)
                }))}
            />
            <LazyMount estimatedHeight={359}>
                <HorizontalCarousel
                    heading={Vernac.getVernac('HP_TOP_CHARACTER_TITLE')}
                    useQueryHook={useGetTopCharactersQuery}
                    options={{}}
                    adapter={(data) => data.data.map((character) => ({
                        key: character.mal_id.toString(),
                        title: character.name,
                        imageUrl: character.images.webp?.image_url ?? character.images.jpg.image_url,
                        navigateTo: `/character/${character.mal_id}`,
                        alt: character.name,
                        favorites: formatThresholdNumber(character.favorites)
                    }))}
                />
            </LazyMount>
            <LazyMount estimatedHeight={359}>
                <HorizontalCarousel
                    heading={Vernac.getVernac('HP_TOP_PEOPLE_TITLE')}
                    useQueryHook={useGetTopPeopleQuery}
                    options={{}}
                    adapter={(data) => data.data.map((person) => ({
                        key: person.mal_id.toString(),
                        title: person.name,
                        imageUrl: person.images.webp?.image_url ?? person.images.jpg.image_url,
                        navigateTo: `/person/${person.mal_id}`,
                        alt: person.name,
                        favorites: formatThresholdNumber(person.favorites)
                    }))}
                />
            </LazyMount>
        </div>
    );
}

export default HomePage;