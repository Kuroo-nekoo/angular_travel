import { environment } from 'environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  signIn(credential: { email: string; password: string }) {
    return this.supabase.auth.signInWithPassword(credential);
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  signUp(credential: { email: string; password: string }) {
    return this.supabase.auth.signUp(credential);
  }
}
