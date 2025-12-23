import { DataSource } from 'typeorm';
import { User } from '../entities/User.entity';
import { Vacation } from '../entities/Vacation.entity';
import { Follower } from '../entities/Follower.entity';

// Load config based on environment
const config =
  process.env.NODE_ENV === 'production'
    ? require('../../config-prod.json')
    : require('../../config-dev.json');

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.database.host,
  port: 3306,
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
  entities: [User, Vacation, Follower],
  synchronize: false, // NEVER true in production - use migrations instead
  logging: process.env.NODE_ENV !== 'production',
  migrations: ['src/migrations/**/*.ts'],
  subscribers: [],
  // Connection pool configuration
  extra: {
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
  },
});

// Initialize the data source
export const initializeDatabase = async (): Promise<void> => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('✅ Database connection established');
    }
  } catch (error) {
    console.error('❌ Error connecting to database:', error);
    throw error;
  }
};