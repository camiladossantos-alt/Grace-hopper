import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col items-center font-sans px-6 py-12">
      <div className="max-w-2xl w-full bg-white border border-[#E5E7EB] rounded-[8px] p-8 md:p-12 shadow-none">
        <span className="font-light tracking-widest text-xs text-[#0A0A41] uppercase mb-4 block">
          PrepWell — IA
        </span>
        <h1 className="text-3xl font-bold text-[#0A0A41] mb-6">Política de Privacidade</h1>
        
        <div className="space-y-6 text-sm text-[#444444] leading-relaxed">
          <p>
            Esta Política de Privacidade descreve como suas informações são coletadas, usadas e compartilhadas quando você utiliza a plataforma PrepWell.
          </p>

          <h2 className="text-lg font-semibold text-[#0A0A41] mt-8">1. Informações que Coletamos</h2>
          <p>
            Coletamos apenas as informações necessárias para autenticação e funcionamento da inteligência artificial:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Dados de Autenticação:</strong> E-mail e nome fornecidos pelo Google OAuth.</li>
            <li><strong>Dados de Voz/Texto:</strong> A gravação e a transcrição das respostas das suas entrevistas para que a inteligência artificial possa gerar feedbacks construtivos.</li>
          </ul>

          <h2 className="text-lg font-semibold text-[#0A0A41] mt-8">2. Como Usamos as Informações</h2>
          <p>
            Suas informações são utilizadas estritamente para:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Permitir que você acesse seu histórico de entrevistas e feedback.</li>
            <li>Processar suas respostas de voz e transformá-las em relatórios técnicos de comunicação.</li>
            <li>Melhorar a experiência da plataforma. Não vendemos ou compartilhamos seus dados com terceiros para fins publicitários.</li>
          </ul>

          <h2 className="text-lg font-semibold text-[#0A0A41] mt-8">3. Armazenamento e Segurança</h2>
          <p>
            Seus dados são armazenados de forma segura utilizando a infraestrutura do Supabase. Apenas você tem acesso ao seu histórico de entrevistas.
          </p>

          <h2 className="text-lg font-semibold text-[#0A0A41] mt-8">4. Contato</h2>
          <p>
            Se tiver dúvidas sobre nossa política ou exclusão de dados, entre em contato em: <strong>camila.dos.santos.contact@gmail.com</strong>.
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
