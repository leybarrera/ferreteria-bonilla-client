import { useState } from 'react'
import {
  CV,
  EducationTab,
  GeneralInfo,
  LanguageTab,
  ReferencesTab,
  SkillsTab,
  WorkExperienceTab,
} from '../../components/index.components'
// import ProfileTab from '../../components/tabs/ProfileTab'
// import CurriculumTab from '../../components/tabs/CurriculumTab'
// import SkillsTab from '../../components/tabs/SkillsTab'
// import EducationTab from '../../components/tabs/EducationTab'
// import WorkExperienceTab from '../../components/tabs/WorkExperience'
// import ReferencesTab from '../../components/tabs/ReferencesTab'

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState('general')

  const handleTab = (tab) => setSelectedTab(tab)

  return (
    <main className="lg:w-[1400px] w-full mx-auto flex flex-col py-10 lg:px-0 px-10 gap-5 h-full bg-[#F4F2EE]">
      <h2 className="text-3xl font-bold text-[#FD6C01] mb-5">Configuración</h2>
      {/* Menú */}
      <nav className="border-b border-gray-200 flex flex-row mb-5 overflow-y-auto">
        <button
          className={`pr-10 py-5 border-b-2 font-bold cursor-pointer ${
            selectedTab === 'general'
              ? 'text-[#FD6C01] border-[#FD6C01]'
              : 'text-[#78838B] border-b-transparent'
          }`}
          onClick={() => handleTab('general')}
        >
          Información general
        </button>
        <button
          className={`pr-10 py-5 border-b-2 font-bold cursor-pointer ${
            selectedTab === 'cv'
              ? 'text-[#FD6C01] border-[#FD6C01]'
              : 'text-[#78838B] border-b-transparent'
          }`}
          onClick={() => handleTab('cv')}
        >
          Currículum
        </button>
        <button
          className={`pr-10 py-5 border-b-2 font-bold cursor-pointer ${
            selectedTab === 'habilidades'
              ? 'text-[#FD6C01] border-[#FD6C01]'
              : 'text-[#78838B] border-b-transparent'
          }`}
          onClick={() => handleTab('habilidades')}
        >
          Habilidades
        </button>
        <button
          className={`pr-10 py-5 border-b-2 font-bold cursor-pointer ${
            selectedTab === 'educacion'
              ? 'text-[#FD6C01] border-[#FD6C01]'
              : 'text-[#78838B] border-b-transparent'
          }`}
          onClick={() => handleTab('educacion')}
        >
          Educación
        </button>
        <button
          className={`pr-10 py-5 border-b-2 font-bold cursor-pointer ${
            selectedTab === 'experiencia'
              ? 'text-[#FD6C01] border-[#FD6C01]'
              : 'text-[#78838B] border-b-transparent'
          }`}
          onClick={() => handleTab('experiencia')}
        >
          Experiencia laboral
        </button>
        <button
          className={`pr-10 py-5 border-b-2 font-bold cursor-pointer ${
            selectedTab === 'idiomas'
              ? 'text-[#FD6C01] border-[#FD6C01]'
              : 'text-[#78838B] border-b-transparent'
          }`}
          onClick={() => handleTab('idiomas')}
        >
          Idiomas
        </button>

        <button
          className={`pr-10 py-5 border-b-2 font-bold cursor-pointer ${
            selectedTab === 'referencia'
              ? 'text-[#FD6C01] border-[#FD6C01]'
              : 'text-[#78838B] border-b-transparent'
          }`}
          onClick={() => handleTab('referencia')}
        >
          Referencias
        </button>
      </nav>

      {selectedTab === 'general' && <GeneralInfo />}
      {selectedTab === 'cv' && <CV />}
      {selectedTab === 'habilidades' && <SkillsTab />}
      {selectedTab === 'educacion' && <EducationTab />}
      {selectedTab === 'experiencia' && <WorkExperienceTab />}
      {selectedTab === 'idiomas' && <LanguageTab />}
      {selectedTab === 'referencia' && <ReferencesTab />}
    </main>
  )
}

export default Settings
