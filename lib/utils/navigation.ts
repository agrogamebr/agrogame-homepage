/**
 * Realiza scroll suave para uma seção específica da página
 * @param e - Evento de clique do mouse
 * @param href - Hash da âncora (#home, #about, etc.)
 * @param headerOffset - Altura do header fixo em pixels (padrão: 64px)
 */
export const handleNavClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  headerOffset: number = 64
): void => {
  e.preventDefault();
  
  const targetId = href.replace('#', '');
  const element = document.getElementById(targetId);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Scroll suave para o topo da página
 */
export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Scroll suave para um elemento específico pelo ID
 * @param elementId - ID do elemento (sem o #)
 * @param headerOffset - Altura do header fixo em pixels (padrão: 64px)
 */
export const scrollToElement = (
  elementId: string,
  headerOffset: number = 64
): void => {
  const element = document.getElementById(elementId);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Scroll suave para signup e define o tipo de formulário
 * @param signupType - Tipo de cadastro: 'company' ou 'producer'
 * @param headerOffset - Altura do header fixo em pixels (padrão: 64px)
 */
export const scrollToSignup = (
  signupType: 'company' | 'producer',
  headerOffset: number = 64
): void => {
  window.dispatchEvent(
    new CustomEvent('setSignupType', { detail: { type: signupType } })
  );

  setTimeout(() => {
    scrollToElement('signup', headerOffset);
  }, 50);
};
