import { content } from "../../content";
import HomeCard from "../HomeCard";
import { User } from "lucide-react";

export default function OverviewCard() {
  return (
    <HomeCard id="overview" title={content.about.title} subtitle="Professional profile" icon={<User size={24} />}>
      <ul className="bulletList">
        {content.about.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </HomeCard>
  );
}
