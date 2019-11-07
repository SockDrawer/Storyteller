/**
 * The User Object
 *
 * @id https://storyteller.sockdrawer.dev/schema/User.json
 */
export interface User {
    /**
     * The numeric user id
     *
     * @minimum 1
     * @TJS-type integer
     */
    uid: number;
    /**
     * The username
     *
     * @pattern ^(\S{5,})$
     * @TJS-type string
     */
    username: string;
}