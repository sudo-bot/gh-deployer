## Template
```ts
import * as Knex from 'knex';

exports.up = function(knex: Knex, Promise: Promise<void>) {
    return knex.schema.createTable('table1', (table) => {
        table.comment('Describe my table');
        table.increments('id').unsigned().notNullable().comment('Unique Id');
    });
};

exports.down = function(knex: Knex, Promise: Promise<void>) {
    return knex.schema.dropTable('table1');
};
```
