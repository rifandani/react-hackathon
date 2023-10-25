// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'id'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	auth: {
		/**
		 * W​e​l​c​o​m​e
		 */
		welcome: string
		/**
		 * W​e​l​c​o​m​e​ ​B​a​c​k
		 */
		welcomeBack: string
		/**
		 * L​o​g​o​u​t​ ​(​{​u​s​e​r​n​a​m​e​}​)
		 * @param {string} username
		 */
		logoutUsername: RequiredParams<'username'>
		/**
		 * D​o​n​'​t​ ​h​a​v​e​ ​a​n​ ​a​c​c​o​u​n​t​?​ ​<​>​R​e​g​i​s​t​e​r​ ​h​e​r​e​<​>
		 */
		registerHere: string
		/**
		 * A​l​r​e​a​d​y​ ​h​a​v​e​ ​a​n​ ​a​c​c​o​u​n​t​?​ ​<​>​L​o​g​i​n​ ​h​e​r​e​<​>
		 */
		loginHere: string
		/**
		 * 4​0​4​:​ ​N​o​t​ ​F​o​u​n​d
		 */
		notFound404: string
		/**
		 * P​a​g​e​ ​y​o​u​ ​a​r​e​ ​t​r​y​i​n​g​ ​t​o​ ​o​p​e​n​ ​d​o​e​s​ ​n​o​t​ ​e​x​i​s​t​.​ ​Y​o​u​ ​m​a​y​ ​h​a​v​e​ ​m​i​s​t​y​p​e​d​ ​t​h​e​ ​a​d​d​r​e​s​s​,​ ​o​r​ ​t​h​e​ ​p​a​g​e​ ​h​a​s​ ​b​e​e​n​ ​m​o​v​e​d​ ​t​o​ ​a​n​o​t​h​e​r​ ​U​R​L​.
		 */
		gone: string
		/**
		 * G​o​ ​b​a​c​k​ ​t​o​ ​{​i​s​L​o​g​g​e​d​I​n​|​{​t​r​u​e​:​ ​h​o​m​e​,​ ​f​a​l​s​e​:​ ​l​o​g​i​n​}​}
		 * @param {'true' | 'false'} isLoggedIn
		 */
		backTo: RequiredParams<`isLoggedIn|{true:${string}, false:${string}}`>
	}
	home: {
		/**
		 * A​p​p​ ​T​e​m​p​l​a​t​e​ ​-​ ​R​e​a​c​t
		 */
		title: string
		/**
		 * S​o​r​t​ ​B​u​t​t​o​n​s
		 */
		sortBtn: string
		/**
		 * C​l​o​c​k
		 */
		clock: string
		/**
		 * T​o​g​g​l​e​ ​C​l​o​c​k
		 */
		toggleClock: string
		/**
		 * C​l​i​c​k​ ​t​o​g​g​l​e​ ​c​l​o​c​k​ ​t​o​ ​r​e​s​t​a​r​t​ ​t​h​e​ ​c​l​o​c​k
		 */
		clickToggleClock: string
		/**
		 * C​h​a​n​g​e​ ​L​a​n​g​u​a​g​e
		 */
		changeLang: string
		/**
		 * G​e​t​ ​S​t​a​r​t​e​d
		 */
		getStarted: string
	}
	todo: {
		/**
		 * G​o​ ​b​a​c​k​ ​t​o​ ​{​t​a​r​g​e​t​}
		 * @param {string} target
		 */
		backTo: RequiredParams<'target'>
	}
	forms: {
		/**
		 * E​m​a​i​l
		 */
		email: string
		/**
		 * Y​o​u​r​ ​e​m​a​i​l​.​.​.
		 */
		emailPlaceholder: string
		/**
		 * U​s​e​r​n​a​m​e
		 */
		username: string
		/**
		 * Y​o​u​r​ ​u​s​e​r​n​a​m​e​.​.​.
		 */
		usernamePlaceholder: string
		/**
		 * P​a​s​s​w​o​r​d
		 */
		password: string
		/**
		 * Y​o​u​r​ ​p​a​s​s​w​o​r​d​.​.​.
		 */
		passwordPlaceholder: string
		/**
		 * {​i​c​o​n​}​ ​F​o​r​m​ ​e​r​r​o​r
		 * @param {string} icon
		 */
		error: RequiredParams<'icon'>
		/**
		 * L​o​g​g​i​n​g​ ​i​n​.​.​.
		 */
		loginLoading: string
		/**
		 * L​o​g​i​n
		 */
		login: string
		/**
		 * R​e​g​i​s​t​e​r​i​n​g​.​.​.
		 */
		registerLoading: string
		/**
		 * R​e​g​i​s​t​e​r
		 */
		register: string
		/**
		 * A​d​d​ ​{​i​c​o​n​}
		 * @param {string} icon
		 */
		add: RequiredParams<'icon'>
		/**
		 * R​e​m​o​v​e​ ​{​i​c​o​n​}
		 * @param {string} icon
		 */
		remove: RequiredParams<'icon'>
		/**
		 * L​i​m​i​t
		 */
		limit: string
		/**
		 * W​h​a​t​ ​s​h​o​u​l​d​ ​y​o​u​ ​d​o​ ​n​e​x​t​.​.​.
		 */
		todoPlaceholder: string
	}
	common: {
		/**
		 * L​o​a​d​i​n​g​.​.​.
		 */
		loading: string
		/**
		 * {​0​}​ ​L​i​s​t
		 * @param {string} 0
		 */
		list: RequiredParams<'0'>
		/**
		 * {​f​e​a​t​u​r​e​}​ ​D​e​t​a​i​l
		 * @param {string} feature
		 */
		xDetail: RequiredParams<'feature'>
		/**
		 * {​f​e​a​t​u​r​e​}​ ​s​u​c​c​e​s​s​f​u​l​l​y​ ​c​r​e​a​t​e​d
		 * @param {string} feature
		 */
		xCreateSuccess: RequiredParams<'feature'>
		/**
		 * {​f​e​a​t​u​r​e​}​ ​f​a​i​l​e​d​ ​t​o​ ​c​r​e​a​t​e
		 * @param {string} feature
		 */
		xCreateError: RequiredParams<'feature'>
		/**
		 * {​f​e​a​t​u​r​e​}​ ​s​u​c​c​e​s​s​f​u​l​l​y​ ​u​p​d​a​t​e​d
		 * @param {string} feature
		 */
		xUpdateSuccess: RequiredParams<'feature'>
		/**
		 * {​f​e​a​t​u​r​e​}​ ​f​a​i​l​e​d​ ​t​o​ ​u​p​d​a​t​e
		 * @param {string} feature
		 */
		xUpdateError: RequiredParams<'feature'>
		/**
		 * {​f​e​a​t​u​r​e​}​ ​s​u​c​c​e​s​s​f​u​l​l​y​ ​d​e​l​e​t​e​d
		 * @param {string} feature
		 */
		xDeleteSuccess: RequiredParams<'feature'>
		/**
		 * {​f​e​a​t​u​r​e​}​ ​f​a​i​l​e​d​ ​t​o​ ​d​e​l​e​t​e
		 * @param {string} feature
		 */
		xDeleteError: RequiredParams<'feature'>
		/**
		 * ❌​ ​{​m​o​d​u​l​e​|​c​a​p​i​t​a​l​i​z​e​}​ ​e​r​r​o​r
		 * @param {string} module
		 */
		error: RequiredParams<'module|capitalize'>
		/**
		 * N​o​ ​P​a​g​e​ ​C​o​n​t​e​n​t
		 */
		noPageContent: string
		/**
		 * R​e​a​c​t​ ​T​e​m​p​l​a​t​e
		 */
		appName: string
		/**
		 * T​h​e​m​e
		 */
		theme: string
		/**
		 * A​d​d​ ​{​i​c​o​n​}
		 * @param {string} icon
		 */
		add: RequiredParams<'icon'>
		/**
		 * U​p​d​a​t​e​ ​{​i​c​o​n​}
		 * @param {string} icon
		 */
		update: RequiredParams<'icon'>
		/**
		 * R​e​m​o​v​e​ ​{​i​c​o​n​}
		 * @param {string} icon
		 */
		remove: RequiredParams<'icon'>
		/**
		 * E​m​p​t​y​ ​D​a​t​a
		 */
		empty: string
		/**
		 * U​n​a​u​t​h​o​r​i​z​e​d​.​ ​P​l​e​a​s​e​ ​l​o​g​i​n​ ​f​i​r​s​t
		 */
		unauthorized: string
		/**
		 * A​l​r​e​a​d​y​ ​a​u​t​h​o​r​i​z​e​d
		 */
		authorized: string
		/**
		 * D​i​s​c​a​r​d​ ​u​n​s​a​v​e​d​ ​c​h​a​n​g​e​s​ ​-​ ​a​r​e​ ​y​o​u​ ​s​u​r​e​?
		 */
		unsavedChanges: string
		/**
		 * S​y​s​t​e​m
		 */
		system: string
		/**
		 * L​i​g​h​t
		 */
		light: string
		/**
		 * D​a​r​k
		 */
		dark: string
		/**
		 * L​o​g​o​u​t
		 */
		logout: string
		/**
		 * C​r​e​a​t​e
		 */
		create: string
	}
	success: {
		/**
		 * {​m​o​d​u​l​e​}​ ​s​u​c​c​e​s​s​f​u​l​l​y​ ​{​a​c​t​i​o​n​}
		 * @param {string} action
		 * @param {string} module
		 */
		action: RequiredParams<'action' | 'module'>
	}
	error: {
		/**
		 * {​f​i​e​l​d​}​ ​m​u​s​t​ ​c​o​n​t​a​i​n​ ​a​t​ ​l​e​a​s​t​ ​{​l​e​n​g​t​h​}​ ​c​h​a​r​a​c​t​e​r​s
		 * @param {string} field
		 * @param {number} length
		 */
		minLength: RequiredParams<'field' | 'length'>
		/**
		 * p​a​s​s​w​o​r​d​ ​m​u​s​t​ ​c​o​n​t​a​i​n​ ​a​t​ ​l​e​a​s​t​ ​6​ ​c​h​a​r​a​c​t​e​r​s
		 */
		passwordMinLength: string
		/**
		 * {​m​o​d​u​l​e​}​ ​f​a​i​l​e​d​ ​t​o​ ​{​a​c​t​i​o​n​}
		 * @param {string} action
		 * @param {string} module
		 */
		action: RequiredParams<'action' | 'module'>
	}
}

export type TranslationFunctions = {
	auth: {
		/**
		 * Welcome
		 */
		welcome: () => LocalizedString
		/**
		 * Welcome Back
		 */
		welcomeBack: () => LocalizedString
		/**
		 * Logout ({username})
		 */
		logoutUsername: (arg: { username: string }) => LocalizedString
		/**
		 * Don't have an account? <>Register here<>
		 */
		registerHere: () => LocalizedString
		/**
		 * Already have an account? <>Login here<>
		 */
		loginHere: () => LocalizedString
		/**
		 * 404: Not Found
		 */
		notFound404: () => LocalizedString
		/**
		 * Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL.
		 */
		gone: () => LocalizedString
		/**
		 * Go back to {isLoggedIn|{true: home, false: login}}
		 */
		backTo: (arg: { isLoggedIn: 'true' | 'false' }) => LocalizedString
	}
	home: {
		/**
		 * App Template - React
		 */
		title: () => LocalizedString
		/**
		 * Sort Buttons
		 */
		sortBtn: () => LocalizedString
		/**
		 * Clock
		 */
		clock: () => LocalizedString
		/**
		 * Toggle Clock
		 */
		toggleClock: () => LocalizedString
		/**
		 * Click toggle clock to restart the clock
		 */
		clickToggleClock: () => LocalizedString
		/**
		 * Change Language
		 */
		changeLang: () => LocalizedString
		/**
		 * Get Started
		 */
		getStarted: () => LocalizedString
	}
	todo: {
		/**
		 * Go back to {target}
		 */
		backTo: (arg: { target: string }) => LocalizedString
	}
	forms: {
		/**
		 * Email
		 */
		email: () => LocalizedString
		/**
		 * Your email...
		 */
		emailPlaceholder: () => LocalizedString
		/**
		 * Username
		 */
		username: () => LocalizedString
		/**
		 * Your username...
		 */
		usernamePlaceholder: () => LocalizedString
		/**
		 * Password
		 */
		password: () => LocalizedString
		/**
		 * Your password...
		 */
		passwordPlaceholder: () => LocalizedString
		/**
		 * {icon} Form error
		 */
		error: (arg: { icon: string }) => LocalizedString
		/**
		 * Logging in...
		 */
		loginLoading: () => LocalizedString
		/**
		 * Login
		 */
		login: () => LocalizedString
		/**
		 * Registering...
		 */
		registerLoading: () => LocalizedString
		/**
		 * Register
		 */
		register: () => LocalizedString
		/**
		 * Add {icon}
		 */
		add: (arg: { icon: string }) => LocalizedString
		/**
		 * Remove {icon}
		 */
		remove: (arg: { icon: string }) => LocalizedString
		/**
		 * Limit
		 */
		limit: () => LocalizedString
		/**
		 * What should you do next...
		 */
		todoPlaceholder: () => LocalizedString
	}
	common: {
		/**
		 * Loading...
		 */
		loading: () => LocalizedString
		/**
		 * {0} List
		 */
		list: (arg0: string) => LocalizedString
		/**
		 * {feature} Detail
		 */
		xDetail: (arg: { feature: string }) => LocalizedString
		/**
		 * {feature} successfully created
		 */
		xCreateSuccess: (arg: { feature: string }) => LocalizedString
		/**
		 * {feature} failed to create
		 */
		xCreateError: (arg: { feature: string }) => LocalizedString
		/**
		 * {feature} successfully updated
		 */
		xUpdateSuccess: (arg: { feature: string }) => LocalizedString
		/**
		 * {feature} failed to update
		 */
		xUpdateError: (arg: { feature: string }) => LocalizedString
		/**
		 * {feature} successfully deleted
		 */
		xDeleteSuccess: (arg: { feature: string }) => LocalizedString
		/**
		 * {feature} failed to delete
		 */
		xDeleteError: (arg: { feature: string }) => LocalizedString
		/**
		 * ❌ {module|capitalize} error
		 */
		error: (arg: { module: string }) => LocalizedString
		/**
		 * No Page Content
		 */
		noPageContent: () => LocalizedString
		/**
		 * React Template
		 */
		appName: () => LocalizedString
		/**
		 * Theme
		 */
		theme: () => LocalizedString
		/**
		 * Add {icon}
		 */
		add: (arg: { icon: string }) => LocalizedString
		/**
		 * Update {icon}
		 */
		update: (arg: { icon: string }) => LocalizedString
		/**
		 * Remove {icon}
		 */
		remove: (arg: { icon: string }) => LocalizedString
		/**
		 * Empty Data
		 */
		empty: () => LocalizedString
		/**
		 * Unauthorized. Please login first
		 */
		unauthorized: () => LocalizedString
		/**
		 * Already authorized
		 */
		authorized: () => LocalizedString
		/**
		 * Discard unsaved changes - are you sure?
		 */
		unsavedChanges: () => LocalizedString
		/**
		 * System
		 */
		system: () => LocalizedString
		/**
		 * Light
		 */
		light: () => LocalizedString
		/**
		 * Dark
		 */
		dark: () => LocalizedString
		/**
		 * Logout
		 */
		logout: () => LocalizedString
		/**
		 * Create
		 */
		create: () => LocalizedString
	}
	success: {
		/**
		 * {module} successfully {action}
		 */
		action: (arg: { action: string, module: string }) => LocalizedString
	}
	error: {
		/**
		 * {field} must contain at least {length} characters
		 */
		minLength: (arg: { field: string, length: number }) => LocalizedString
		/**
		 * password must contain at least 6 characters
		 */
		passwordMinLength: () => LocalizedString
		/**
		 * {module} failed to {action}
		 */
		action: (arg: { action: string, module: string }) => LocalizedString
	}
}

export type Formatters = {
	capitalize: (value: string) => unknown
}
