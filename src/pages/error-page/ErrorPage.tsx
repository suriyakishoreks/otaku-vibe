import { useNavigate } from "react-router";
import { Image } from "../../components/atoms/image";
import shocked from "../../assets/image/shocked-min.webp";

interface ErrorPageProps {
    is404?: boolean;
};

function ErrorPage({ is404 = false }: ErrorPageProps) {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "10vh" }}>
            <Image src={shocked} />
            <h1>{is404 ? "404 - Page Not Found" : "Something went wrong"}</h1>
            <p>
                {is404
                    ? "Sorry, the page you are looking for does not exist."
                    : "An unexpected error has occurred."}
            </p>
            <button onClick={handleGoHome} style={{ marginTop: 20 }}>
                Go to Home
            </button>
        </div>
    );
}

export default ErrorPage;