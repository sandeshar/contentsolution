import { NextRequest } from 'next/server'
import path from 'path'
import fs from 'fs/promises'

export const runtime = 'nodejs'

const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = new Set([
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/svg+xml',
    'image/x-icon',
    'image/vnd.microsoft.icon',
])

function getEnvUploadDir() {
    const dir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads')
    // If relative path, resolve from project root
    return path.isAbsolute(dir) ? dir : path.join(process.cwd(), dir)
}

function getBaseUrl() {
    // Prefer explicit upload base, fallback to NEXT_PUBLIC_BASE_URL
    const base = process.env.UPLOAD_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || ''
    return base.replace(/\/$/, '')
}

function getSafeExtension(filename: string): string {
    const ext = path.extname(filename || '').toLowerCase()
    if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico'].includes(ext)) return ext
    return '.bin'
}

async function saveOne(file: File, folder: string) {
    const contentType = (file as any).type as string | undefined
    const size = (file as any).size as number | undefined
    if (!contentType || !ALLOWED_TYPES.has(contentType)) {
        throw new Error('Unsupported file type')
    }
    if (!size || size > MAX_SIZE_BYTES) {
        throw new Error('File too large (max 5MB)')
    }
    const arrayBuffer = await (file as any).arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const uploadsRoot = getEnvUploadDir()
    const targetDir = path.join(uploadsRoot, folder)
    await fs.mkdir(targetDir, { recursive: true })
    const originalName = (file as any).name as string | undefined
    const ext = getSafeExtension(originalName || '')
    const base = (originalName || 'upload').replace(/[^a-zA-Z0-9-_]/g, '').slice(0, 32) || 'file'
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const filename = `${base}-${unique}${ext}`
    const targetPath = path.join(targetDir, filename)
    await fs.writeFile(targetPath, buffer)
    const baseUrl = getBaseUrl()
    let publicPath = ''
    const uploadsRootNormalized = uploadsRoot.replace(/\\/g, '/')
    const isUnderPublic = uploadsRootNormalized.includes('/public/') || uploadsRootNormalized.endsWith('/public')
    const folderClean = folder.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '')
    const relative = `${folderClean ? folderClean + '/' : ''}${filename}`
    if (baseUrl) {
        publicPath = `${baseUrl}/${relative}`.replace(/([^:]\/)\/+/, '$1/')
    } else if (isUnderPublic) {
        const idx = uploadsRootNormalized.lastIndexOf('/public')
        const afterPublic = idx >= 0 ? uploadsRootNormalized.substring(idx + '/public'.length) : '/uploads'
        const basePath = afterPublic || '/uploads'
        publicPath = `${basePath}/${relative}`.replace(/\/\/+/, '/')
    } else {
        publicPath = `file://${targetPath}`
    }
    return publicPath
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const entryFiles: File[] = []
        const single = formData.get('file') as unknown as File | null
        if (single) entryFiles.push(single)
        // Support multiple 'file' entries
        for (const [key, value] of formData.entries()) {
            if (key === 'file' && value && typeof (value as any).arrayBuffer === 'function') {
                const f = value as unknown as File
                if (!entryFiles.includes(f)) entryFiles.push(f)
            }
        }
        // Support files[] array field
        const filesField = formData.getAll('files')
        for (const v of filesField) {
            if (v && typeof (v as any).arrayBuffer === 'function') {
                entryFiles.push(v as unknown as File)
            }
        }
        const folder = (formData.get('folder') as string | null)?.replace(/[^a-zA-Z0-9-_//]/g, '') || ''

        if (entryFiles.length === 0) {
            return new Response(JSON.stringify({ error: 'No files provided. Use "file" or "files" fields.' }), { status: 400 })
        }

        const urls: string[] = []
        for (const f of entryFiles) {
            try {
                const url = await saveOne(f, folder)
                urls.push(url)
            } catch (e: any) {
                return new Response(JSON.stringify({ error: e.message || 'Upload failed for one file' }), { status: 400 })
            }
        }

        const body = urls.length === 1 ? { url: urls[0] } : { urls }
        return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } })
    } catch (err) {
        console.error('Upload error:', err)
        return new Response(JSON.stringify({ error: 'Upload failed.' }), { status: 500 })
    }
}
