import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from './jwt.service';

describe('JwtService', () => {
  let jwtService: JwtService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        NestJwtModule.register({
          secret: 'test',
        }),
      ],
      providers: [JwtService],
    }).compile();

    jwtService = app.get<JwtService>(JwtService);
  });

  describe('sign', () => {
    it('should sign jwt', () => {
      expect(typeof jwtService.sign('test')).toBe('string');
    });
  });
});
