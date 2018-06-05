export class Entry {
  id: number;
  name: string;
  content: string;
  lat: number;
  lng: number;
  isShared: number;
  isBeingModified: boolean;

  constructor(id: number, name: string, content: string) {
    this.id = id;
    this.name = name;
    this.content = content;
  }
}