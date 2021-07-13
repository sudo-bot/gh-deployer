'use strict';

const config = require('@root/knexfile');
import knex from 'knex';
import { Knex as KnexType } from 'knex/types';

export default class Knex {
    public static knex: KnexType = knex(config[process.env.NODE_ENV || 'development']);
    constructor() {}
    public static start(): void {
        Knex.knex.initialize(config[process.env.NODE_ENV || 'development']);
    }
    public static stop(cbDone: () => void = () => {}): void {
        Knex.knex.destroy(cbDone);
    }
}
