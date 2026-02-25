import { Controller, Get, Post, Body } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Controller('guestbook')
export class GuestbookController {
  private supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || ''
  );

  @Get()
  async getLogs() {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  }

  @Post()
  async addLog(@Body() body: { name: string; message: string }) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([
        { name: body.name, message: body.message }
      ]);
      
    if (error) throw error;
    return { success: true };
  }
}