'use strict';

const config = require('@root/knexfile');
import knex from 'knex';
import { Knex as KnexType } from 'knex/types';
import User from './modeles/User';

export default class Knex {
    public static knex: KnexType = knex(config[process.env.NODE_ENV || 'development']);
    constructor() {}
    public static stop(): void {
        Knex.knex.destroy();
    }
}
