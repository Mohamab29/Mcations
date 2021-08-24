abstract class Config {
  public readonly registerURL: string;
  public readonly loginURL: string;
  public constructor(baseURL: string) {
    this.registerURL = baseURL + "auth/register/";
    this.loginURL = baseURL + "auth/login/";
  }
}

class DevelopmentConfig extends Config {
  public constructor() {
    super("http://localhost:3001/api/");
  }
}

class ProductionConfig extends Config {
  public constructor() {
    super("http://localhost:3001/api/");
  }
}

const config =
  process.env.NODE_ENV === "development"
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default config;
