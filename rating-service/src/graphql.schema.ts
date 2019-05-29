
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export abstract class IMutation {
    abstract calculateRating(userid: string, ratingTransmutation: number): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract rating(userid: string): Rating | Promise<Rating>;
}

export class Rating {
    rating: number;
}
