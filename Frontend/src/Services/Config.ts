abstract class Config {
  public readonly registerURL: string;
  public readonly loginURL: string;
  public readonly vacationsURL: string;
  public readonly vacationImagesURL: string;
  public readonly followersURL: string;
  public readonly getAllFollowedVacations: string;
  public readonly getAllFollowersForVacation: string;

  public constructor(baseURL: string) {
    this.registerURL = baseURL + "auth/register/";
    this.loginURL = baseURL + "auth/login/";
    this.vacationsURL = baseURL + "vacations/";
    this.vacationImagesURL = baseURL + "images/";
    this.followersURL = baseURL+ "followers/";
    this.getAllFollowedVacations = this.followersURL+ "by-user-id/";
    this.getAllFollowersForVacation = this.followersURL+ "by-vacation-id/";
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
