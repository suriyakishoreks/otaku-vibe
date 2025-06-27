import { useNavigate } from "react-router";
import { Image } from "../../components/atoms/image";
import shocked from "../../assets/image/shocked-min.webp";
import styles from './ErrorPage.module.scss';
import { Label } from "../../components/atoms/label";
import Vernac from "../../services/vernac";

interface ErrorPageProps {
    is404?: boolean;
};

function ErrorPage({ is404 = false }: ErrorPageProps) {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className={styles.error}>
            <Image src={shocked} />
            <Label as='h2' font="typo-primary-xl-semibold">{is404 ? Vernac.getVernac('EP_404_TITLE') : Vernac.getVernac('EP_ERROR_TITLE')}</Label>
            <Label as='p' font="typo-primary-m-medium"> {is404 ? Vernac.getVernac('EP_404_DESC') : Vernac.getVernac('EP_ERROR_DESC')}</Label>
            <button onClick={handleGoHome}>
                <Label as='span' font="typo-primary-m-medium">{Vernac.getVernac('EP_REDIRECT_TEXT')}</Label>
            </button>
        </div>
    );
}

export default ErrorPage;