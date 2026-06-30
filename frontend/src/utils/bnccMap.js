// Mapeamento mecânica → código BNCC por ano
export const BNCC_MAP = {
  1: {
    portugues: ['EF01LP01', 'EF01LP02', 'EF01LP03', 'EF01LP04'],
    matematica: ['EF01MA01', 'EF01MA02', 'EF01MA03'],
    ciencias:   ['EF01CI01', 'EF01CI02'],
  },
  2: {
    portugues: ['EF02LP01', 'EF02LP02', 'EF02LP05'],
    matematica: ['EF02MA01', 'EF02MA02', 'EF02MA06'],
    ciencias:   ['EF02CI01', 'EF02CI05'],
  },
  3: {
    portugues: ['EF03LP01', 'EF03LP04', 'EF03LP09'],
    matematica: ['EF03MA01', 'EF03MA07', 'EF03MA12'],
    ciencias:   ['EF03CI01', 'EF03CI06'],
  },
  4: {
    portugues: ['EF04LP01', 'EF04LP05', 'EF04LP14'],
    matematica: ['EF04MA01', 'EF04MA09', 'EF04MA19'],
    historia:   ['EF04HI01', 'EF04HI06'],
    geografia:  ['EF04GE01', 'EF04GE03'],
  },
  5: {
    portugues: ['EF05LP01', 'EF05LP06', 'EF05LP18'],
    matematica: ['EF05MA01', 'EF05MA08', 'EF05MA23'],
    historia:   ['EF05HI01', 'EF05HI05'],
    geografia:  ['EF05GE01', 'EF05GE10'],
  },
}

export function getBnccCodes(schoolYear, discipline) {
  return BNCC_MAP[schoolYear]?.[discipline] ?? []
}
