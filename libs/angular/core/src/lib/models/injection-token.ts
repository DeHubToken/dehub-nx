import { InjectionToken } from '@angular/core';
import { Env } from '@dehub/shared/config';

export const EnvToken = new InjectionToken<Env>('DeHub Environment');
