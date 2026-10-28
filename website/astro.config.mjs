// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { fileURLToPath } from 'node:url';
import { visit } from 'unist-util-visit';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';
import starlightLinksValidator from 'starlight-links-validator';

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
 * Find the heading text in a markdown file by its slug
 * @param {string} fileContent 
 * @param {string} targetHashSlug 
 * @returns {string | null}
 */
function findHeadingTextBySlug(fileContent, targetHashSlug) {
	try {
		// Parse the markdown string into an MDAST (Markdown Abstract Syntax Tree)
		const tree = fromMarkdown(fileContent);
		let matchedHeadingText = null;

		// Walk through the tree to find heading nodes
		// (Using a lightweight custom check instead of full unist-util-visit to keep it fast)
		/** @param {any} node */
		const findHeading = (node) => {
			if (node.type === 'heading') {
				const headingText = toString(node);
				// Replicate standard slugification (lowercase, replace non-alphanumeric/spaces with hyphens)
				const generatedSlug = headingText
					.toLowerCase()
					.replace(/[^a-z0-9\s-]/g, '') // remove special characters
					.replace(/\s+/g, '-');        // convert spaces to hyphens

				if (generatedSlug === targetHashSlug) {
					matchedHeadingText = headingText;
					return true; // Stop searching
				}
			}
			if (node.children) {
				for (const child of node.children) {
					if (findHeading(child)) return true;
				}
			}
			return false;
		};

		findHeading(tree);
		return matchedHeadingText;
	} catch (e) {
		console.error('[AutoTitle] Failed to extract heading text:', e);
		return null;
	}
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
			} else if (linkNode.children.length === 1 && linkNode.children[0].type === 'text') {
				if (!linkNode.children[0].value || String(linkNode.children[0].value).trim() === '') {
					isLinkEmpty = true;
				}
			}

			if (href.startsWith('/') && isLinkEmpty) {
				const hrefWithoutHash = href.split('#')[0];
				const hrefHash = href.includes('#') ? href.split('#')[1] : '';
				const hrefClean = hrefWithoutHash.split('?')[0];

				let cleanSlug = hrefClean.replace(/^\/|\/$/g, '');

				if (cleanSlug.match(/^[a-z]{2}\//)) {
					cleanSlug = cleanSlug.replace(/^[a-z]{2}\//, '');
				}

				const slugSegments = cleanSlug.split('/');
				const baseDocsDir = path.resolve('./src/content/docs/');
				const resolvedDiskPath = resolveRealDiskPath(baseDocsDir, slugSegments);

				let finalPath = null;
				if (resolvedDiskPath) {
					if (fs.existsSync(resolvedDiskPath) && fs.statSync(resolvedDiskPath).isFile()) {
						finalPath = resolvedDiskPath;
					} else {
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
							let displayTitle = String(data.title);

							// If an anchor hash exists, find the explicit heading title
							if (hrefHash) {
								const headingText = findHeadingTextBySlug(fileContent, hrefHash);
								if (headingText) {
									displayTitle = `${displayTitle}: ${headingText}`;
								} else {
									// Fallback if heading layout couldn't be parsed perfectly
									displayTitle = `${displayTitle} (#${hrefHash})`;
								}
							}

							linkNode.children = [{ type: 'text', value: displayTitle }];
							console.log(`[AutoTitle] Successfully resolved title "${displayTitle}" for href: "${href}"`);
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
			],
			plugins: [
				starlightLinksValidator()
			]
		}),
	],
	markdown: {
		remarkPlugins: [remarkStarlightAutoTitles],
	}
});