import { content } from "../../content";
import HomeCard from "../HomeCard";
import Timeline from "../Timeline";
import { Briefcase } from "lucide-react";

export default function ExperienceCard() {
  return (
    <HomeCard
      id="experience"
      title="Experience"
      subtitle="A quick timeline of work"
      icon={<Briefcase size={24} />}
    >
      <Timeline items={content.workExperience} />
    </HomeCard>
  );
}
