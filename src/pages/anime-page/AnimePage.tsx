import { useParams } from "react-router";
import { useGetAnimeByIdQuery } from "../../services/jikan";
import { MediaContent } from "../../components/widgets/media-content";
import { formatThresholdNumber } from "../../shared/util";

function AnimePage() {
    const { id } = useParams();

    return (
        <div>
            <MediaContent
                useQueryHook={useGetAnimeByIdQuery}
                options={{ id: Number(id) }}
                adapter={(data) => {
                    return (
                        {
                            imageAlt: data.data.mal_id.toString(),
                            imageSrc: data.data.images.webp?.large_image_url ?? data.data.images.jpg.large_image_url ?? data.data.images.jpg.image_url,
                            title: data.data.titles.find((title) => title.type === 'Default')?.title ?? data.data.title,
                            // TODO: add jap title
                            titleEnglish: data.data.titles.find((title) => title.type === 'English')?.title ?? data.data.title_english,
                            contentType: data.data.type,
                            mediaStats: {
                                rank: data.data.rank ? `Rank #${data.data.rank}` : undefined,
                                popularity: data.data.popularity ? `Popularity #${data.data.popularity}` : undefined,
                                favorite: data.data.favorites ? `${formatThresholdNumber(data.data.favorites)} Favorites` : undefined,
                                rating: data.data.score ? `${data.data.score} | ${formatThresholdNumber(data.data.scored_by)} Ratings` : undefined,
                                listed: data.data.members ? `${formatThresholdNumber(data.data.members)} Read Lists` : undefined
                            },
                            summary: data.data.synopsis ?? 'NA',
                            genres: data.data.genres.map((genre) => genre.name),
                        }
                    );
                }}
            />
        </div>
    );

}

export default AnimePage;