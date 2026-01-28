type Props = {
  tags: string[];
  active: string;
  onChange: (tag: string) => void;
};

export default function TagFilter({ tags, active, onChange }: Props) {
  return (
    <div className="tagRow" role="tablist" aria-label="Project filters">
      {tags.map((tag) => {
        const isActive = tag === active;
        return (
          <button
            key={tag}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`tag ${isActive ? "tagActive" : ""}`}
            onClick={() => onChange(tag)}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}

