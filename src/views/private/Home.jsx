import { useEffect } from "react";
import { useProgressBar } from "../../provider/ProgressBarProvider";
import { useAuth } from "../../provider/AuthProvider";

export default function PrivateHome() {
    const { displayProgressBar } = useProgressBar();

    useEffect(() => {
        setTimeout(() => {
            displayProgressBar(false);
        }, 500);
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            coucou je suis connecte
        </div>
    )
}