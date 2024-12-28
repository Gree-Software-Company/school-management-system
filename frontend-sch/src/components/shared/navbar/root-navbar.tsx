import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function RootNavbar({
  Logo,
  className,
}: {
  Logo: string;
  className?: string;
}) {
  return (
    <Link to="/">
      <header
        className={cn("flex items-center hover:cursor-pointer", className)}
      >
        <img src={Logo} alt="Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold ml-2">School Management System</h1>
      </header>
    </Link>
  );
}
