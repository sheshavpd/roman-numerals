import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { RomanController } from './roman.controller';
import { RomanService } from '../services/roman.service';

describe('RomanController', () => {
  let controller: RomanController;
  let mockRomanService: RomanService;

  let mockReq: Request;
  let mockRes: Response;
  let statusMock: Mock;
  let jsonMock: Mock;
  let sendMock: Mock;

  beforeEach(() => {
    mockRomanService = {
      toRomanNumeral: vi.fn(),
    };

    controller = new RomanController(mockRomanService as RomanService);

    statusMock = vi.fn().mockReturnThis();
    jsonMock = vi.fn();
    sendMock = vi.fn();

    mockReq = {} as Request;
    mockRes = {
      status: statusMock,
      json: jsonMock,
      send: sendMock,
    } as unknown as Response;
  });

  it('should return 400 if "query" param is missing', () => {
    mockReq.query = {};
    controller.getRomanNumeral(mockReq, mockRes);
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      error: 'Missing required query parameter "query".',
    });
  });

  it('should return 400 if "query" is not an integer', () => {
    mockReq.query = { query: 'abc' };
    controller.getRomanNumeral(mockReq, mockRes);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      error: 'Invalid input "abc". Must be an integer.',
    });
  });

  it('should call the service and return JSON when valid query is provided', () => {
    mockReq.query = { query: '10' };
    vi.mocked(mockRomanService.toRomanNumeral).mockReturnValue('X');

    controller.getRomanNumeral(mockReq, mockRes);

    expect(mockRomanService.toRomanNumeral).toHaveBeenCalledWith(10);
    expect(jsonMock).toHaveBeenCalledWith({
      input: '10',
      output: 'X',
    });
  });

  it('should return 422 if service throws an out-of-range error', () => {
    mockReq.query = { query: '4000' };
    vi.mocked(mockRomanService.toRomanNumeral).mockImplementation(() => {
      throw new Error(
        'Input out of range. Must be an integer between 1 and 3999.',
      );
    });

    controller.getRomanNumeral(mockReq, mockRes);

    expect(statusMock).toHaveBeenCalledWith(422);
    expect(jsonMock).toHaveBeenCalledWith({
      error: 'Input out of range. Must be an integer between 1 and 3999.',
    });
  });
});
