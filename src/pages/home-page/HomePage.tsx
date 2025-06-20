import { useEffect } from "react";
import { useGetAnimeFullByIdQuery } from "../../services/jikan";
import { Carousel } from "../../components/atoms/horizontal-carousel";

function HomePage() {
    const { data } = useGetAnimeFullByIdQuery(1);

    useEffect(() => {
        console.log("Data fetched:", data);
    }, [data]);

    return (
        <div>
            <Carousel>
                <div style={{ width: '200px' }}> 1</div>
                <div style={{ width: '200px' }}>2</div>
                <div style={{ width: '200px' }}> 3</div>
                <div style={{ width: '200px' }}> 4</div>
                <div style={{ width: '200px' }}> 5</div>
                <div style={{ width: '200px' }}> 6</div>
                <div style={{ width: '200px' }}> 1</div>
                <div style={{ width: '200px' }}>2</div>
                <div style={{ width: '200px' }}> 3</div>
                <div style={{ width: '200px' }}> 4</div>
                <div style={{ width: '200px' }}> 5</div>
                <div style={{ width: '200px' }}> 6</div>
                <div style={{ width: '200px' }}> 1</div>
                <div style={{ width: '200px' }}>2</div>
                <div style={{ width: '200px' }}> 3</div>
                <div style={{ width: '200px' }}> 4</div>
                <div style={{ width: '200px' }}> 5</div>
                <div style={{ width: '200px' }}> 6</div>
            </Carousel>
        </div>
    );
}

export default HomePage;