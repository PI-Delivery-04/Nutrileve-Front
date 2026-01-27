import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react";
import { Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <img
                  src="https://ik.imagekit.io/f9nzlij8o/Gemini_Generated_Image_burmusburmusburm.png"
                  alt="Logo"
                  className="w-10 h-10 object-contain rounded-full"
                />
              </div>
              <span className="font-bold text-xl text-white">NutriLeve</span>
            </div>
            <p className="text-gray-400 text-sm">
              Alimentação Saudável que Transforma Vidas.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Ajuda</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-500" />
                <span>(11) 4004-1234</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-500" />
                <span>contato@nutrileve.com</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                target="_blank"
                href="https://linktr.ee/nicolasfernandodev"
                className="w-8 h-8 bg-gray-800 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors"
              >
                <InstagramLogoIcon className="w-4 h-4" />
              </a>
              <a
                target="_blank"
                href="https://linktr.ee/nicolasfernandodev"
                className="w-8 h-8 bg-gray-800 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors"
              >
                <FacebookLogoIcon className="w-4 h-4" />
              </a>
              <a
                target="_blank"
                href="https://linktr.ee/nicolasfernandodev"
                className="w-8 h-8 bg-gray-800 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors"
              >
                <TwitterLogoIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>© 2026 NutriLeve. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
