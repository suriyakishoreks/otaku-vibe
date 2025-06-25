import { useGetAnimeSearchQuery, useGetAnimeSeasonsNowQuery, useGetAnimeSeasonsUpcomingQuery } from "../../services/jikan";
import { LazyMount } from "../../components/atoms/lazy-mount";
import { HorizontalCarousel } from "../../components/widgets/horizontal-carousel";
import Vernac from "../../services/vernac";

function AnimeLandingPage() {
    // TODO: Add duplicate filter in adapter
    return (
        <div>
            <HorizontalCarousel
                heading={Vernac.getVernac('ALP_CURRENT_SEASON_TITLE')}
                type="centered"
                useQueryHook={useGetAnimeSeasonsNowQuery}
                options={{}}
                adapter={(data) => data?.data.map((anime) => ({
                    title: anime.title,
                    imageUrl: anime.images.jpg.image_url,
                    navigateTo: `/anime/${anime.mal_id}`,
                    alt: anime.title,
                })) ?? []}
            />
            <HorizontalCarousel
                heading={Vernac.getVernac('ALP_UPCOMING_SEASON_TITLE')}
                useQueryHook={useGetAnimeSeasonsUpcomingQuery}
                options={{}}
                adapter={(data) => data?.data.map((anime) => ({
                    title: anime.title,
                    imageUrl: anime.images.jpg.image_url,
                    navigateTo: `/manga/${anime.mal_id}`,
                    alt: anime.title,
                })) ?? []}
            />
            <LazyMount estimatedHeight={300}>
                <HorizontalCarousel
                    heading={Vernac.getVernac('ALP_TOP_RATED_TITLE')}
                    useQueryHook={useGetAnimeSearchQuery}
                    options={{ limit: 15, order_by: 'score', sort: 'desc' }}
                    adapter={(data) => data?.data.map((anime) => ({
                        title: anime.title,
                        imageUrl: anime.images.jpg.image_url,
                        navigateTo: `/anime/${anime.mal_id}`,
                        alt: anime.title,
                    })) ?? []}
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