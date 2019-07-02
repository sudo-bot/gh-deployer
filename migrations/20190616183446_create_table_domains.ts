import * as Knex from 'knex';

exports.up = function(knex: Knex, Promise: Promise<void>) {
    return knex.schema.createTable('domains', table => {
        table.comment('Deployed domain names');
        table
            .increments('id')
            .unsigned()
            .notNullable()
            .comment('Unique Id');
        table
            .string('full_domain_name', 255)
            .notNullable()
            .comment('Full domain name');
        table
            .string('short_domain_name', 255)
            .notNullable()
            .comment('Short domain name');
        table
            .string('provider', 255)
            .notNullable()
            .comment('Domain name provider');
        table
            .string('project_slug', 255)
            .notNullable()
            .comment('Project slug');
    });
};

exports.down = function(knex: Knex, Promise: Promise<void>) {
    return knex.schema.dropTable('domains');
};
