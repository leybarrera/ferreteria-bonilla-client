const Skills = () => {
  return (
    <div className="flex flex-col p-5 border border-gray-200 bg-white rounded-lg">
      <h2 className="text-2xl font-bold">Habilidades</h2>

      {/* Tabla de habilidades */}

      <div class="relative overflow-x-auto mt-5 w-full rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead class="text-[15px] text-white uppercase  bg-[#cb4d03] ">
            <tr>
              <th scope="col" class="px-6 py-5">
                Habilidad
              </th>
              <th scope="col" class="px-6 py-5">
                Experiencia
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b border-gray-200">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">Silver</td>
            </tr>
            <tr class="bg-white border-b border-gray-200">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">Silver</td>
            </tr>
          </tbody>

          <tfoot>
            <tr className="bg-white border-b border-gray-200">
              <td className="text-center py-4" colSpan="2">
                Sin habilidades registradas
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default Skills
