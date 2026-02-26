import { Link } from "react-router";

interface LogoProps {
  variant?: "full" | "icon";
  className?: string;
  linkTo?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "full",
  className = "",
  linkTo = "/",
}) => {
  const content =
    variant === "full" ? (
      <span className={`text-2xl font-bold text-gray-900 dark:text-white ${className}`}>
        Atlas AI
      </span>
    ) : (
      <span className={`text-xl font-bold text-gray-900 dark:text-white ${className}`}>
        A
      </span>
    );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
};
