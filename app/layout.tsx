import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import React from 'react';
import { AppShell, ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../theme';

export const metadata = {
	title: 'Pank Katonia Mood Calendar',
	description: 'Meow',
};

export default function RootLayout({ children }: { children: any }) {
	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body>
				<MantineProvider theme={theme}>{children}</MantineProvider>
			</body>
		</html>
	);
}
