import knex from '@src/knex';

export default class Container {
    private id?: number;
    private container_id: string;
    private project_slug: string;

    constructor(containerId: string, projectSlug: string) {
        this.container_id = containerId;
        this.project_slug = projectSlug;
    }

    private setId(id: number): void {
        this.id = id;
    }

    private setContainerId(containerId: string): void {
        this.container_id = containerId;
    }

    private setProjectSlug(projectSlug: string): void {
        this.project_slug = projectSlug;
    }

    public async save() {
        this.id = await knex
            .getConnection()
            .insert({
                container_id: this.container_id,
                project_slug: this.project_slug,
            })
            .into('containers');
    }
    public static all(): Promise<Container[]> {
        return knex
            .getConnection()
            .select('*')
            .from('containers')
            .then(containers => {
                return containers.map(message => {
                    var newContainer = new Container(message.container_id, message.project_slug);
                    newContainer.setId(message.id);
                    return newContainer;
                });
            });
    }

    public async delete() {
        await knex
            .getConnection()('containers')
            .where('id', this.id)
            .delete();
    }

    public getContainerId(): string {
        return this.container_id;
    }

    public getProjectSlug(): string {
        return this.project_slug;
    }
}
