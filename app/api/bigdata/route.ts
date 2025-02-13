import { NextResponse } from 'next/server';
import bigData from '@/app/about/bigFile';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = 100;
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return NextResponse.json({
    data: bigData.slice(start, end),
    total: bigData.length
  });
} 