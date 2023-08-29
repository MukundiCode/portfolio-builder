export class Experience {
  position: string;
  company: string;
  description: string;
  since: Date;
  until: Date;
  skills: string[];

  constructor(
    position: string,
    company: string,
    description: string,
    since: Date,
    until: Date,
    skills: string[]
  ) {
    this.position = position;
    this.company = company;
    this.description = description;
    this.since = since;
    this.until = until;
    this.skills = skills;
  }
}
