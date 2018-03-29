/**
 * This file contains the exportable models
 * corresponding to the datasources schema
 */

import * as mongoose from 'mongoose';

import { dbConfig } from '../config/config';

/**
 * Mongoose Connection
 */
export const Connection = mongoose.connect(dbConfig.connectionString);
