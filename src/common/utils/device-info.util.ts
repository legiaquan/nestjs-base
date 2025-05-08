import { Request } from 'express';

export interface DeviceInfo {
  userAgent: string;
  ipAddress: string;
  platform: string;
  browser: string;
}

export const extractDeviceInfo = (req: Request): DeviceInfo => {
  const forwardedFor = req.headers['x-forwarded-for'];
  const ipAddress = forwardedFor
    ? (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor).split(',')[0]
    : req.socket.remoteAddress || '';

  return {
    userAgent: req.headers['user-agent'] || '',
    ipAddress,
    platform: req.headers['sec-ch-ua-platform']?.toString() || '',
    browser: req.headers['sec-ch-ua']?.toString() || '',
  };
};
