'use strict';

const config = require('@root/knexfile');
import * as knex from 'knex';

export default class Knex {
    private static knex = knex(config[process.env.NODE_ENV || 'development']);
    constructor() {}
    public static getConnection() {
        return Knex.knex;
    }
    public static stop(): void {
        Knex.knex.destroy();
    }
}
