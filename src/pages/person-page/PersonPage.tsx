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
                        }
                    );
                }}
            />
        </div>
    );

}

export default PersonPage;