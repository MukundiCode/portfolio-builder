import { Experience } from "./Experience";
import { Project } from "./Project";

export interface Portfolio {
    id: number | undefined;
    name: string;
    shortIntro: string;
    aboutMe: string;
    experienceList: Experience[];
    projectList: Project[];
  }
  