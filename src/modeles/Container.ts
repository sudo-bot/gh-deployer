import knex from '@src/knex';

export default class Container {
    id?: number;
    container_id: string;
    project_slug: string;

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
            .knex<Container>('containers')
            .insert({
                container_id: this.container_id,
                project_slug: this.project_slug,
            })
            .into('containers');
    }
    public static all(): Promise<Container[]> {
        return knex
            .knex<Container>('containers')
            .select('*')
            .then((containers: any) => {
                return containers.map((message: any) => {
                    var newContainer = new Container(message.container_id, message.project_slug);
                    newContainer.setId(message.id);
                    return newContainer;
                });
            });
    }

    public async delete() {
        const id: number = this.id || -1;
        await knex.knex('containers').where('id', id).delete();
    }

    public static async deleteWhereContainerId(containerId: string) {
        await knex.knex('containers').where('container_id', containerId).delete();
    }

    public getContainerId(): string {
        return this.container_id;
    }

    public getProjectSlug(): string {
        return this.project_slug;
    }
}
