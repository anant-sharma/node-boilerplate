/**
 * This file contains the exportable models
 * corresponding to the datasources schema
 */

import * as mongoose from 'mongoose';

import { Config } from '../config/config';

/**
 * Mongoose Connection
 */
export const Connection = mongoose.connect(Config.DB.connectionString);
