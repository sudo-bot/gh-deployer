import * as Knex from 'knex';

exports.up = function (knex: Knex, Promise: Promise<void>) {
    return knex.schema.createTable('users', (table) => {
        table.comment('The users');
        table.increments('id').unsigned().notNullable().comment('Unique user Id');
        table.string('first_name', 255).notNullable().comment('First name');
        table.string('last_name', 255).notNullable().comment('Last name');
        table.string('email', 255).notNullable().comment('Email');
        table.string('username', 255).notNullable().comment('Username');
        table.string('password', 64).notNullable().comment('Password (sha256)');
        table.string('password_salt', 30).notNullable().comment('Password salt');
        table.enum('status', ['confirmed', 'disabled', 'unconfirmed']).defaultTo('unconfirmed');
    });
};

exports.down = function (knex: Knex, Promise: Promise<void>) {
    return knex.schema.dropTable('users');
};
