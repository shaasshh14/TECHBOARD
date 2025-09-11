  import { FaSchool, FaBriefcase } from "react-icons/fa";
  import { motion } from "framer-motion";
  import { useEffect, useState } from "react";

  // Timeline data
  const timelineElements = [
    {
      id: 1,
      title: "High School",
      location: "Delhi, India",
      description: "Completed high school with a focus on science subjects.",
      buttonText: "View Certificate",
      date: "2016 - 2018",
      icon: "school",
      color: "red",
      tech: ["Physics", "Chemistry", "Maths"],
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "College - B.Tech IT",
      location: "IIT Pune, India",
      description: "Pursuing Bachelor of Engineering in Information Technology.",
      buttonText: "View Details",
      date: "2019 - 2023",
      icon: "school",
      color: "yellow",
      tech: ["C++", "DSA", "Python"],
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "Internship at XYZ",
      location: "Bangalore, India",
      description: "Worked on frontend development with React and TailwindCSS.",
      buttonText: "View Project",
      date: "2021",
      icon: "work",
      color: "blue",
      tech: ["React", "TailwindCSS", "JavaScript"],
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      title: "Full-time Developer",
      location: "Hyderabad, India",
      description: "Working as a Software Engineer focusing on scalable web apps.",
      buttonText: "View Work",
      date: "2023 - Present",
      icon: "work",
      color: "purple",
      tech: ["Next.js", "Node.js", "MongoDB"],
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  export default function Timeline({ defaultColor }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const timeline = document.getElementById("timeline-wrapper");
        if (!timeline) return;

        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const scrollProgress = Math.min(
          Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0),
          1
        );

        setProgress(scrollProgress * 100);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <div className="min-h-screen flex justify-center px-4 py-12">
        <div id="timeline-wrapper" className="relative w-full max-w-5xl">
          {/* central line for desktop, leftmost line for mobile */}
          <div className="absolute top-0 sm:left-1/2 left-0 sm:-translate-x-1/2 w-1 h-full bg-gray-700 rounded-full"></div>

          {/* scroll progress line */}
          <div
            className="absolute top-0 sm:left-1/2 left-0 sm:-translate-x-1/2 w-1 bg-blue-500 rounded-full transition-all duration-200"
            style={{ height: `${progress}%` }}
          ></div>

          {timelineElements.map((element, index) => {
            const color = defaultColor || `bg-${element.color}-500`;
            const Icon = element.icon === "school" ? FaSchool : FaBriefcase;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={element.id}
                className={`h-screen flex items-center justify-center w-full ${
                  isLeft
                    ? "sm:justify-start sm:text-right"
                    : "sm:justify-end sm:text-left"
                } justify-end text-left`} // default mobile alignment
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.8 }}
              >
                <div
                  className={`relative w-full sm:w-5/12 ${
                    isLeft ? "sm:pr-6" : "sm:pl-6"
                  } pl-6`} // mobile always has padding-left
                >
                  {/* icon on line */}
                  <div
                    className={`${color} w-10 h-10 rounded-full flex items-center justify-center text-white absolute top-1/2 -translate-y-1/2 sm:${
                      isLeft ? "right-[-27px]" : "left-[-27px]"
                    } left-[-27px]`} // mobile icon always at far left
                  >
                    <Icon size={18} />
                  </div>

                  {/* card */}
                  <div className="border border-gray-700 rounded-lg bg-gray-800 shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden">
                    {/* image */}
                    <img
                      src={element.image}
                      alt={element.title}
                      className="w-full h-48 object-cover"
                    />

                    {/* content */}
                    <div className="px-6 py-6">
                      <h3 className="text-xl font-semibold text-white">
                        {element.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">{element.date}</p>
                      <p className="text-gray-300 mb-4">{element.location}</p>
                      <p className="text-gray-200 mb-4">{element.description}</p>

                      {/* tech tags */}
                      <div className="flex flex-wrap justify-start mb-4">
                        {element.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-900 rounded-xl px-3 py-1 text-sm m-1 text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* button */}
                      <a
                        className={`${color} text-gray-950 font-medium px-4 py-1 rounded-md cursor-pointer hover:text-white`}
                      >
                        {element.buttonText}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }
