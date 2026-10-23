// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
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
				SiteTitle: './src/components/VersionPicker.astro',
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
});