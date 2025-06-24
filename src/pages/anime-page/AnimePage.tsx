import { useParams } from "react-router";
import { useGetAnimeByIdQuery } from "../../services/jikan";
import styles from './AnimePage.module.scss';
import { Label } from "../../components/atoms/label";
import { Image } from "../../components/atoms/image";


function AnimePage() {
    const { id } = useParams();
    const { data, isLoading } = useGetAnimeByIdQuery({ id: Number(id) });

    console.log("Anime data:", data);

    if (isLoading || !data) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles['anime-page']}>
            <div style={{ display: 'flex', gap: '24px' }}>
                <div>
                    <Image
                        // TODO: use webp
                        src={data.data.images.jpg.image_url}
                        alt={data.data.title}
                        style={{ width: '200px', height: '300px', objectFit: 'cover' }}
                    />
                    <p>Score: {data.data.score}</p>
                    <Label as='p' font="typo-primary-m-regular" style={{ marginBottom: 12 }}>scored_by {data.data.scored_by}</Label>
                    <p>Episodes: {data.data.episodes}</p>
                    <Label as='p' font="typo-primary-m-regular" style={{ marginBottom: 12 }}>{data.data.duration}</Label>
                    <Label as='p' font="typo-primary-m-regular" style={{ marginBottom: 12 }}>{data.data.aired.string}</Label>
                    <Label as='p' font="typo-primary-m-regular" style={{ marginBottom: 12 }}>favorites {data.data.favorites}</Label>
                    <Label as='p' font="typo-primary-m-regular" style={{ marginBottom: 12 }}>members {data.data.members}</Label>
                    <Label as='p' font="typo-primary-m-regular" style={{ marginBottom: 12 }}>popularity {data.data.popularity}</Label>
                    <Label as='p' font="typo-primary-m-regular" style={{ marginBottom: 12 }}>rank {data.data.rank}</Label>
                </div>
                <div>
                    <Label as='h3' font="typo-primary-xl-medium" style={{ marginBottom: 12 }}>{data.data.titles.find(item => item.type === 'Default')?.title}</Label>
                    <Label as='p' font="typo-primary-m-regular" style={{ marginBottom: 12 }}>{data.data.synopsis}</Label>
                    <Label as='p' font="typo-primary-m-regular" style={{ marginBottom: 12 }}>{`${data.data.broadcast.string} ${data.data.broadcast.timezone}`}</Label>
                    <Label as='p' font="typo-primary-m-regular" style={{ marginBottom: 12 }}>rating {data.data.rating}</Label>


                </div>
            </div>

            <div style={{ height: 1, backgroundColor: 'red' }}></div>

            <div style={{ display: 'flex', marginBottom: 12 }}>
                Externals----
                {data.data.external?.map((item) => {
                    return <p>{item.name}_____</p>;
                })}
            </div>

            <div style={{ display: 'flex', marginBottom: 12 }}>
                Genres----
                {data.data.genres?.map((item) => {
                    return <p>{item.name}_____</p>;
                })}
            </div>

            <div style={{ display: 'flex', marginBottom: 12 }}>
                Producers----
                {data.data.producers?.map((item) => {
                    return <p>{item.name}_____</p>;
                })}
            </div>

            <div style={{ display: 'flex', marginBottom: 12 }}>
                relations----
                {data.data.relations?.map((item) => {
                    return <p>{item.relation}_____</p>;
                })}
            </div>


            <iframe
                width={560}
                height={315}
                src={data.data.trailer.embed_url}
                title="YouTube video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default AnimePage;