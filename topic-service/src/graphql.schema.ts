
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export abstract class IQuery {
    abstract topic(topicid: string): Topic | Promise<Topic>;

    abstract allTopics(): Topic[] | Promise<Topic[]>;
}

export class Topic {
    topicid: string;
    name: string;
}
