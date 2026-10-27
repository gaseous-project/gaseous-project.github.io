import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

/**
 * Recursively sorts the sidebar items before they ever hit the components
 */
function sortSidebarItems(entries: any): any {
    if (!Array.isArray(entries)) return;

    return [...entries]
        .sort((a, b) => {
            const orderA = a.attrs?.order ?? a.order ?? Infinity;
            const orderB = b.attrs?.order ?? b.order ?? Infinity;

            if (orderA !== orderB) {
                return orderA - orderB;
            }

            const labelA = String(a.label || '').toLowerCase();
            const labelB = String(b.label || '').toLowerCase();

            return labelA.localeCompare(labelB);
        })
        .map(entry => {
            if (entry.type === 'group' && Array.isArray(entry.entries)) {
                return {
                    ...entry,
                    entries: sortSidebarItems(entry.entries)
                };
            }
            return entry;
        });
}

export const onRequest = defineRouteMiddleware((context) => {
    // FIXED: Access starlightRoute via context.locals
    if (context.locals.starlightRoute?.sidebar) {
        context.locals.starlightRoute.sidebar = sortSidebarItems(
            context.locals.starlightRoute.sidebar
        );
    }
});