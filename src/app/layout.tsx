import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnHub — E-Learning Platform",
  description: "Master new skills with expert-led courses. Learn web development, data science, and design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
