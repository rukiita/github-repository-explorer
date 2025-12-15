import { Repository } from "./githubSchemas";

export class LRUCache {
  private capacity: number;
  private cache: Map<number, Repository>;

  constructor(capacity: number, initialData: Repository[] = []) {
    this.capacity = capacity;
    this.cache = new Map(initialData.map((repo) => [repo.id, repo]));
  }

  add(repo: Repository): void {
    if (this.cache.has(repo.id)) {
      this.cache.delete(repo.id);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(repo.id, repo);
  }

  getValues(): Repository[] {
    return Array.from(this.cache.values()).reverse();
  }
}
