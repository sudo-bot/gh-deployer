import { Knex } from 'knex/types';

exports.up = function (knex: Knex, Promise: Promise<void>) {
    return knex.schema.createTable('messages', (table: any) => {
        table.comment('The messages sent and received');
        table.increments('id').unsigned().notNullable().comment('Unique message Id');
        table.integer('comment_id').unsigned().notNullable().comment('The comment Id');
        table.integer('pr_id').unsigned().nullable().comment('The pull-request Id');
        table.enum('platform', ['github', 'bitbucket', 'gitlab']).comment('The platform');
        table.string('username', 100).comment('The username');
        table
            .integer('ref_comment_id')
            .unsigned()
            .nullable()
            .comment('The message Id it references (in reply to: comment Id)');
        table.boolean('is_sent').comment('Is sent or received');
    });
};

exports.down = function (knex: Knex, Promise: Promise<void>) {
    return knex.schema.dropTable('messages');
};
