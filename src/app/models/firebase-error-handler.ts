// src/app/models/firebase-error-handler.ts

/**
 * Mapa de códigos de erro do Firebase Authentication para mensagens amigáveis
 */
export const FIREBASE_AUTH_ERRORS: Record<string, string> = {
    // Erros de email
    'auth/invalid-email': 'Email inválido',
    'auth/user-not-found': 'Usuário não encontrado',
    'auth/email-already-in-use': 'Este email já está em uso',
    'auth/email-already-exists': 'Este email já está cadastrado',

    // Erros de senha
    'auth/weak-password': 'Senha muito fraca. Use pelo menos 6 caracteres',
    'auth/wrong-password': 'Senha incorreta',

    // Erros de credenciais
    'auth/invalid-credential': 'Email ou senha incorretos',
    'auth/invalid-verification-code': 'Código de verificação inválido',
    'auth/invalid-verification-id': 'ID de verificação inválido',

    // Erros de conta
    'auth/user-disabled': 'Esta conta foi desabilitada',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde',

    // Erros de token
    'auth/invalid-action-code': 'Código de ação inválido ou expirado',
    'auth/expired-action-code': 'Código de ação expirado',
    'auth/invalid-continue-uri': 'URL de continuação inválida',

    // Erros de rede/conexão
    'auth/network-request-failed': 'Erro de conexão. Verifique sua internet',
    'auth/internal-error': 'Erro interno. Tente novamente',

    // Erros de autenticação
    'auth/requires-recent-login': 'Por segurança, faça login novamente',
    'auth/popup-closed-by-user': 'Janela de autenticação foi fechada',
    'auth/cancelled-popup-request': 'Solicitação de autenticação cancelada',

    // Erros de domínio
    'auth/unauthorized-domain': 'Domínio não autorizado',
    'auth/invalid-api-key': 'Chave de API inválida',

    // Erros de configuração
    'auth/app-not-authorized': 'Aplicativo não autorizado',
    'auth/configuration-not-found': 'Configuração não encontrada',

    // Erros genéricos
    'auth/account-exists-with-different-credential': 'Já existe uma conta com este email usando outro método de login',
    'auth/credential-already-in-use': 'Esta credencial já está em uso',
    'auth/operation-not-allowed': 'Operação não permitida. Este método de login pode não estar habilitado',
};

/**
 * Obtém uma mensagem de erro amigável baseada no código de erro do Firebase
 * @param errorCode Código de erro do Firebase (ex: "auth/invalid-email")
 * @returns Mensagem de erro amigável em português ou mensagem padrão
 */
export function getFirebaseErrorMessage(errorCode: string): string {
    if (!errorCode) {
        return 'Ocorreu um erro. Tente novamente';
    }

    // Se o código de erro já está no formato correto
    if (FIREBASE_AUTH_ERRORS[errorCode]) {
        return FIREBASE_AUTH_ERRORS[errorCode];
    }

    // Se o erro vem como objeto com code
    if (errorCode.includes('auth/')) {
        const code = errorCode.split('auth/')[1];
        const fullCode = `auth/${code}`;
        if (FIREBASE_AUTH_ERRORS[fullCode]) {
            return FIREBASE_AUTH_ERRORS[fullCode];
        }
    }

    // Mensagem padrão se o erro não for reconhecido
    console.error('Erro não reconhecido:', errorCode);
    return 'Ocorreu um erro. Tente novamente';
}

/**
 * Extrai o código de erro de um objeto de erro do Firebase
 * @param error Objeto de erro (pode ser Error, objeto com code, ou string)
 * @returns Código de erro ou string vazia
 */
export function extractFirebaseErrorCode(error: any): string {
    if (typeof error === 'string') {
        return error;
    }

    if (error?.code) {
        return error.code;
    }

    if (error?.message) {
        // Tenta extrair o código do formato "FirebaseError: auth/invalid-email"
        const match = error.message.match(/auth\/[a-z-]+/);
        if (match) {
            return match[0];
        }
        return error.message;
    }

    return '';
}

/**
 * Função auxiliar completa que recebe qualquer tipo de erro e retorna mensagem amigável
 * @param error Erro do Firebase (pode ser Error, objeto com code, ou string)
 * @returns Mensagem de erro amigável em português
 */
export function getFirebaseError(error: any): string {
    const errorCode = extractFirebaseErrorCode(error);
    return getFirebaseErrorMessage(errorCode);
}

