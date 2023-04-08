import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseFilePipe implements PipeTransform {
  transform(files: Express.Multer.File): Express.Multer.File {
    if (files === undefined || files === null || files.size === 0) {
      throw new BadRequestException('Validation failed (file expected)');
    }

    if (files.size > 5000) {
      throw new BadRequestException('Validation failed (file too big)');
    }

    if (files.mimetype !== 'text/plain') {
      throw new BadRequestException('Validation failed (invalid file type)');
    }

    return files;
  }
}
