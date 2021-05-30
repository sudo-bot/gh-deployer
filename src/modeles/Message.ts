import knex from '@src/knex';

export enum MessagePlatform {
    github = 'github',
    bitbucket = 'bitbucket',
    gitlab = 'gitlab',
}

export default class Message {
    id?: number;
    comment_id: number;
    pr_id: number;
    platform: MessagePlatform;
    ref_comment_id: number | null;
    is_sent: boolean;
    username: string | null;

    constructor(
        username: string | null,
        commentId: number,
        prId: number,
        platform: MessagePlatform,
        isSent: boolean,
        refCommentId: number | null = null
    ) {
        this.username = username;
        this.comment_id = commentId;
        this.pr_id = prId;
        this.platform = platform;
        this.is_sent = isSent;
        this.ref_comment_id = refCommentId;
    }

    private setId(id: number): void {
        this.id = id;
    }

    private setCommentId(commentId: number): void {
        this.comment_id = commentId;
    }

    private setPrId(prId: number): void {
        this.pr_id = prId;
    }

    private setRefCommentId(refCommentId: number): void {
        this.ref_comment_id = refCommentId;
    }

    private setUsername(username: string): void {
        this.username = username;
    }

    private setSent(): void {
        this.is_sent = true;
    }

    private setReceived(): void {
        this.is_sent = false;
    }

    public async save() {
        this.id = await knex
            .knex<Message>('messages')
            .insert({
                username: this.username,
                comment_id: this.comment_id,
                pr_id: this.pr_id,
                platform: this.platform,
                is_sent: this.is_sent,
                ref_comment_id: this.ref_comment_id,
            })
            .into('messages');
    }

    public static buildMessage(message: any): Message {
        var newMessage = new Message(
            message.username,
            message.comment_id,
            message.pr_id,
            message.platform,
            message.is_sent,
            message.ref_comment_id
        );
        newMessage.setId(message.id);
        if (message.is_sent) {
            newMessage.setSent();
        } else {
            newMessage.setReceived();
        }
        return newMessage;
    }

    public static forPr(prId: number, projectSlug: string): Promise<Message[]> {
        return knex
            .knex<Message>('messages')
            .select('*')
            .orderBy('id', 'desc')
            .where('pr_id', prId)
            .where('is_sent', 1)
            .then((messages: Message[]) => {
                return messages.map((message) => Message.buildMessage(message));
            });
    }

    public static all(): Promise<Message[]> {
        return knex
            .knex<Message>('messages')
            .select('*')
            .then((messages: Message[]) => {
                return messages.map((message) => Message.buildMessage(message));
            });
    }

    public async delete() {
        const id: number = this.id || -1;
        await knex.knex<Message>('messages').where('id', id).delete();
    }

    public getPlatform(): MessagePlatform {
        return this.platform;
    }

    public getId(): number {
        return this.id as number;
    }

    public getCommentId(): number {
        return this.comment_id;
    }

    public getPrId(): number {
        return this.pr_id;
    }

    public getRefCommentId(): number | null {
        return this.ref_comment_id;
    }

    public isSent(): boolean {
        return this.is_sent === true;
    }

    public isReceived(): boolean {
        return this.is_sent === false;
    }

    public getUsername(): string | null {
        return this.username;
    }
}
