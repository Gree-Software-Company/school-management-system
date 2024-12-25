import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function Header({
  title,
  description,
  className,
  buttonInfo,
}: {
  title: string;
  description: string;
  className?: string;
  buttonInfo: {
    title: string;
    link: string;
  };
}) {
  const navigate = useNavigate();
  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      <div className="space-y-2">
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-base">{description}</p>
      </div>
      <Button onClick={() => navigate(buttonInfo.link, { replace: true })}>
        {buttonInfo.title}
      </Button>
    </div>
  );
}
