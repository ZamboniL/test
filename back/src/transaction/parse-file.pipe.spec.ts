import { BadRequestException } from '@nestjs/common';
import { ParseFilePipe } from './parse-file.pipe';

describe('ParseFilPipe', () => {
  it('should be defined', () => {
    expect(new ParseFilePipe()).toBeDefined();
  });

  it('should throw an error when no file is uploaded', () => {
    const pipe = new ParseFilePipe();
    expect(() => pipe.transform(null)).toThrow(
      'Validation failed (file expected)'
    );
    expect(() => pipe.transform(null)).toThrow(BadRequestException);
  });

  it('should throw an error when file is too big', () => {
    const pipe = new ParseFilePipe();
    const file: Express.Multer.File = {
      buffer: Buffer.alloc(5001),
      fieldname: 'transactions',
      originalname: 'test.txt',
      encoding: '7bit',
      mimetype: 'text/plain',
      destination: 'uploads',
      filename: 'test.txt',
      path: 'uploads/test.txt',
      stream: null,
      size: 5001
    };
    expect(() => pipe.transform(file)).toThrow(
      'Validation failed (file too big)'
    );
    expect(() => pipe.transform(file)).toThrow(BadRequestException);
  });

  it('should throw an error when file is not a text file', () => {
    const pipe = new ParseFilePipe();
    const file: Express.Multer.File = {
      buffer: Buffer.alloc(5000),
      fieldname: 'transactions',
      originalname: 'test.pdf',
      encoding: '7bit',
      destination: 'uploads',
      mimetype: 'application/pdf',
      filename: 'test.pdf',
      path: 'uploads/test.pdf',
      stream: null,
      size: 5000
    };

    expect(() => pipe.transform(file)).toThrow(
      'Validation failed (invalid file type)'
    );
    expect(() => pipe.transform(file)).toThrow(BadRequestException);
  });

  it('should return the file when it is valid', () => {
    const pipe = new ParseFilePipe();
    const file: Express.Multer.File = {
      buffer: Buffer.from(
        '12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS'
      ),
      fieldname: 'transactions',
      originalname: 'test.txt',
      encoding: '7bit',
      destination: 'uploads',
      mimetype: 'text/plain',
      filename: 'test.txt',
      path: 'uploads/test.txt',
      stream: null,
      size: 5000
    };

    expect(pipe.transform(file)).toEqual(file);
  });
});
