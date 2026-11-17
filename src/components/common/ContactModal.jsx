import { X, MessageCircle } from 'lucide-react';
import { formatPhoneCO, phoneDigitsForWa } from '../../utils/formatPhone';
import Button from './Button';

export default function ContactModal({ entrepreneur, service, onClose }) {
  if (!entrepreneur) return null;

  const phoneDisplay = formatPhoneCO(entrepreneur.phone || entrepreneur.whatsapp);
  const waDigits = phoneDigitsForWa(entrepreneur.whatsapp || entrepreneur.phone);
  const waLink = waDigits ? `https://wa.me/${waDigits}` : null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <button type="button" className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} aria-label="Cerrar" />
      <div className="relative w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full bg-brand-400/20 blur-2xl" aria-hidden />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-brand-200 bg-gradient-to-br from-brand-100 to-brand-50">
              <MessageCircle className="h-12 w-12 text-brand-600" strokeWidth={2} />
            </div>
          </div>
          <h2 id="contact-modal-title" className="text-3xl font-bold text-gray-900">
            Información de Contacto
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600">
            Comunícate con{' '}
            <span className="font-semibold text-gray-800">{entrepreneur.name}</span>
            {service?.title && (
              <>
                {' '}
                para más información sobre <span className="font-medium">{service.title}</span>
              </>
            )}
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 text-center shadow-sm">
            <p className="text-sm font-medium text-brand-700">Número de contacto</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">{phoneDisplay}</p>
          </div>

          {(entrepreneur.instagram || entrepreneur.facebook || waLink) && (
            <div className="flex flex-wrap justify-center gap-3">
              {entrepreneur.facebook && (
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                  onClick={(e) => e.preventDefault()}
                >
                  {entrepreneur.facebook}
                </a>
              )}
              {entrepreneur.instagram && (
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl bg-pink-50 px-4 py-2.5 text-sm font-medium text-pink-700 transition hover:bg-pink-100"
                  onClick={(e) => e.preventDefault()}
                >
                  {entrepreneur.instagram}
                </a>
              )}
            </div>
          )}

          <div className="rounded-3xl border border-yellow-200 bg-yellow-50 px-4 py-4 text-center text-sm text-gray-700">
            <span className="font-semibold">Recuerda:</span> Este es un servicio local de Mistrató
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {waLink && (
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full rounded-3xl" type="button">
                <MessageCircle className="mr-2 inline h-4 w-4" />
                Contactar por WhatsApp
              </Button>
            </a>
          )}
          <Button variant="secondary" type="button" onClick={onClose} className="w-full rounded-3xl">
            Entendido
          </Button>
        </div>
      </div>
    </div>
  );
}
