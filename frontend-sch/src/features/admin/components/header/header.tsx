import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Header({
  title,
  description,
  buttonInfo,
}: {
  title: string;
  description: string;
  buttonInfo: {
    title: string;
    link: string;
  };
}) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-full p-5">
      <div className="space-y-2">
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-base">{description}</p>
      </div>
      <Button onClick={() => navigate(buttonInfo.link)}>
        {buttonInfo.title}
      </Button>
    </div>
  );
}
