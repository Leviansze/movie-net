import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validasi data
    if (!body.title || !body.description || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format data untuk penyimpanan
    const report = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description,
      pageUrl: body.pageUrl || 'N/A',
      email: body.email,
      priority: body.priority || 'medium',
      timestamp: body.timestamp,
      userAgent: request.headers.get('user-agent'),
    };

    // Simpan ke file (development) atau database (production)
    const reportsDir = path.join(process.cwd(), 'reports');
    
    // Buat folder jika belum ada
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    // Simpan laporan sebagai JSON file
    const filePath = path.join(reportsDir, `report-${report.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(report, null, 2));

    // Log ke console juga
    console.log('📋 New Bug Report:', report);

    // TODO: Kirim email notification ke admin
    // TODO: Simpan ke database

    return NextResponse.json(
      { 
        success: true, 
        message: 'Report submitted successfully',
        reportId: report.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing report:', error);
    return NextResponse.json(
      { error: 'Failed to submit report' },
      { status: 500 }
    );
  }
}
