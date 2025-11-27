// Dados Fictícios - Voigt Consultoria Empresarial

const dadosVoigt = {
  // Equipe
  equipe: [
    {
      id: 1,
      nome: "Nathalia Bins Voigt",
      cargo: "COO - Diretora Comercial",
      foto: "/assets/equipe/nathalia-bins-voigt.jpeg",
      descricao: "Especialista em Direito Tributário, desenvolvimento de negócios e relacionamento com clientes. Lidera a equipe comercial, impulsiona resultados e fortalece parcerias.",
      email: "nathaliavoigt@voigtconsultoria.com.br",
      whatsapp: "5551996353096",
      linkedin: "https://www.linkedin.com/company/voigt-consultoria-empresarial/",
      instagram: "https://www.instagram.com/voigt.consultoriaempresarial/"
    },
    {
      id: 2,
      nome: "Leandro Souza Mendonça",
      cargo: "CLO - Diretor Jurídico",
      foto: "/assets/equipe/leandro-souza-mendonca.jpeg",
      descricao: "Especialista em Direito Bancário e área civel, com mais de 15 anos de experiência. Lidera a equipe técnica e garante a excelência na entrega dos serviços.",
      email: "leandromendonca@voigtconsultoria.com.br",
      whatsapp: "5551984538987",
      linkedin: "https://www.linkedin.com/company/voigt-consultoria-empresarial/",
      instagram: "https://www.instagram.com/voigt.consultoriaempresarial/"
    },
    {
      id: 3,
      nome: "Lucas Silva",
      cargo: "CEO - Diretor Administrativo e Operacional",
      foto: "/assets/equipe/lucas-silva.jpeg",
      descricao: "Responsável pela gestão do escritório e otimização dos processos internos. Garante eficiência operacional e comercial.",
      email: "lucas.silva@voigtconsultoria.com.br",
      whatsapp: "5551983544766",
      linkedin: "https://www.linkedin.com/company/voigt-consultoria-empresarial/",
      instagram: "https://www.instagram.com/voigt.consultoriaempresarial/"
    }
  ],

  // Serviços
  servicos: [
    {
      id: 1,
      titulo: "Planejamento Tributário Estratégico",
      descricao: "Análise completa da estrutura tributária da empresa para otimização fiscal dentro da legalidade.",
      detalhes: [
        "Estudo de regime tributário mais adequado",
        "Identificação de oportunidades de economia fiscal",
        "Análise de impactos tributários em operações",
        "Planejamento de reorganizações societárias"
      ],
      icone: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>'
    },
    {
      id: 2,
      titulo: "Consultoria Preventiva",
      descricao: "Assessoria contínua para prevenção de passivos e adequação às normas tributárias vigentes.",
      detalhes: [
        "Acompanhamento de mudanças legislativas",
        "Revisão periódica de conformidade",
        "Orientação sobre obrigações acessórias",
        "Análise de riscos fiscais"
      ],
      icone: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>'
    },
    {
      id: 3,
      titulo: "Direito Bancário Empresarial",
      descricao: "Orientação especializada sobre operações bancárias e contratos financeiros.",
      detalhes: [
        "Análise de contratos bancários",
        "Negociação com instituições financeiras",
        "Revisão de operações de crédito",
        "Orientação sobre garantias"
      ],
      icone: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 10h3v7H4zm6.5 0h3v7h-3zM2 19h20v3H2zm15-9h3v7h-3zm-5-9L2 6v2h20V6z"/></svg>'
    },
    {
      id: 4,
      titulo: "Compliance Tributário",
      descricao: "Implementação e monitoramento de processos de conformidade fiscal.",
      detalhes: [
        "Desenvolvimento de políticas fiscais",
        "Treinamento de equipes",
        "Auditoria de conformidade",
        "Implementação de controles internos"
      ],
      icone: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'
    },
    {
      id: 5,
      titulo: "Due Diligence Tributária",
      descricao: "Análise detalhada de aspectos tributários em fusões, aquisições e investimentos.",
      detalhes: [
        "Levantamento de passivos tributários",
        "Análise de contingências fiscais",
        "Avaliação de estrutura tributária",
        "Relatórios executivos para tomada de decisão"
      ],
      icone: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>'
    },
    {
      id: 6,
      titulo: "Assessoria em Operações Estruturadas",
      descricao: "Suporte jurídico-tributário em operações complexas e reestruturações empresariais.",
      detalhes: [
        "Planejamento de reorganizações societárias",
        "Análise tributária de operações especiais",
        "Estruturação de holdings",
        "Orientação em sucessão empresarial"
      ],
      icone: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>'
    }
  ],

  
};

// Export para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = dadosVoigt;
}