import { useParams } from "react-router";
import { useGetAnimeByIdQuery } from "../../services/jikan";
import { MediaContent, type MediaContentData } from "../../components/widgets/media-content";
import { formatThresholdNumber } from "../../shared/util";

function AnimePage() {
    const { id } = useParams();

    // Characters, stats, reco, reviews

    return (
        <div>
            <MediaContent
                useQueryHook={useGetAnimeByIdQuery}
                contentType="anime"
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
                                listed: data.data.members ? `${formatThresholdNumber(data.data.members)} Watch Lists` : undefined
                            },
                            summary: data.data.synopsis ?? 'NA',
                            primaryStringGroup: {
                                title: 'Genre',
                                group: data.data.genres.map((genre) => { return { text: genre.name }; }),
                            },
                            youtubeEmbed: data.data.trailer ? { link: data.data.trailer.embed_url } : undefined,
                            infoGroup: {
                                title: 'Info',
                                group: [
                                    { title: 'Status', text: data.data.status },
                                    { title: 'Source', text: data.data.source },
                                    { title: 'Episodes', text: data.data.episodes },
                                    { title: 'Duration', text: data.data.duration },
                                    { title: 'Rating', text: data.data.rating },
                                    { title: 'Season', text: `${data.data.season} ${data.data.year}` },
                                    { title: 'Aired', text: data.data.aired.string },
                                    { title: 'Broadcast', text: data.data.broadcast.string }
                                ]
                            },
                            secondaryStringGroup: data.data.external ? {
                                title: 'External',
                                group: data.data.external.map((data) => { return { text: data.name, link: data.url, external: true }; }),
                            } : undefined,
                            primaryContentGroup: data.data.relations ? {
                                title: 'Related',
                                group: data.data.relations.flatMap((relation) => relation.entry.map((entry) => { return { title: entry.name, desc: `${relation.relation} (${entry.type})`, link: `/${entry.type}/${entry.mal_id}` }; }))
                            } : undefined
                        } as MediaContentData
                    );
                }}
            />
        </div>
    );

}

export default AnimePage;