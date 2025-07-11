import { useParams } from "react-router";
import { useGetMangaByIdQuery } from "../../services/jikan";
import { MediaContent } from "../../components/widgets/media-content";
import { formatThresholdNumber } from "../../shared/util";

function MangaPage() {
    const { id } = useParams();

    return (
        <div>
            <MediaContent
                useQueryHook={useGetMangaByIdQuery}
                contentType="manga"
                options={{ id: Number(id) }}
                adapter={(data) => {
                    return (
                        {
                            imageAlt: data.data.mal_id.toString(),
                            imageSrc: data.data.images.webp?.large_image_url ?? data.data.images.jpg.large_image_url ?? data.data.images.jpg.image_url,
                            title: data.data.titles.find((title) => title.type === 'Default')?.title ?? data.data.title,
                            titleEnglish: data.data.titles.find((title) => title.type === 'English')?.title ?? data.data.title_english,
                            contentType: data.data.type,
                            mediaStats: {
                                rank: data.data.rank ? `Rank #${data.data.rank}` : undefined,
                                popularity: data.data.popularity ? `Popularity #${data.data.popularity}` : undefined,
                                favorite: data.data.favorites ? `${formatThresholdNumber(data.data.favorites)} Favorites` : undefined,
                                rating: data.data.score ? `${data.data.score} | ${formatThresholdNumber(data.data.scored_by)} Ratings` : undefined,
                                listed: data.data.members ? `${formatThresholdNumber(data.data.members)} Read Lists` : undefined
                            },
                            summary: data.data.synopsis,
                            primaryStringGroup: {
                                title: 'Genre',
                                group: data.data.genres.map((genre) => { return { text: genre.name }; }),
                            },
                            infoGroup: {
                                title: 'Info',
                                group: [
                                    { title: 'Status', text: data.data.status },
                                    { title: 'Volume', text: data.data.volumes != null ? String(data.data.volumes) : 'Unknown' },
                                    { title: 'Chapters', text: data.data.chapters != null ? String(data.data.chapters) : 'Unknown' },
                                    { title: 'Published', text: data.data.published.string }
                                ]
                            },
                            secondaryStringGroup: data.data.external ? {
                                title: 'External',
                                group: data.data.external.map((data) => { return { text: data.name, link: data.url, external: true }; }),
                            } : undefined,
                            tertiaryStringGroup: data.data.authors ? {
                                title: 'Authors',
                                group: data.data.authors.map((data) => { return { text: data.name, link: `/${data.type}/${data.mal_id}?` }; })
                            } : undefined,
                            primaryContentGroup: data.data.relations ? {
                                title: 'Related',
                                group: data.data.relations.flatMap((relation) => relation.entry.map((entry) => { return { title: entry.name, desc: `${relation.relation} (${entry.type})`, link: `/${entry.type}/${entry.mal_id}?` }; }))
                            } : undefined,
                        }
                    );
                }}
            />
        </div>
    );
}

export default MangaPage;