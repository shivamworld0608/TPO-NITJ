"use client";
import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useTheme } from "@/context/theme-context"; // Ensure correct import

export default function HiringFlow() {
  const { theme } = useTheme();

  const timelineData = [
    {
      title: "Application",
      description: "",
      icon: <div className="w-4 h-4 bg-gray-400 rounded-full" />,
    },
    {
      title: "Pre-placement talk",
      description: "Venue: To be announced",
      icon: <div className="w-4 h-4 bg-gray-400 rounded-full" />,
    },
    {
      title: "Online test",
      description: "Venue: To be announced",
      icon: <div className="w-4 h-4 bg-gray-400 rounded-full" />,
    },
    {
      title: "Technical interview",
      description: "Venue: To be announced",
      icon: <div className="w-4 h-4 bg-gray-400 rounded-full" />,
    },
    {
      title: "Offer",
      description: "",
      icon: <div className="w-4 h-4 bg-green-500 rounded-full" />,
    },
  ];

  return (
    <section className="font-sans p-6">
      <VerticalTimeline lineColor={theme === "light" ? "#9ca3af" : "rgba(255,255,255,0.5)"}>
        {timelineData.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            contentStyle={{
              background: theme === "light" ? "#f3f4f6" : "rgba(255,255,255,0.05)",
              boxShadow: "none",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              textAlign: "left",
              padding: "1.3rem 2rem",
            }}
            contentArrowStyle={{
              borderRight: theme === "light"
                ? "0.4rem solid #9ca3af"
                : "0.4rem solid rgba(255,255,255,0.5)",
            }}
            iconStyle={{
              background: item.icon.props.className.includes('bg-green-500') ? "#34D399" : theme === "light" ? "white" : "rgba(255,255,255,0.15)",
              fontSize: "1.5rem",
            }}
          >
            <h3 className="font-semibold capitalize">{item.title}</h3>
            {item.description && (
              <p className="font-normal !mt-0 text-gray-600 dark:text-white/75">
                {item.description}
              </p>
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  );
}
