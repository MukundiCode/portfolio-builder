import { Experience } from "./Experience";
import { Project } from "./Project";

export interface Portfolio {
    uuid: string;
    name: string;
    shortIntro: string;
    aboutMe: string;
    experienceList: Experience[];
    projectList: Project[];
  }
  