import React from "react";
import Link from "next/link";

const formaciones = [
  {
    nombre: "Formación COMPLETA",
    duracion: "12 meses",
    precio: 1947,
    precioTexto: "1.947€",
    resumen: "Formación completa donde aprenderás cómo vender de manera correcta IA a  negocios paso a paso, aunque empieces desde cero. Ideal para personas que quieren empezar un negocio online.",
    paraQuien: [
      "Persona que quiere empezar un negocio en línea y necesita aprender sobre ventas y operativa empresarial.",
      "Persona que quiere estar a la última en estrategias de márketing en línea apoyado en herramientas de inteligencia artificial.",
      "Desarrolladores de herramientas de inteligencia artificial por cuenta propia que quieren aprender a montar una agencia y ofrecer sus servicios."
    ],
    incluye: [
      "Acceso completo a toda la formación necesaria, incluyendo: Fiscalidad, ventas, fundamentos de una agencia, prospección, métricas de prospección en línea y formación en herramientas de Inteligencia Artificial.",
      "5 videollamadas de control y ayudas:",
      "Una llamada de control todas las semanas (durante 12 meses)",
      "Contacto directo por Whatsapp con Patricio para resolver dudas."
    ]
  },
  {
    nombre: "Formación ÉLITE",
    duracion: "12 meses",
    precio: 2477,
    precioTexto: "2.447€",
    resumen: "Formación completa donde aprenderás cómo vender de manera correcta IA a  negocios paso a paso, aunque empieces desde cero. Ideal para personas que quieren empezar un negocio online.",
    paraQuien: [
      "Persona que quiere empezar un negocio en línea y necesita aprender sobre ventas y operativa empresarial.",
      "Persona que quiere estar a la última en estrategias de márketing en línea apoyado en herramientas de inteligencia artificial.",
      "Desarrolladores de herramientas de inteligencia artificial por cuenta propia que quieren aprender a montar una agencia y ofrecer sus servicios."
    ],
    incluye: [
      "Acceso directo a personal experto en IA.",
      "Acceso completo a toda la formación necesaria, incluyendo: Fiscalidad, ventas, fundamentos de una agencia, prospección, métricas de prospección en línea y formación en herramientas de Inteligencia Artificial.",
      "7 videollamadas de control y ayudas:",
      "Una llamada de control todas las semanas (durante 12 meses)",
      "Contacto directo por Whatsapp con Patricio para resolver dudas."
    ]
  },
  {
    nombre: "Formación VIP",
    duracion: "12 meses",
    precio: 3447,
    precioTexto: "3.447€",
    resumen: "Formación completa donde aprenderás cómo vender de manera correcta IA a  negocios paso a paso, aunque empieces desde cero. Ideal para personas que quieren empezar un negocio online.",
    paraQuien: [
      "Persona que quiere empezar un negocio en línea y necesita aprender sobre ventas y operativa empresarial.",
      "Persona que quiere estar a la última en estrategias de márketing en línea apoyado en herramientas de inteligencia artificial.",
      "Desarrolladores de herramientas de inteligencia artificial por cuenta propia que quieren aprender a montar una agencia y ofrecer sus servicios."
    ],
    incluye: [
      "Acceso directo a personal experto en IA.",
      "Acceso completo a toda la formación necesaria, incluyendo: Fiscalidad, ventas, fundamentos de una agencia, prospección, métricas de prospección en línea y formación en herramientas de Inteligencia Artificial.",
      "15 videollamadas de control y ayudas:",
      "Una llamada de control todas las semanas (durante 12 meses)",
      "Contacto directo por Whatsapp con Patricio para resolver dudas."
    ]
  }
];

function getComparativa(idx: number) {
  if (idx === 0) return "Ideal para empezar desde cero";
  if (idx === 1) return "Incluye acceso directo a expertos IA y todo lo del pack anterior";
  if (idx === 2) return "Incluye todo lo anterior + más duración y más sesiones 1 a 1";
  return "";
}

function getAhorro(idx: number) {
  if (idx === 1) {
    const diff = formaciones[1].precio - formaciones[0].precio;
    return `+${diff.toLocaleString()}€ respecto al pack anterior`;
  }
  if (idx === 2) {
    const diff = formaciones[2].precio - formaciones[1].precio;
    return `+${diff.toLocaleString()}€ respecto al pack anterior`;
  }
  return "";
}

export default function FormacionesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center w-full">Paquetes de Formaciones</h1>
        </div>
        <div className="flex justify-center mb-8">
          <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all">
              ← Volver a la página principal
            </button>
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {formaciones.map((f, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col border-2 rounded-3xl shadow-xl p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500 hover:scale-105 transition-transform duration-300 ${idx === 2 ? "ring-4 ring-yellow-400" : idx === 1 ? "ring-2 ring-blue-400" : ""}`}
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                {idx === 2 && <span className="bg-yellow-400 text-black px-4 py-1 rounded-full font-bold text-sm shadow">Más completo</span>}
                {idx === 1 && <span className="bg-blue-400 text-black px-4 py-1 rounded-full font-bold text-sm shadow">Popular</span>}
                {idx === 0 && <span className="bg-gray-700 text-white px-4 py-1 rounded-full font-bold text-sm shadow">Básico</span>}
              </div>
              <h2 className="text-2xl font-bold mb-2 text-center mt-6">{f.nombre}</h2>
              <div className="text-lg mb-2 text-center">Duración: <span className="font-semibold">{f.duracion}</span></div>
              <p className="mb-4 text-gray-200 text-center">{f.resumen}</p>
              <div className="mb-2">
                <span className="font-semibold">¿Para quién es esta formación?</span>
                <ul className="list-disc list-inside text-gray-300 mt-1">
                  {f.paraQuien.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Incluye:</span>
                <ul className="list-disc list-inside text-gray-300 mt-1">
                  {f.incluye.map((inc, i) => (
                    <li key={i}>{inc}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 mb-2 text-center">
                <span className="inline-block bg-blue-700/80 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">{getComparativa(idx)}</span>
              </div>
              <div className="mb-2 text-center">
                {idx > 0 && (
                  <span className="inline-block bg-gray-800 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold shadow">{getAhorro(idx)}</span>
                )}
              </div>
              <div className="mt-auto flex flex-col items-center">
                <div className="text-3xl font-extrabold text-blue-400 mb-2">{f.precioTexto}</div>
                <span className="text-sm text-gray-400">IVA incluido</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full text-center py-8 text-gray-500 text-sm mt-12">
        <span>Copyright 2025 - LanzaderaClientes.ES - Todos los derechos reservados</span>
        <span className="mx-2">|</span>
        <span>Desarrollado por <a href="https://zanovix.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition">zanovix.com</a></span>
      </footer>
    </div>
  );
} 