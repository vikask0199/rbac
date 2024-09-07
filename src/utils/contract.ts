

export const generateContractId = (): string => {
    return 'CON-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 11);
};