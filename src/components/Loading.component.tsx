import "../styles/loading.css";

interface LoadingProps {
    color?: string;
    size?: "small" | "medium" | "large";
}

export default function Loading ({
    color = "blue",
    size = "medium"
}: LoadingProps) {
    return <div className={`loading-spinner loading-spinner--${size}`} style={{borderTopColor: color}}/>
} 