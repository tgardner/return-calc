interface IMap {
  [key: string]: any;
}

export class EnvService {
  constructor(private env: IMap) {
  }

  public has(key: string): boolean {
    return Object.keys(this.env).indexOf(key) >= 0;
  }

  public get(key: string): string {
    if (!this.has(key)) {
      throw new Error(`Missing \`${key}\` environment variable`);
    }

    return this.env[key];
  }
}
