import {useNavigate} from "react-router-dom";
import "./extraStyle/notFound.css"
import Button from "../components/button/Button.jsx";

const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <div className={'not-found'}>
            <h1>404</h1>
            <h2>Not Found</h2>
            <p>
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Button variant={'back'} colorTone={'light'} onClick={() => navigate('/')}></Button>
        </div>
    )
}

export default NotFoundPage