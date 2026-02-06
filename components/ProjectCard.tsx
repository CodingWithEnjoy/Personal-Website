import { useRef, useState } from "react";
import { Github, ExternalLink, Minimize } from "lucide-react";
import styles from "./ProjectCard.module.css";

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
  const [fullscreen, setFullscreen] = useState(false);
  const [closing, setClosing] = useState(false);

  const openFullscreen = () => {
    setFullscreen(true);
    setClosing(false);
  };

  const closeFullscreen = () => {
    setClosing(true);
    // Wait for animation to finish before removing
    setTimeout(() => setFullscreen(false), 300); // match CSS animation duration
  };

  return (
    <>
      <div
        className={styles.card}
        ref={cardRef}
        onMouseMove={(e) => {
          if (!cardRef.current || fullscreen) return;
          const rect = cardRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * 12;
          const rotateY = ((x - centerX) / centerX) * -12;
          cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        }}
        onMouseLeave={() => {
          if (!cardRef.current || fullscreen) return;
          cardRef.current.style.transform =
            "rotateX(0deg) rotateY(0deg) scale(1)";
        }}
      >
        {project.image && (
          <div className={styles.imageWrapper} onClick={openFullscreen}>
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

      {/* Fullscreen overlay */}
      {fullscreen && project.image && (
        <div
          className={`${styles.fullscreenOverlay} ${closing ? styles.closing : ""}`}
          onClick={closeFullscreen}
        >
          <img
            src={project.image}
            alt={project.title}
            className={styles.fullscreenImage}
          />
          <button className={styles.closeButton}>
            <Minimize size={22} />
          </button>
        </div>
      )}
    </>
  );
}
