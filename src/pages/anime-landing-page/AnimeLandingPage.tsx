import { useGetAnimeSearchQuery, useGetAnimeSeasonsNowQuery, useGetAnimeSeasonsUpcomingQuery } from "../../services/jikan";
import { LazyMount } from "../../components/atoms/lazy-mount";
import { HorizontalCarousel } from "../../components/widgets/horizontal-carousel";
import Vernac from "../../services/vernac";
import { filterDuplicates, formatThresholdNumber } from "../../shared/util";

function AnimeLandingPage() {
    // TODO: Add duplicate filter in adapter
    return (
        <div>
            <HorizontalCarousel
                heading={Vernac.getVernac('ALP_CURRENT_SEASON_TITLE')}
                type="centered"
                cardType="media-detail"
                useQueryHook={useGetAnimeSeasonsNowQuery}
                options={{}}
                adapter={(data) => filterDuplicates(data.data.map((anime) => ({
                    key: anime.mal_id.toString(),
                    title: anime.title,
                    imageUrl: anime.images.jpg.image_url,
                    navigateTo: `/anime/${anime.mal_id}`,
                    alt: anime.title,
                    ratings: anime.score?.toString(),
                    favorites: formatThresholdNumber(anime.favorites),
                    summary: anime.synopsis,
                    status: anime.status,
                    genres: anime.genres.map((genre) => genre.name).slice(0, 5)
                })), 'key')}
            />
            <HorizontalCarousel
                heading={Vernac.getVernac('ALP_UPCOMING_SEASON_TITLE')}
                useQueryHook={useGetAnimeSeasonsUpcomingQuery}
                options={{}}
                adapter={(data) => filterDuplicates(data.data.map((anime) => ({
                    key: anime.mal_id.toString(),
                    title: anime.title,
                    imageUrl: anime.images.jpg.image_url,
                    navigateTo: `/anime/${anime.mal_id}`,
                    alt: anime.title,
                    ratings: anime.score?.toString(),
                    favorites: formatThresholdNumber(anime.favorites)
                })), 'key')}
            />
            <LazyMount estimatedHeight={359}>
                <HorizontalCarousel
                    heading={Vernac.getVernac('ALP_TOP_RATED_TITLE')}
                    useQueryHook={useGetAnimeSearchQuery}
                    options={{ limit: 15, order_by: 'score', sort: 'desc' }}
                    adapter={(data) => filterDuplicates(data.data.map((anime) => ({
                        key: anime.mal_id.toString(),
                        title: anime.title,
                        imageUrl: anime.images.jpg.image_url,
                        navigateTo: `/anime/${anime.mal_id}`,
                        alt: anime.title,
                        ratings: anime.score?.toString(),
                        favorites: formatThresholdNumber(anime.favorites)
                    })), 'key')}
                />
            </LazyMount>
            {/* <LazyMount estimatedHeight={300}>
                <HorizontalCarousel
                    heading={Vernac.getVernac('ALP_RECOMMENDATION_TITLE')}
                    useQueryHook={useGetAnimeSeasonsUpcomingQuery}
                    options={{}}
                    adapter={(data) => data?.data.map((anime) => ({
                        title: anime.title,
                        imageUrl: anime.images.jpg.image_url,
                        navigateTo: `/anime/${anime.mal_id}`,
                        alt: anime.title,
                    })) ?? []}
                />
            </LazyMount> */}
        </div>
    );
    // TODO: Add recommendation and Add weekly schedule here
}

export default AnimeLandingPage;