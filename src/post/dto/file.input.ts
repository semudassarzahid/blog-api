import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FileInput {
  file: any;
}
