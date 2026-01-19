declare module 'next/cache' {
  // allow older call sites that use a single argument
  export function revalidateTag(tag: string, profile?: string | any): undefined;
}