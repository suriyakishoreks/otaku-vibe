import { useParams } from "react-router";
import { useGetCharacterByIdQuery } from "../../services/jikan";
import { MediaContent } from "../../components/widgets/media-content";
import { formatThresholdNumber } from "../../shared/util";

function CharacterPage() {
    const { id } = useParams();

    return (
        <div>
            <MediaContent
                useQueryHook={useGetCharacterByIdQuery}
                contentType="character"
                options={{ id: Number(id) }}
                adapter={(data) => {
                    return (
                        {
                            imageAlt: data.data.mal_id.toString(),
                            imageSrc: data.data.images.webp?.large_image_url ?? data.data.images.jpg.large_image_url ?? data.data.images.jpg.image_url,
                            title: data.data.name,
                            titleEnglish: data.data.nicknames?.[0],
                            mediaStats: {
                                favorite: data.data.favorites ? `${formatThresholdNumber(data.data.favorites)} Favorites` : undefined,

                            },
                            summary: data.data.about ?? 'NA',
                            infoGroup: {
                                title: 'Info',
                                group: [{ title: 'Kanji', text: data.data.name_kanji }]
                            },
                            primaryContentGroup: data.data.anime ? {
                                title: 'Anime',
                                group: data.data.anime.map((entry) => { return { title: entry.anime.title, desc: entry.role, link: `/anime/${entry.anime.mal_id}?`, imgSrc: entry.anime.images.webp?.image_url ?? entry.anime.images.jpg.image_url }; })
                            } : undefined,
                            secondaryContentGroup: data.data.manga ? {
                                title: 'Manga',
                                group: data.data.manga.map((entry) => { return { title: entry.manga.title, desc: entry.role, link: `/manga/${entry.manga.mal_id}?`, imgSrc: entry.manga.images.webp?.image_url ?? entry.manga.images.jpg.image_url }; })
                            } : undefined,
                            tertiaryContentGroup: data.data.voices ? {
                                title: 'People',
                                group: data.data.voices.map((entry) => { return { title: entry.person.name, desc: entry.language, link: `/people/${entry.person.mal_id}?`, imgSrc: entry.person.images.webp?.image_url ?? entry.person.images.jpg.image_url }; })
                            } : undefined,
                        }
                    );
                }}
            />
        </div>
    );

}

export default CharacterPage;