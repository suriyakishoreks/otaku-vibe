import { useGetTopMangaQuery } from "../../services/jikan";
import { LazyMount } from "../../components/atoms/lazy-mount";
import { HorizontalCarousel } from "../../components/widgets/horizontal-carousel";
import Vernac from "../../services/vernac";

function MangaLandingPage() {

    return (
        <div>
            <HorizontalCarousel
                heading={Vernac.getVernac('MLP_TRENDING_MANGA_TITLE')}
                type="centered"
                useQueryHook={useGetTopMangaQuery}
                options={{ type: 'Manga' }}
                adapter={(data) => data?.data.map((manga) => ({
                    title: manga.title,
                    imageUrl: manga.images.jpg.image_url,
                    navigateTo: `/manga/${manga.mal_id}`,
                    alt: manga.title,
                })) ?? []}
            />
            <HorizontalCarousel
                heading={Vernac.getVernac('MLP_TRENDING_MANHWA_TITLE')}
                useQueryHook={useGetTopMangaQuery}
                options={{ type: 'Manhwa' }}
                adapter={(data) => data?.data.map((manga) => ({
                    title: manga.title,
                    imageUrl: manga.images.jpg.image_url,
                    navigateTo: `/manga/${manga.mal_id}`,
                    alt: manga.title,
                })) ?? []}
            />
            <LazyMount estimatedHeight={300}>
                <HorizontalCarousel
                    heading={Vernac.getVernac('MLP_TRENDING_MANHUA_TITLE')}
                    useQueryHook={useGetTopMangaQuery}
                    options={{ type: 'Manhua' }}
                    adapter={(data) => data?.data.map((manga) => ({
                        title: manga.title,
                        imageUrl: manga.images.jpg.image_url,
                        navigateTo: `/manga/${manga.mal_id}`,
                        alt: manga.title,
                    })) ?? []}
                />
            </LazyMount>
            {/* <LazyMount estimatedHeight={300}>
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
            </LazyMount> */}
        </div>
    );

    // TODO: Manga reco
}

export default MangaLandingPage;