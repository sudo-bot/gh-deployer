import * as Knex from 'knex';

exports.up = function (knex: Knex, Promise: Promise<void>) {
    return knex.schema.createTable('containers', (table) => {
        table.comment('Deployed containers');
        table.increments('id').unsigned().notNullable().comment('Unique Id');
        table.string('container_id', 64).notNullable().comment('Unique docker sha256');
        table.string('project_slug', 255).notNullable().comment('Project slug');
    });
};

exports.down = function (knex: Knex, Promise: Promise<void>) {
    return knex.schema.dropTable('containers');
};
