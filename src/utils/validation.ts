import { z } from 'zod';
import { isUri } from 'valid-url';

export const urlSchema = z.string().refine((url) => isUri(url), {
  message: 'Please enter a valid URL including http:// or https://',
});