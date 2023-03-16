
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface UserRegisterReqDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

export interface CreateCategoryInput {
    title: string;
    description: string;
}

export interface UpdateCategoryInput {
    title?: Nullable<string>;
    description?: Nullable<string>;
    id: number;
}

export interface CreatePostInput {
    title: string;
    description: string;
    published: boolean;
}

export interface UpdatePostInput {
    title?: Nullable<string>;
    description?: Nullable<string>;
    published?: Nullable<boolean>;
    id: number;
    slug: string;
}

export interface CreateCommentInput {
    message: string;
    postId?: Nullable<number>;
    parentId?: Nullable<string>;
}

export interface UpdateCommentInput {
    message?: Nullable<string>;
    postId?: Nullable<number>;
    parentId?: Nullable<string>;
    id: number;
}

export interface UserJwtPayloadDto {
    id?: Nullable<number>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    role?: Nullable<string>;
    password?: Nullable<string>;
    isActive?: Nullable<boolean>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface Comment {
    id: number;
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    message?: Nullable<string>;
    author?: Nullable<UserJwtPayloadDto>;
    likes?: Nullable<number>;
    dislikes?: Nullable<number>;
    parent?: Nullable<Comment>;
}

export interface Category {
    id: number;
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    title?: Nullable<string>;
    description?: Nullable<string>;
}

export interface Post {
    id: number;
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    title: string;
    description: string;
    published: boolean;
    publishedAt?: Nullable<DateTime>;
    slug?: Nullable<string>;
    trashed?: Nullable<DateTime>;
    postMedia?: Nullable<string>;
    postMediaType?: Nullable<string>;
    author?: Nullable<UserJwtPayloadDto>;
}

export interface UserRegisterResponseDto {
    status?: Nullable<number>;
    message?: Nullable<string>;
    deleted?: Nullable<boolean>;
    user?: Nullable<UserJwtPayloadDto>;
    token?: Nullable<string>;
}

export interface UserLoginResponseDto {
    status?: Nullable<number>;
    message?: Nullable<string>;
    deleted?: Nullable<boolean>;
    token: string;
}

export interface PostResponseDto {
    status?: Nullable<number>;
    message?: Nullable<string>;
    deleted?: Nullable<boolean>;
    post?: Nullable<Post>;
    posts?: Nullable<Post[]>;
}

export interface CommentResponseDto {
    status?: Nullable<number>;
    message?: Nullable<string>;
    deleted?: Nullable<boolean>;
    comment?: Nullable<Comment>;
    comments?: Nullable<Comment[]>;
}

export interface CategoryResponseDto {
    status?: Nullable<number>;
    message?: Nullable<string>;
    deleted?: Nullable<boolean>;
    category?: Nullable<Category>;
    categories?: Nullable<Category[]>;
}

export interface IQuery {
    index(): string | Promise<string>;
    getUser(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    getAdmin(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    getAuthLoggedUser(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    jwtStrategyGetUser(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    findAllCategories(): CategoryResponseDto | Promise<CategoryResponseDto>;
    findOneCategory(id: number): CategoryResponseDto | Promise<CategoryResponseDto>;
    post(): Post[] | Promise<Post[]>;
    findAllPosts(): PostResponseDto | Promise<PostResponseDto>;
    findOnePost(id: number): PostResponseDto | Promise<PostResponseDto>;
    findOneComment(id: number): CommentResponseDto | Promise<CommentResponseDto>;
}

export interface IMutation {
    register(data: UserRegisterReqDto): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    login(email: string, password: string): UserLoginResponseDto | Promise<UserLoginResponseDto>;
    localStrategyLogin(username: string, password: string): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    localStrategyGetUser(username: string, password: string): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    jwtLogin(username: string, password: string): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    createCategory(createCategoryInput: CreateCategoryInput): CategoryResponseDto | Promise<CategoryResponseDto>;
    updateCategory(updateCategoryInput: UpdateCategoryInput): CategoryResponseDto | Promise<CategoryResponseDto>;
    removeCategory(id: number): CategoryResponseDto | Promise<CategoryResponseDto>;
    createPost(createPostInput: CreatePostInput): PostResponseDto | Promise<PostResponseDto>;
    updatePost(updatePostInput: UpdatePostInput): PostResponseDto | Promise<PostResponseDto>;
    removePost(id: number): PostResponseDto | Promise<PostResponseDto>;
    createComment(createCommentInput: CreateCommentInput): CommentResponseDto | Promise<CommentResponseDto>;
    updateComment(updateCommentInput: UpdateCommentInput): CommentResponseDto | Promise<CommentResponseDto>;
    removeComment(id: number): CommentResponseDto | Promise<CommentResponseDto>;
}

export type DateTime = any;
type Nullable<T> = T | null;
