export class Task {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly date: string, // yyyy-mm-dd
    public readonly points: number,
    public completed: boolean = false
  ) {}

  complete() {
    this.completed = true
  }

  reopen() {
    this.completed = false
  }
}
