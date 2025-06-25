import { useGetTopAnimeQuery, useGetTopMangaQuery, useGetTopCharactersQuery, useGetTopPeopleQuery } from "../../services/jikan";
import { LazyMount } from "../../components/atoms/lazy-mount";
import { HorizontalCarousel } from "../../components/widgets/horizontal-carousel";
import Vernac from "../../services/vernac";

function HomePage() {
    return (
        <div>
            <HorizontalCarousel
                heading={Vernac.getVernac('HP_TOP_ANIME_TITLE')}
                type="centered"
                useQueryHook={useGetTopAnimeQuery}
                options={{}}
                adapter={(data) => data?.data.map((anime) => ({
                    title: anime.title,
                    imageUrl: anime.images.jpg.image_url,
                    navigateTo: `/anime/${anime.mal_id}`,
                    alt: anime.title,
                })) ?? []}
            />
            <HorizontalCarousel
                heading={Vernac.getVernac('HP_TOP_MANGA_TITLE')}
                useQueryHook={useGetTopMangaQuery}
                options={{}}
                adapter={(data) => data?.data.map((manga) => ({
                    title: manga.title,
                    imageUrl: manga.images.jpg.image_url,
                    navigateTo: `/manga/${manga.mal_id}`,
                    alt: manga.title,
                })) ?? []}
            />
            <LazyMount estimatedHeight={300}>
                <HorizontalCarousel
                    heading={Vernac.getVernac('HP_TOP_CHARACTER_TITLE')}
                    useQueryHook={useGetTopCharactersQuery}
                    options={{}}
                    adapter={(data) => data?.data.map((character) => ({
                        title: character.name,
                        imageUrl: character.images.jpg.image_url,
                        navigateTo: `/character/${character.mal_id}`,
                        alt: character.name,
                    })) ?? []}
                />
            </LazyMount>
            <LazyMount estimatedHeight={300}>
                <HorizontalCarousel
                    heading={Vernac.getVernac('HP_TOP_PEOPLE_TITLE')}
                    useQueryHook={useGetTopPeopleQuery}
                    options={{}}
                    adapter={(data) => data?.data.map((person) => ({
                        title: person.name,
                        imageUrl: person.images.jpg.image_url,
                        navigateTo: `/person/${person.mal_id}`,
                        alt: person.name,
                    })) ?? []}
                />
            </LazyMount>
        </div>
    );
}

export default HomePage;