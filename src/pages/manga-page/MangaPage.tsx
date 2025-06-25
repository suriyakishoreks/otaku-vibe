import { useParams } from "react-router";
import { useGetMangaByIdQuery } from "../../services/jikan";


function MangaPage() {
    const { id } = useParams();
    const { data, isLoading } = useGetMangaByIdQuery({ id: Number(id) });

    console.log("Manga data:", data);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {data && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'red' }}>
                    <img
                        src={data.data.images.jpg.image_url}
                        alt={data.data.title}
                        style={{ width: '200px', height: '300px', objectFit: 'cover' }}
                    />
                    <h1 style={{ color: 'wheat' }}>{data.data.title}</h1>
                    <p>{data.data.synopsis}</p>
                    <p>Score: {data.data.score}</p>
                </div>
            )}
        </div>

    );
}

export default MangaPage;