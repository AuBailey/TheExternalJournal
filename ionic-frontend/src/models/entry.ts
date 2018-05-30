export class Entry {
  id: number;
  name: string;
  isBeingModified: boolean;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}