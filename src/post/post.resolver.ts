import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../guard/gql-jwt-auth.guard';
import { CurrentUser } from '../utils/current-user.decorator';
import { UserRegisterResponseDto } from '../user/dto/user-register-response.dto';
import { UserJwtPayloadDto } from '../user/dto/user-jwt-payload.dto';
import { User } from '../user/entity/user.entity';
import { PostResponseDto } from './dto/post-response.dto';

@Resolver(() => Post)
@UseGuards(GqlJwtAuthGuard)
export class PostResolver {
  /**
   * @param postService
   */
  constructor(private readonly postService: PostService) {}

  /**
   * @param user
   * @param createPostInput
   */
  @Mutation(() => PostResponseDto)
  async createPost(
    @CurrentUser() user: User,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<PostResponseDto> {
    const post = await this.postService.create(createPostInput, user);
    return { message: 'success!', status: 200, post: post };
  }

  @Query(() => [Post], { name: 'post' })
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  /**
   * @param updatePostInput
   */
  @Mutation(() => PostResponseDto)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.remove(id);
  }
}
