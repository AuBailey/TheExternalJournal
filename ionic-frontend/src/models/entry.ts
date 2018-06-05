export class Entry {
  id: number;
  name: string;
  content: string;
  lat: number;
  lng: number;
  isBeingModified: boolean;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}