import knex from '@src/knex';

export default class Domain {
    id?: number;
    full_domain_name: string;
    short_domain_name: string;
    provider: string;
    project_slug: string;

    constructor(fullDomainName: string, shortDomainName: string, provider: string, projectSlug: string) {
        this.full_domain_name = fullDomainName;
        this.short_domain_name = shortDomainName;
        this.provider = provider;
        this.project_slug = projectSlug;
    }

    private setId(id: number): void {
        this.id = id;
    }

    private setFullDomainName(fullDomainName: string): void {
        this.full_domain_name = fullDomainName;
    }

    private setShortDomainName(shortDomainName: string): void {
        this.short_domain_name = shortDomainName;
    }

    private setProjectSlug(projectSlug: string): void {
        this.project_slug = projectSlug;
    }

    public async save() {
        this.id = await knex
            .knex<Domain>('domains')
            .insert({
                full_domain_name: this.full_domain_name,
                short_domain_name: this.short_domain_name,
                provider: this.provider,
                project_slug: this.project_slug,
            })
            .into('domains');
    }
    public static all(): Promise<Domain[]> {
        return knex
            .knex<Domain>('domains')
            .select('*')
            .then((domains: any) => {
                return domains.map((message: any) => {
                    var newDomain = new Domain(
                        message.full_domain_name,
                        message.short_domain_name,
                        message.provider,
                        message.project_slug
                    );
                    newDomain.setId(message.id);
                    return newDomain;
                });
            });
    }

    public static async deleteWhereFullDomainName(fullDomainName: string) {
        await knex.knex<Domain>('domains').where('full_domain_name', fullDomainName).delete();
    }

    public async delete() {
        const id: number = this.id || -1;
        await knex.knex<Domain>('domains').where('id', id).delete();
    }

    public getFullDomainName(): string {
        return this.full_domain_name;
    }

    public getShortDomainName(): string {
        return this.short_domain_name;
    }

    public getProjectSlug(): string {
        return this.project_slug;
    }
}
