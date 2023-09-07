let invokeFunction: any = () => console.log('invoking nothing!');

if (!import.meta.env.SSR) {
	const { invoke } = await import('@tauri-apps/api');
	invokeFunction = invoke;
}

export async function invoke<T>(name: string, args?: any): Promise<T> {
	return await invokeFunction(name, args);
}