// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { fileURLToPath } from 'node:url';
import { visit } from 'unist-util-visit';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Helper to dynamically resolve a slugified URL path to the real, case-sensitive/spaced disk path
 * @param {string} currentDir 
 * @param {string[]} segments 
 * @returns {string | null}
 */
function resolveRealDiskPath(currentDir, segments) {
	if (segments.length === 0) return currentDir;

	const targetSegment = segments[0];
	if (!fs.existsSync(currentDir)) return null;

	const items = fs.readdirSync(currentDir);

	for (const item of items) {
		// Replicate Astro's slugification: lowercase and swap spaces for hyphens
		const slugifiedItem = item.toLowerCase().replace(/\s+/g, '-');

		// Check for exact segment match or matching file extension
		if (slugifiedItem === targetSegment || slugifiedItem === `${targetSegment}.md` || slugifiedItem === `${targetSegment}.mdx`) {
			const nextDir = path.join(currentDir, item);

			// If it's the last segment, we found our file or folder!
			if (segments.length === 1) {
				return nextDir;
			}

			// Otherwise, keep digging recursively
			const deepPath = resolveRealDiskPath(nextDir, segments.slice(1));
			if (deepPath) return deepPath;
		}
	}

	return null;
}

/**
 * Robust Remark plugin to automatically fill empty markdown link brackets in Starlight
 * @returns {(tree: import('unist').Node) => void}
 */
function remarkStarlightAutoTitles() {
	console.log('[AutoTitle] Remark plugin initialized.');

	return (tree) => {
		visit(tree, 'link', (node) => {
			/** @type {any} */
			const linkNode = node;
			let href = String(linkNode.url || '');

			let isLinkEmpty = false;
			if (!linkNode.children || linkNode.children.length === 0) {
				isLinkEmpty = true;
			} else if (linkNode.children.length === 1 && linkNode.children.type === 'text') {
				if (!linkNode.children.value || String(linkNode.children.value).trim() === '') {
					isLinkEmpty = true;
				}
			}

			if (href.startsWith('/') && isLinkEmpty) {
				const hrefWithoutHash = href.split('#')[0]; // Extract path before the '#'
				const hrefHash = href.includes('#') ? href.split('#')[1] : '';
				const hrefClean = hrefWithoutHash.split('?')[0]; // Extract path before the '?'

				let cleanSlug = hrefClean.replace(/^\/|\/$/g, '');

				if (cleanSlug.match(/^[a-z]{2}\//)) {
					cleanSlug = cleanSlug.replace(/^[a-z]{2}\//, '');
				}

				// Split the slug into separate directory pieces: ['v1', 'user-guides', 'signatures']
				const slugSegments = cleanSlug.split('/');
				const baseDocsDir = path.resolve('./src/content/docs/');

				// Find the actual directory or base file path on your Mac
				const resolvedDiskPath = resolveRealDiskPath(baseDocsDir, slugSegments);

				let finalPath = null;
				if (resolvedDiskPath) {
					if (fs.existsSync(resolvedDiskPath) && fs.statSync(resolvedDiskPath).isFile()) {
						finalPath = resolvedDiskPath;
					} else {
						// If it matched a folder, check for index fallbacks inside it
						const indexMd = path.join(resolvedDiskPath, 'index.md');
						const indexMdx = path.join(resolvedDiskPath, 'index.mdx');
						if (fs.existsSync(indexMd)) finalPath = indexMd;
						else if (fs.existsSync(indexMdx)) finalPath = indexMdx;
					}
				}

				if (finalPath) {
					try {
						const fileContent = fs.readFileSync(finalPath, 'utf-8');
						const { data } = matter(fileContent);

						if (data && data.title) {
							if (hrefHash) {
								linkNode.children = [{ type: 'text', value: String(data.title) + '#' + hrefHash }];
							} else {
								linkNode.children = [{ type: 'text', value: String(data.title) }];
							}
							console.log(`[AutoTitle] Successfully resolved title "${data.title}" for href: "${href}"`);
						}
					} catch (err) {
						console.error(`[AutoTitle] Error reading frontmatter at: ${finalPath}`);
					}
				} else {
					console.warn(`[AutoTitle Missing File] Could not map slug segments [${slugSegments.join(', ')}] to your hard drive layout for href: "${href}"`);
				}
			}
		});
	};
}

// https://astro.build/config
export default defineConfig({
	// redirects: {
	// 	'/v1/': '/v1/user-guides/',
	// 	'/v2/': '/v2/user-guides/',
	// },
	integrations: [
		starlight({
			title: 'Gaseous Games',
			logo: {
				src: './src/assets/logo.png',
				replacesTitle: true
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/gaseous-project/gaseous-server' },
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/Nhu7wpT3k4' }
			],
			routeMiddleware: [
				fileURLToPath(new URL('./src/routeData.ts', import.meta.url))
			],
			components: {
				SiteTitle: './src/components/VersionPicker.astro'
			},
			sidebar: [
				{
					label: 'v2.0',
					items: [
						{ autogenerate: { directory: 'v2' } }
					],
				},
				{
					label: 'v1.7 and Earlier',
					items: [
						{ autogenerate: { directory: 'v1' } }
					],
				}
			]
		}),
	],
	markdown: {
		remarkPlugins: [remarkStarlightAutoTitles],
	}
});