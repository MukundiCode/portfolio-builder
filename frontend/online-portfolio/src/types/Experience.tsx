export class Experience {
  position: string;
  company: string;
  description: string;
  from: Date;
  to: Date;
  skills: string[];

  constructor(
    position: string,
    company: string,
    description: string,
    from: Date,
    to: Date,
    skills: string[]
  ) {
    this.position = position;
    this.company = company;
    this.description = description;
    this.from = from;
    this.to = to;
    this.skills = skills;
  }
}
