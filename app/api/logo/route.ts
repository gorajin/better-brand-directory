import { NextRequest, NextResponse } from 'next/server';

/**
 * Secure API route to fetch brand logos from Brandfetch API
 * Keeps API key server-side only
 * 
 * Usage: GET /api/logo?domain=naturepedic.com
 */

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const domain = searchParams.get('domain');

    if (!domain) {
        return NextResponse.json(
            { error: 'Domain parameter is required' },
            { status: 400 }
        );
    }

    const apiKey = process.env.BRANDFETCH_API_KEY;

    if (!apiKey) {
        console.error('BRANDFETCH_API_KEY not configured');
        return NextResponse.json(
            { error: 'API not configured' },
            { status: 500 }
        );
    }

    try {
        // Clean the domain (remove protocol if present)
        const cleanDomain = domain
            .replace(/^https?:\/\//, '')
            .replace(/^www\./, '')
            .split('/')[0];

        const response = await fetch(
            `https://api.brandfetch.io/v2/brands/${cleanDomain}`,
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                },
                // Cache for 24 hours
                next: { revalidate: 86400 },
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                return NextResponse.json(
                    { error: 'Brand not found', logoUrl: null },
                    { status: 404 }
                );
            }
            throw new Error(`Brandfetch API error: ${response.status}`);
        }

        const data = await response.json();

        // Extract the best logo URL
        // Priority: icon > logo > symbol
        let logoUrl: string | null = null;

        if (data.logos && data.logos.length > 0) {
            // Find icon format first (usually square, best for avatars)
            const icon = data.logos.find((l: any) => l.type === 'icon');
            const logo = data.logos.find((l: any) => l.type === 'logo');
            const symbol = data.logos.find((l: any) => l.type === 'symbol');

            const preferred = icon || symbol || logo;

            if (preferred && preferred.formats && preferred.formats.length > 0) {
                // Prefer PNG or SVG
                const pngFormat = preferred.formats.find((f: any) => f.format === 'png');
                const svgFormat = preferred.formats.find((f: any) => f.format === 'svg');

                logoUrl = pngFormat?.src || svgFormat?.src || preferred.formats[0]?.src;
            }
        }

        return NextResponse.json({
            logoUrl,
            name: data.name,
            domain: cleanDomain,
        });

    } catch (error) {
        console.error('Error fetching logo:', error);
        return NextResponse.json(
            { error: 'Failed to fetch logo', logoUrl: null },
            { status: 500 }
        );
    }
}
