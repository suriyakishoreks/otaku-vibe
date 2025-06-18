import { useEffect } from "react";
import { useGetAnimeFullByIdQuery } from "../../services/jikan";
import { Label } from "../../components/atoms/label";

function HomePage() {
    const { data } = useGetAnimeFullByIdQuery(1);

    useEffect(() => {
        console.log("Data fetched:", data);
    }, [data]);

    return (
        <div style={{ color: 'red' }}> <Label font="typo-primary-l-semibold">HomePage</Label> </div>
    );
}

export default HomePage;