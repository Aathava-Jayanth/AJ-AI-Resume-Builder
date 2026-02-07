import Image from "next/image";
import Link from "next/link";

const FeatureCard = ({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/40">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center px-4 py-10">
      <main className="max-w-5xl w-full space-y-12 animate-fadeIn">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          <Image
            src="/Octo-Icon.svg"
            alt="AI Resume Logo"
            width={90}
            height={90}
            className="animate-float"
          />

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            AJ Intelligent AI Resume Builder
          </h1>

          <p className="text-gray-600 max-w-xl text-lg">
            Craft a professional, high-impact resume in minutes. 
            Powered by <strong>Tambo AI</strong> to transform your raw experience into a polished career document.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/resume"
            className="group px-8 py-4 rounded-xl bg-emerald-500 text-white text-lg font-semibold shadow-lg hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            📄 Start Building Now
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* Features Section - Updated with Tambo Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon="🐙"
            title="Tambo AI Engine"
            desc="Leverages Tambo's sophisticated agent orchestration to understand your career narrative through natural conversation."
          />

          <FeatureCard
            icon="🛠️"
            title="Smart Tool Calling"
            desc="The AI uses Tambo tools to automatically update your resume state, mapping chat data directly to professional templates."
          />

          <FeatureCard
            icon="💾"
            title="Pro Exports"
            desc="Download your final resume in PDF or DOCX format with modern, clean styling ready for job applications."
          />
        </div>

        {/* About Developer */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg space-y-6 border border-white/40">
          <h2 className="text-2xl font-semibold text-center">
            👨‍💻 Developer Profile
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-lg font-medium">
                <span className="text-gray-600">Name:</span>{" "}
                <span className="font-semibold">Aathavajayanth A S</span>
              </p>

              <p className="text-gray-700">
                <span className="text-gray-600">Email:</span>{" "}
                <a
                  href="mailto:aathavajayanth@gmail.com"
                  className="text-indigo-600 hover:underline"
                >
                  aathavajayanth@gmail.com
                </a>
              </p>

              <p className="text-gray-700">
                <span className="text-gray-600">GitHub:</span>{" "}
                <a
                  href="https://github.com/Aathava-Jayanth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  github.com/Aathava-Jayanth
                </a>
              </p>
            </div>

            <div className="text-center text-gray-600 max-w-md border-l-2 border-emerald-400 pl-4">
              <p>
                Passionate full-stack developer focused on building intelligent tools. 
                This project integrates <strong>Tambo AI</strong> to demonstrate how 
                Conversational AI and <strong>LLM Tool Calling</strong> can simplify 
                complex data entry tasks like resume building.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Aathavajayanth A S • Built with ❤️ using
          Tambo & Next.js
        </footer>
      </main>
    </div>
  );
}