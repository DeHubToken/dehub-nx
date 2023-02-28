import { Inject, Injectable } from '@angular/core';
import {
  EnvToken,
  ILoggerService,
  LoggerSupabaseToken,
} from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { SupabaseJwt } from '@dehub/shared/model';
import { getSupabase } from '@dehub/shared/utils';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private _supabase = getSupabase(
    this.env.supabase.supabaseApiUrl,
    this.env.supabase.supabasePublicAnonKey,
    localStorage.getItem(SupabaseJwt)
  );

  constructor(
    @Inject(EnvToken) private readonly env: SharedEnv,
    @Inject(LoggerSupabaseToken) private logger: ILoggerService
  ) {}

  get supabase() {
    return this._supabase;
  }
}
