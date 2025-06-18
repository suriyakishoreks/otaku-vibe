import { useEffect } from "react";
import { useGetAnimeFullByIdQuery } from "../../services/jikan";
import { Label } from "../../components/atoms/label";
import styles from "./HomePage.module.scss";

type Props = {};

function HomePage({ }: Props) {
    const { data } = useGetAnimeFullByIdQuery(1);

    useEffect(() => {
        console.log("Data fetched:", data);
    }, [data]);

    return (
        <div style={{ color: 'red' }}> <Label font="typo-primary-l-semibold" className={styles.hp}>HomePage</Label> </div>
    );
}

export default HomePage;