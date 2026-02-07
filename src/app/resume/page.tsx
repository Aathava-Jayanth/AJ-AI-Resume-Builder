"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from "docx";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useResumeStore } from "@/store/resumeStore";
import { TamboProvider } from "@tambo-ai/react";
import { components, tools } from "@/lib/tambo";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";

export default function ResumePageEnhanced() {
  const mcpServers = useMcpServers();
  const resume = useResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);

  /* --- PDF Export Logic --- */
  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    const html2canvas = (await import("html2canvas-pro")).default;
    const { jsPDF } = await import("jspdf");

    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; 
    const pageHeight = 297; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save(`${resume.name || "AI"}_Resume.pdf`);
  };

  /* --- Word (DOCX) Export Logic --- */
  const downloadDOCX = async () => {
    const createSection = (title: string, content: string) => [
      new Paragraph({
        text: title.toUpperCase(),
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        children: [new TextRun({ text: content, size: 24, color: "000000" })],
        spacing: { after: 200 },
      }),
    ];

    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: resume.name || "Your Name", bold: true, size: 36, color: "000000" })],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: resume.role || "Job Title", bold: true, size: 28, color: "000000" })],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: `${resume.email} | ${resume.phone || ""} | ${resume.city || ""}`, size: 20, color: "000000" })],
          }),
          ...(resume.summary ? createSection("Profile Summary", resume.summary) : []),
          ...(resume.experience ? createSection("Work Experience", resume.experience) : []),
          ...(resume.education ? createSection("Education", resume.education) : []),
          ...(resume.skills ? createSection("Skills", resume.skills) : []),
          ...(resume.projects ? createSection("Key Projects", resume.projects) : []),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${resume.name || "AI"}_Resume.docx`);
  };

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
      mcpServers={mcpServers}
    >
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-4 py-10">
        <main className="max-w-7xl mx-auto space-y-12 animate-fadeIn">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md border border-white/40">
            <div className="flex items-center gap-4">
              <Image src="/Octo-Icon.svg" alt="Logo" width={50} height={50} className="animate-float" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AJ AI Resume Builder</h1>
                <p className="text-xs text-gray-500 font-medium">Powered by Tambo AI Engine</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition mr-4 cursor-pointer">
                ← Back to Home
              </Link>
              
              <button 
                onClick={downloadPDF}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold shadow-lg hover:bg-emerald-600 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                PDF
              </button>

              <button 
                onClick={downloadDOCX}
                className="px-5 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-semibold shadow-lg hover:bg-indigo-600 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                Word
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Chat Panel */}
            <div className="lg:col-span-5">
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md border border-white/40 h-[700px] flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-1">🤖 AI Assistant</h3>
                  <p className="text-gray-600 text-sm">Tell the AI about your work and it will update the preview.</p>
                </div>
                <div className="flex-1 border border-gray-100 rounded-lg overflow-hidden bg-white/50">
                  <MessageThreadFull className="h-full" />
                </div>
              </div>
            </div>

            {/* Right: Preview Panel */}
            <div className="lg:col-span-7">
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md border border-white/40 min-h-[700px]">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-xl font-semibold">📄 Live Preview</h3>
                </div>

                <div className="bg-gray-50 p-4 md:p-8 rounded-lg border border-dashed border-gray-200 overflow-y-auto max-h-[800px]">
                  <div 
                    ref={resumeRef}
                    className="bg-white shadow-xl mx-auto p-12 w-full max-w-[800px] text-black leading-normal"
                    style={{ minHeight: '1000px' }}
                  >
                    {/* Resume Header */}
                    <div className="text-center space-y-2 border-b-2 border-gray-100 pb-6 mb-6">
                      <h1 className="text-3xl font-bold uppercase tracking-tighter text-black">{resume.name || "Your Name"}</h1>
                      <p className="text-emerald-600 font-semibold">{resume.role || "Job Title"}</p>
                      <p className="text-xs text-gray-500 font-medium italic">
                        {resume.email} {resume.phone && `| ${resume.phone}`} {resume.city && `| ${resume.city}, ${resume.state}`}
                      </p>
                    </div>

                    <div className="space-y-8">
                      {resume.summary && <ResumeSection title="Profile Summary" value={resume.summary} />}
                      {resume.experience && <ResumeSection title="Work Experience" value={resume.experience} />}
                      <div className="grid grid-cols-2 gap-8">
                         {resume.education && <ResumeSection title="Education" value={resume.education} />}
                         {resume.skills && <ResumeSection title="Skills" value={resume.skills} />}
                      </div>
                      {resume.projects && <ResumeSection title="Key Projects" value={resume.projects} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="text-center text-gray-500 text-sm pb-10">
            © {new Date().getFullYear()} Aathavajayanth A S • Built with ❤️ using Tambo & Next.js
          </footer>
        </main>
      </div>
    </TamboProvider>
  );
}

function ResumeSection({ title, value }: { title: string; value: string }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-600 border-b border-gray-100 pb-1">
        {title}
      </h4>
      <p className="text-[14px] text-gray-800 leading-relaxed whitespace-pre-line">
        {value}
      </p>
    </div>
  );
}