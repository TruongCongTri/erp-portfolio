import "./FeaturedProjects.css";
import featuredProjectsContent from "./featured-projects-content";

import FeaturedProjectsMotion from "./FeaturedProjectsMotion";

const FeaturedProjects = () => {
  return (
    <>
      <div className="featured-projects">
        {featuredProjectsContent.map((project) => (
          <article key={project.id} className="featured-project-card">
            <div className="featured-project-card-inner">
              <div className="featured-project-card-content">
                <div className="featured-project-card-info">
                  <p>{project.info}</p>
                </div>
                <div className="featured-project-card-content-main">
                  <div className="featured-project-card-title">
                    <h2>{project.title}</h2>
                  </div>
                  <div className="featured-project-card-description">
                    <p className="lg">{project.description}</p>
                  </div>
                </div>
              </div>
              <div className="featured-project-card-img">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
            </div>
          </article>
        ))}
      </div>
      <FeaturedProjectsMotion />
    </>
  );
};

export default FeaturedProjects;
