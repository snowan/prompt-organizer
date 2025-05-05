import Dexie, { Table } from 'dexie';
import { Prompt } from './types';

class PromptDatabase extends Dexie {
  prompts!: Table<Prompt>;

  constructor() {
    super('PromptOrganizerDB');
    this.version(1).stores({
      prompts: '++id, title, description, promptText, tags, createdAt, modifiedAt'
    });
  }
}

export const db = new PromptDatabase(); 