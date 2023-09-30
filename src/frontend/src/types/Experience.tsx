export class Experience {
  id: number | undefined;
  position: string;
  company: string;
  description: string;
  since: Date;
  until: Date;
  skills: string[];
  isCurrentPosition: boolean;

  constructor(
    id: number,
    position: string,
    company: string,
    description: string,
    since: Date,
    until: Date,
    skills: string[],
    isCurrentPosition: boolean
  ) {
    this.id = id;
    this.position = position;
    this.company = company;
    this.description = description;
    this.since = since;
    this.until = until;
    this.skills = skills;
    this.isCurrentPosition = isCurrentPosition
  }
}
