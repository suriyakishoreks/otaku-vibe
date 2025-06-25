import { useGetAnimeSeasonsNowQuery, useGetTopAnimeQuery, useGetTopMangaQuery, useGetAnimeSeasonsUpcomingQuery } from "../../services/jikan";
import { LazyMount } from "../../components/atoms/lazy-mount";
import { HorizontalCarousel } from "../../components/widgets/horizontal-carousel";

function MangaLandingPage() {

    return (
        <div>
            <LazyMount estimatedHeight={300}>
                <HorizontalCarousel
                    useQueryHook={useGetTopAnimeQuery}
                    options={{}}
                    adapter={(data) => data?.data.map((anime) => ({
                        title: anime.title,
                        imageUrl: anime.images.jpg.image_url,
                        navigateTo: `/anime/${anime.mal_id}`,
                        alt: anime.title,
                    })) ?? []}
                />
            </LazyMount>
            <LazyMount estimatedHeight={300}>
                <HorizontalCarousel
                    useQueryHook={useGetTopMangaQuery}
                    options={{}}
                    adapter={(data) => data?.data.map((anime) => ({
                        title: anime.title,
                        imageUrl: anime.images.jpg.image_url,
                        navigateTo: `/manga/${anime.mal_id}`,
                        alt: anime.title,
                    })) ?? []}
                />
            </LazyMount>
            <LazyMount estimatedHeight={300}>
                <HorizontalCarousel
                    useQueryHook={useGetAnimeSeasonsNowQuery}
                    options={{}}
                    adapter={(data) => data?.data.map((anime) => ({
                        title: anime.title,
                        imageUrl: anime.images.jpg.image_url,
                        navigateTo: `/anime/${anime.mal_id}`,
                        alt: anime.title,
                    })) ?? []}
                />
            </LazyMount>
            <LazyMount estimatedHeight={300}>
                <HorizontalCarousel
                    useQueryHook={useGetAnimeSeasonsUpcomingQuery}
                    options={{}}
                    adapter={(data) => data?.data.map((anime) => ({
                        title: anime.title,
                        imageUrl: anime.images.jpg.image_url,
                        navigateTo: `/anime/${anime.mal_id}`,
                        alt: anime.title,
                    })) ?? []}
                />
            </LazyMount>
        </div>
    );
}

export default MangaLandingPage;