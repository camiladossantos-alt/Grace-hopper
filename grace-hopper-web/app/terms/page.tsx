import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col items-center font-sans px-6 py-12">
      <div className="max-w-2xl w-full bg-white border border-[#E5E7EB] rounded-[8px] p-8 md:p-12 shadow-none">
        <span className="font-light tracking-widest text-xs text-[#0A0A41] uppercase mb-4 block">
          PrepWell — IA
        </span>
        <h1 className="text-3xl font-bold text-[#0A0A41] mb-6">Termos de Serviço</h1>
        
        <div className="space-y-6 text-sm text-[#444444] leading-relaxed">
          <p>
            Ao utilizar a plataforma PrepWell, você concorda com os seguintes termos e condições.
          </p>

          <h2 className="text-lg font-semibold text-[#0A0A41] mt-8">1. Aceitação dos Termos</h2>
          <p>
            Esta plataforma é destinada a simular entrevistas técnicas e comportamentais por meio de inteligência artificial baseada em áudio e texto. Ao se cadastrar, você concorda com estes termos.
          </p>

          <h2 className="text-lg font-semibold text-[#0A0A41] mt-8">2. Uso do Serviço</h2>
          <p>
            Você concorda em usar o serviço apenas para fins legítimos de treinamento pessoal ou profissional. É proibido:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Tentar burlar os sistemas de autenticação ou segurança da plataforma.</li>
            <li>Inundar o sistema com requisições maliciosas ou automatizadas (DoS).</li>
            <li>Inserir conteúdos ofensivos ou ilegais nas respostas por voz ou texto.</li>
          </ul>

          <h2 className="text-lg font-semibold text-[#0A0A41] mt-8">3. Limitação de Responsabilidade</h2>
          <p>
            O PrepWell fornece feedbacks gerados por inteligência artificial (Gemini API) baseados nas respostas inseridas. O feedback é meramente educacional e informativo, e não garante aprovação ou contratação em processos seletivos reais.
          </p>

          <h2 className="text-lg font-semibold text-[#0A0A41] mt-8">4. Modificações no Serviço</h2>
          <p>
            Reservamo-nos o direito de alterar, suspender ou descontinuar partes do serviço a qualquer momento, visando a melhoria do sistema e a manutenção dos recursos gratuitos.
          </p>
        </div>

        <div className="mt-12 border-t border-[#E5E7EB] pt-6 flex justify-between items-center">
          <Link href="/login" className="text-xs text-[#0A0A41] font-semibold hover:underline">
            Voltar para o Login
          </Link>
          <span className="text-xs text-[#888888]">
            Atualizado em Junho de 2026
          </span>
        </div>
      </div>
    </div>
  );
}
