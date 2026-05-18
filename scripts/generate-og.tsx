import React from 'react';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'fs';
import { join } from 'path';

const WIDTH = 1200;
const HEIGHT = 630;

/** Fetch a Google Font as ArrayBuffer for Satori */
async function fetchFont(family: string, weight: number): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weight}&display=swap`;
  
  // Use a legacy User-Agent to force Google Fonts to return standard TrueType (.ttf) format
  const css = await (await fetch(cssUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
    },
  })).text();

  const match = css.match(/src:\s*url\(([^)]+)\)/);
  if (!match) throw new Error(`Could not resolve font ${family} ${weight}\nResponse CSS:\n${css}`);
  
  const fontUrl = match[1]!.replace(/['"]/g, '');
  return await (await fetch(fontUrl)).arrayBuffer();
}

async function generate() {
  const [inter400, inter700] = await Promise.all([
    fetchFont('Inter', 400),
    fetchFont('Inter', 700),
  ]);

  const svg = await satori(
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#09090b',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Top-right ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 480,
          height: 480,
          borderRadius: '50%',
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)',
        }}
      />
      {/* Bottom-left ambient glow */}
      <div
        style={{
          position: 'absolute',
          bottom: -180,
          left: -120,
          width: 560,
          height: 560,
          borderRadius: '50%',
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Glassmorphism card */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          padding: '44px 72px',
          borderRadius: 24,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.12)',
          backgroundColor: 'rgba(24, 24, 27, 0.85)',
          boxShadow: '0 0 60px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            textAlign: 'center',
          }}
        >
          Sushant Chaudhary
        </div>

        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: '#a1a1aa',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          AI Developer & Student Builder
        </div>

        <div
          style={{
            marginTop: 12,
            display: 'flex',
            gap: 14,
            fontSize: 17,
            color: '#71717a',
            fontFamily: 'monospace',
            letterSpacing: '0.02em',
          }}
        >
          <span>Python</span>
          <span style={{ color: '#52525b' }}>·</span>
          <span>Claude</span>
          <span style={{ color: '#52525b' }}>·</span>
          <span>n8n</span>
          <span style={{ color: '#52525b' }}>·</span>
          <span>Supabase</span>
        </div>
      </div>

      {/* Bottom edge light */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundImage:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
        }}
      />
    </div>,
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: 'Inter', data: inter400, weight: 400, style: 'normal' },
        { name: 'Inter', data: inter700, weight: 700, style: 'normal' },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const outPath = join(process.cwd(), 'public', 'og-image.png');
  writeFileSync(outPath, pngBuffer);
  console.log('✅ OG image generated:', outPath);
}

generate().catch((err) => {
  console.error('❌ OG generation failed:', err);
  process.exit(1);
});
