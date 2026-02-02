import { Star } from 'lucide-react';

const team = [
  {
    name: 'Beatriz M. Viana',
    role: 'Desenvolvedora Full Stack',
    description: 'Responsável pelo desenvolvimento e manutenção do aplicativo.',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQHnIB3UBtREBQ/profile-displayphoto-crop_800_800/B4EZrgP6LkHUAQ-/0/1764698860115?e=1771459200&v=beta&t=Muti7eqXycSKTcDGRn_piEW3uFiliKGUaLsSTMJS-pE',
    linkedin: 'https://www.linkedin.com/in/beatriz-mv/',
    email: 'beatrizmonteirovieira@outlook.com'
  },
  {
    name: 'Carlos Alberto V. dos Santos',
    role: 'Desenvolvedor Full Stack',
    description: 'Responsável pelo desenvolvimento e manutenção do aplicativo.',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQHMl1sB038zAQ/profile-displayphoto-crop_800_800/B4DZvsP3BEJgAQ-/0/1769195139672?e=1771459200&v=beta&t=3XB-PjGIAFHGQ2p59s-Fm2dxrku-Hwsk5OCtCghh6oc',
    linkedin: 'https://www.linkedin.com/in/carlosavds/',
    email: 'carlosalbertovds04@gmail.com'
  },
  {
    name: 'Cleiton Matos Andrade',
    role: 'Desenvolvedor Full Stack',
    description: 'Responsável pelo desenvolvimento e manutenção do aplicativo.',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQHqJAhp6Vzjyw/profile-displayphoto-scale_400_400/B4DZq4Gr91GwAo-/0/1764025352811?e=1771459200&v=beta&t=TtyQUJLbOG8Xu5qOBywljQD_DSCfnA378xUoon1CeZs',
    linkedin: 'https://www.linkedin.com/in/cleiton-andrade/',
    email: 'cleitonmatosandrade@gmail.com'
  },
  {
    name: 'Gabrielle Castro Alves',
    role: 'Product Owner',
    description: 'Responsável pela definição de requisitos e priorização das funcionalidades do aplicativo.',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQF24dFzoWyGHA/profile-displayphoto-crop_800_800/B4DZrhBL7sJMAI-/0/1764711776590?e=1771459200&v=beta&t=Th_z-0CZYqyO85RYtJ4q26lN9s25Pk9uWg8wXYrkR7A',
    linkedin: 'https://www.linkedin.com/in/gcastroalves/',
    email: 'gabrielledecastro2320@gmail.com'
  },
  {
    name: 'Elisangela Amaral',
    role: 'Scrum Master (SM)',
    description: 'Responsável pela gestão de times e processos ágeis.',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQH7c46FznC5dw/profile-displayphoto-shrink_800_800/B4DZdami_yG8Ac-/0/1749571751681?e=1771459200&v=beta&t=7Qoo82PfwW94MtrKPac_eb0l4mC-dk171bzXqrHJyLg',
    linkedin: 'https://www.linkedin.com/in/elisangela-amaral/',
    email: 'elisangela.a.lira@gmail.com'
  },
  {
    name: 'Nicolas Clemente',
    role: 'Quality Assurance (QA)',
    description: 'Responsável pela garantia da qualidade do software.',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQF_8MAQdsniqg/profile-displayphoto-crop_800_800/B4DZq9BYJ1IAAI-/0/1764107847051?e=1771459200&v=beta&t=f47XM8cNz0ILPju-1AGOd5-GLORjKfEvuOR9dqDFHq0',
    linkedin: 'https://www.linkedin.com/in/nicolas-clementedev/',
    email: 'nicolasfernando724@gmail.com'
  },
  {
    name: 'Thaís Campos Silva',
    role: 'Desenvolvedora Full Stack',
    description: 'Responsável pelo desenvolvimento e manutenção do aplicativo.',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQETTpGVdigF2Q/profile-displayphoto-crop_800_800/B4DZor2a1BJEAI-/0/1761672277759?e=1771459200&v=beta&t=O_Jghe6ukGrujnMpnnqNiE_3XZKpooWaAmOwgtxcYyM',
    linkedin: 'https://www.linkedin.com/in/thais-campos-fullstack/',
    email: 'tscampos31@gmail.com'
  }
];

export function About() {
  return (
    <section
      id="como-funciona"
      className="py-16 bg-gradient-to-b from-white to-emerald-50"
    >

      {/*  EQUIPE */}

      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Conheça Nossa Equipe
            </h2>

            <p className="text-gray-600">
              Profissionais dedicados e apaixonados por saúde e bem-estar!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-emerald-100"
                />


                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900">
                    {member.name}
                  </h3>

                  <p className="text-emerald-600 font-medium text-sm mb-2">
                    {member.role}
                  </p>

                  <p className="text-gray-600 text-sm mb-4">
                    {member.description}
                  </p>

                  <div className="flex gap-3">
                    <a
                      href={member.linkedin}
                      className="flex-1 text-center py-2 rounded-lg bg-emerald-100 text-emerald-700 font-medium text-sm hover:bg-orange-400 hover:text-white transition"
                      target="_blank"
                    >

                      LinkedIn
                    </a>

                    <a
                      href={`mailto:${member.email}`}
                      className="flex-1 text-center py-2 rounded-lg bg-emerald-100 text-emerald-700 font-medium text-sm hover:bg-orange-400 hover:text-white transition"
                      target="_blank"
                    >
                      E-mail
                    </a>
                  </div>

                </div>
              </div>
            ))}

          </div>

        </div>
      </div>

      {/* SOBRE NÓS */}
      <div className="text-center mt-16 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Sobre Nós
        </h2>

        <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-12">
          O NutriLeve é uma plataforma de delivery inteligente que conecta pessoas a
          restaurantes parceiros especializados em alimentação saudável, unindo
          tecnologia, praticidade e bem-estar em uma única experiência.
        </p>

        {/* CARDS MISSÃO, VISÃO E VALORES */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* MISSÃO */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-black mb-3">
              🌱 Missão
            </h3>

            <p className="text-gray-600">
              Promover o acesso à alimentação saudável por meio da tecnologia,
              oferecendo uma experiência prática, segura e eficiente para todos.
            </p>
          </div>

          {/* VISÃO */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-black mb-3">
              🌱 Visão
            </h3>

            <p className="text-gray-600">
              Ser referência no mercado de delivery saudável, reconhecida pela
              inovação, qualidade e impacto positivo na vida das pessoas.
            </p>
          </div>

          {/* VALORES */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-black mb-3">
              🌱 Valores
            </h3>

            <ul className="text-gray-600 space-y-2 text-center">
              <li>• Saúde e bem-estar</li>
              <li>• Transparência e confiança</li>
              <li>• Inovação contínua</li>
              <li>• Qualidade e excelência</li>
              <li>• Foco no cliente</li>
            </ul>
          </div>

        </div>
      </div>


      {/* AVALIAÇÕES */}

      <div className="py-12 my-8 bg-white">
        <div className="max-w-5xl mx-auto px-4">

          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Avaliações dos Clientes
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            {[
              {
                text: 'Melhor delivery saudável de SP! Comida deliciosa e entrega rápida.',
                name: 'Yuri Silva'
              },
              {
                text: 'Adoro poder ver as informações nutricionais de cada prato. Perfeito!',
                name: 'Felipe Andrade'
              },
              {
                text: 'Opções veganas incríveis! Finalmente um delivery que me atende.',
                name: 'Mariana Araujo'
              },
              {
                text: 'Comida saudável, saborosa e sempre chega quentinha. Recomendo demais!',
                name: 'Lucas Ferreira'
              },
              {
                text: 'Facilidade para escolher os pratos e ver os macros fez toda a diferença pra mim.',
                name: 'Rafael Costa'
              },
              {
                text: 'As opções vegetarianas são excelentes e muito bem temperadas!',
                name: 'Ana Beatriz Lima'
              }

            ].map((review, index) => (
              <div key={index} className="hover:bg-green-50 rounded-xl p-5">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-gray-700 text-sm mb-3">
                  "{review.text}"
                </p>

                <p className="text-sm font-semibold text-gray-900">
                  {review.name}
                </p>
              </div>
            ))}

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <div className="bg-emerald-50 rounded-xl p-6 text-center">
              <h3 className="text-3xl font-bold text-emerald-600">98%</h3>
              <p className="text-gray-700 mt-2">Taxa de Satisfação</p>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 text-center">
              <h3 className="text-3xl font-bold text-emerald-600">5.000+</h3>
              <p className="text-gray-700 mt-2">Pedidos por Mês</p>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 text-center">
              <h3 className="text-3xl font-bold text-emerald-600">
                4.9 <span>⭐</span>
              </h3>
              <p className="text-gray-700 mt-2">Avaliação Média</p>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 text-center">
              <h3 className="text-3xl font-bold text-emerald-600">100%</h3>
              <p className="text-gray-700 mt-2">Ingredientes Frescos</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
