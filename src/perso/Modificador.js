import React, { createContext, useState } from 'react';

// Crea el contexto
export const CustomizationContext = createContext();

// Crea un proveedor de contexto
export const CustomizationProvider  = ({ children }) => {
	const [customization, setCustomization] = useState({
		appName: 'StreamingPro',
		// Agrega aquí más variables de personalización según sea necesario
	});

	return <CustomizationContext.Provider value={{ customization, setCustomization }}>{children}</CustomizationContext.Provider>;
};
