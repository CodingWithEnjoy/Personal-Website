"use client";

import { Github, ExternalLink } from "lucide-react";
import styles from "./ProjectCard.module.css";
import { useRef } from "react";

type Project = {
  title: string;
  description: string;
  github?: string;
  website?: string;
  image?: string;
  tech?: string[];
};

export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // cursor X inside card
    const y = e.clientY - rect.top; // cursor Y inside card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 12; // max 7deg
    const rotateY = ((x - centerX) / centerX) * -12; // max 7deg

    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      className={styles.card}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {project.image && (
        <div className={styles.imageWrapper}>
          <img
            src={project.image}
            alt={project.title}
            className={styles.image}
          />
        </div>
      )}

      <div className={styles.content}>
        <h2>{project.title}</h2>
        <p>{project.description}</p>

        {project.tech && (
          <div className={styles.techTags}>
            {project.tech.map((t, i) => (
              <span key={i} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>
        )}

        <div className={styles.links}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={styles.icon}
            >
              <Github size={20} />
            </a>
          )}
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className={styles.icon}
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
