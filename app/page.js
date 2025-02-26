import { AtomIcon, Edit, Share2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <div className='flex p-6 items-center justify-between bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-purple-100'>
        <a href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
          MockMate
        </a>
        <nav className='hidden md:flex space-x-8'>
          <a href="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">
            Dashboard
          </a>
          <a href="/app/dashboard/questions/Questions.jsx" className="text-gray-600 hover:text-purple-600 transition-colors">
            Questions
          </a>
         
          <a href="/dashboard/how" className="text-gray-600 hover:text-purple-600 transition-colors">
            How it Works?
          </a>
        </nav>
      </div>

      <section className="pt-32">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-30"></div>
            </div>
            <h1 className="relative mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
              Ace Your Interviews with AI-Powered Coaching
            </h1>
          </div>
          <p className="mb-8 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48">
          Master every interview with AI-driven practice, real-time feedback, and personalized coaching—designed to land you your dream job.
          </p>
          <div className="flex justify-center">
  <a 
    href="/dashboard" 
    className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 hover:scale-105 transform transition-all duration-300 ease-in-out shadow-lg shadow-purple-200 group"
  >
    Get Started
    <svg className="ml-2 -mr-1 w-5 h-5 group-hover:translate-x-2 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </a>
</div>

        </div>
      </section>

      <section className="py-24">
        <div className="px-4 mx-auto max-w-screen-xl text-center lg:px-12">
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="font-bold text-4xl mb-4 bg-black bg-clip-text text-transparent">
              Your Path to Interview Success
            </h2>
            <p className="text-lg text-purple-600/80">
              Excel in your interviews with our streamlined three-step approach
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group p-8 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 mx-auto group-hover:scale-110 transition-transform">
                <AtomIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-3">Customize Your Practice</h3>
              <p className="text-purple-600/80 leading-relaxed">
              Share your job preferences, and let our AI create a tailored interview simulation just for you.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 mx-auto group-hover:scale-110 transition-transform">
                <Edit className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-3">Interactive Sessions</h3>
              <p className="text-purple-600/80 leading-relaxed">
                Experience dynamic mock interviews with instant AI feedback to refine your responses.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 mx-auto group-hover:scale-110 transition-transform">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-3">Growth Insights</h3>
              <p className="text-purple-600/80 leading-relaxed">
                Track your progress with detailed analytics and actionable improvement strategies.
              </p>
            </div>
          </div>


        </div>
      </section>
    </div>
  );
}