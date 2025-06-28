import { useParams } from "react-router";
import { useGetPersonByIdQuery } from "../../services/jikan";
import { MediaContent } from "../../components/widgets/media-content";
import { formatThresholdNumber } from "../../shared/util";

function PersonPage() {
    const { id } = useParams();

    return (
        <div>
            <MediaContent
                useQueryHook={useGetPersonByIdQuery}
                options={{ id: Number(id) }}
                adapter={(data) => {
                    return (
                        {
                            imageAlt: data.data.mal_id.toString(),
                            imageSrc: data.data.images.webp?.large_image_url ?? data.data.images.jpg.large_image_url ?? data.data.images.jpg.image_url,
                            title: data.data.name,
                            mediaStats: {
                                favorite: data.data.favorites ? `${formatThresholdNumber(data.data.favorites)} Favorites` : undefined,
                            },
                            summary: data.data.about ?? 'NA',
                            primaryContentGroup: data.data.anime ? {
                                title: 'Anime',
                                group: data.data.anime.map((entry) => { return { title: entry.anime.title, desc: entry.position, link: `/anime/${entry.anime.mal_id}`, imgSrc: entry.anime.images.webp?.image_url ?? entry.anime.images.jpg.image_url }; })
                            } : undefined,
                            secondaryContentGroup: data.data.manga ? {
                                title: 'Manga',
                                group: data.data.manga.map((entry) => { return { title: entry.manga.title, desc: entry.position, link: `/manga/${entry.manga.mal_id}`, imgSrc: entry.manga.images.webp?.image_url ?? entry.manga.images.jpg.image_url }; })
                            } : undefined,
                            tertiaryContentGroup: data.data.voices ? {
                                title: 'Voices',
                                group: data.data.voices.map((entry) => { return { title: entry.anime.title, desc: `${entry.role} - ${entry.character.name}`, link: `/anime/${entry.anime.mal_id}`, imgSrc: entry.anime.images.webp?.image_url ?? entry.anime.images.jpg.image_url }; })
                            } : undefined,
                        }
                    );
                }}
            />
        </div>
    );

}

export default PersonPage;