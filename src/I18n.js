import React from 'react';

import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

import { messages as EN } from './locales/en/messages.js';

import { messages as ES } from './locales/es/messages.js';

import * as Storage from './utils/storage';

i18n.load({
	en: EN,
	es: ES,
});

const aliases = {
	pt: 'pt-br',
	'zh-cn': 'zh-hans',
};

const getAlias = (lang) => {
	if (lang in aliases) {
		return aliases[lang];
	}

	return lang;
};

const getLanguage = (defaultLanguage, supportedLanguages) => {
	let lang = getAlias(Storage.Get('language'));
	if (supportedLanguages.indexOf(lang) === -1) {
		lang = getAlias(getBrowserLanguage(defaultLanguage));

		if (supportedLanguages.indexOf(lang) === -1) {
			lang = defaultLanguage;
		}
	}

	Storage.Set('language', lang);

	return lang;
};

const getBrowserLanguage = (defaultLanguage) => {
	let lang = window.navigator.language;

	const match = lang.match(/^[a-z]+(-[a-z]+)?/i);
	if (!match) {
		return defaultLanguage;
	}

	return match[0].toLowerCase();
};

i18n.activate(getLanguage('en', ['en','es']));

export default function Provider(props) {
	return <I18nProvider i18n={i18n}>{props.children}</I18nProvider>;
}
