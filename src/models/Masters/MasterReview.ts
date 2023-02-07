export class MasterReview {
    id: number;
    stars: number;
    comment: string;
    userName: string;
    userAvatar: string;
    createdAt: string;

    constructor(
        id: number,
        stars: number,
        comment: string,
        userName: string,
        userAvatar: string,
        createdAt: string
    ) {
        this.id = id;
        this.stars = stars;
        this.comment = comment;
        this.userName = userName;
        this.userAvatar = userAvatar;
        this.createdAt = createdAt;
        
    }
}