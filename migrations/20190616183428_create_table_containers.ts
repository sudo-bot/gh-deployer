exports.up = function (knex) {
    return knex.schema.createTable('containers', (table) => {
        table.comment('Deployed containers');
        table.increments('id').unsigned().notNullable().comment('Unique Id');
        table.string('container_id', 64).notNullable().comment('Unique docker sha256');
        table.string('project_slug', 255).notNullable().comment('Project slug');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('containers');
};
